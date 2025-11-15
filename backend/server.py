from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List
from datetime import datetime
import random
import string
import razorpay
import hmac
import hashlib

from models import (
    Product, ProductCreate,
    Cart, CartItemAdd, CartItemUpdate,
    Order, OrderCreate, OrderItem,
    ContactMessage, ContactMessageCreate,
    Testimonial,
    RazorpayOrderCreate, PaymentVerification
)
from email_service import send_order_confirmation_email

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initialize Razorpay client
razorpay_client = razorpay.Client(auth=(os.environ['RAZORPAY_KEY_ID'], os.environ['RAZORPAY_KEY_SECRET']))

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Helper function to generate order number
def generate_order_number():
    return 'ORD-' + ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))

# ==================== PRODUCTS ENDPOINTS ====================

@api_router.get("/products", response_model=List[Product])
async def get_products():
    """Get all products"""
    try:
        products = await db.products.find().to_list(1000)
        return [Product(**product) for product in products]
    except Exception as e:
        logger.error(f"Error fetching products: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching products")

@api_router.get("/products/{slug}", response_model=Product)
async def get_product_by_slug(slug: str):
    """Get a single product by slug"""
    try:
        product = await db.products.find_one({"slug": slug})
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return Product(**product)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching product: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching product")

@api_router.post("/products", response_model=Product)
async def create_product(product: ProductCreate):
    """Create a new product"""
    try:
        # Check if slug already exists
        existing = await db.products.find_one({"slug": product.slug})
        if existing:
            raise HTTPException(status_code=400, detail="Product with this slug already exists")
        
        product_obj = Product(**product.dict())
        await db.products.insert_one(product_obj.dict())
        return product_obj
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating product: {str(e)}")
        raise HTTPException(status_code=500, detail="Error creating product")

# ==================== CART ENDPOINTS ====================

@api_router.get("/cart/{session_id}", response_model=Cart)
async def get_cart(session_id: str):
    """Get cart by session ID"""
    try:
        cart = await db.carts.find_one({"session_id": session_id})
        if not cart:
            # Create empty cart
            new_cart = Cart(session_id=session_id, items=[])
            await db.carts.insert_one(new_cart.dict())
            return new_cart
        return Cart(**cart)
    except Exception as e:
        logger.error(f"Error fetching cart: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching cart")

@api_router.post("/cart/{session_id}/items", response_model=Cart)
async def add_to_cart(session_id: str, item: CartItemAdd):
    """Add item to cart"""
    try:
        # Get product to verify it exists and get price
        product = await db.products.find_one({"id": item.product_id})
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        # Get or create cart
        cart = await db.carts.find_one({"session_id": session_id})
        if not cart:
            cart = Cart(session_id=session_id, items=[])
            cart_dict = cart.dict()
        else:
            cart_dict = cart
        
        # Check if item already exists
        item_exists = False
        for cart_item in cart_dict.get('items', []):
            if cart_item['product_id'] == item.product_id:
                cart_item['quantity'] += item.quantity
                item_exists = True
                break
        
        if not item_exists:
            new_item = {
                "product_id": item.product_id,
                "quantity": item.quantity,
                "price_at_time": product['current_price']
            }
            if 'items' not in cart_dict:
                cart_dict['items'] = []
            cart_dict['items'].append(new_item)
        
        cart_dict['updated_at'] = datetime.utcnow()
        
        # Update or insert cart
        await db.carts.update_one(
            {"session_id": session_id},
            {"$set": cart_dict},
            upsert=True
        )
        
        updated_cart = await db.carts.find_one({"session_id": session_id})
        return Cart(**updated_cart)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error adding to cart: {str(e)}")
        raise HTTPException(status_code=500, detail="Error adding to cart")

@api_router.put("/cart/{session_id}/items/{product_id}", response_model=Cart)
async def update_cart_item(session_id: str, product_id: str, update: CartItemUpdate):
    """Update cart item quantity"""
    try:
        cart = await db.carts.find_one({"session_id": session_id})
        if not cart:
            raise HTTPException(status_code=404, detail="Cart not found")
        
        item_found = False
        for item in cart.get('items', []):
            if item['product_id'] == product_id:
                if update.quantity <= 0:
                    cart['items'].remove(item)
                else:
                    item['quantity'] = update.quantity
                item_found = True
                break
        
        if not item_found:
            raise HTTPException(status_code=404, detail="Item not found in cart")
        
        cart['updated_at'] = datetime.utcnow()
        await db.carts.update_one(
            {"session_id": session_id},
            {"$set": cart}
        )
        
        updated_cart = await db.carts.find_one({"session_id": session_id})
        return Cart(**updated_cart)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating cart item: {str(e)}")
        raise HTTPException(status_code=500, detail="Error updating cart item")

@api_router.delete("/cart/{session_id}/items/{product_id}", response_model=Cart)
async def remove_from_cart(session_id: str, product_id: str):
    """Remove item from cart"""
    try:
        cart = await db.carts.find_one({"session_id": session_id})
        if not cart:
            raise HTTPException(status_code=404, detail="Cart not found")
        
        cart['items'] = [item for item in cart.get('items', []) if item['product_id'] != product_id]
        cart['updated_at'] = datetime.utcnow()
        
        await db.carts.update_one(
            {"session_id": session_id},
            {"$set": cart}
        )
        
        updated_cart = await db.carts.find_one({"session_id": session_id})
        return Cart(**updated_cart)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error removing from cart: {str(e)}")
        raise HTTPException(status_code=500, detail="Error removing from cart")

@api_router.delete("/cart/{session_id}")
async def clear_cart(session_id: str):
    """Clear cart"""
    try:
        await db.carts.delete_one({"session_id": session_id})
        return {"message": "Cart cleared successfully"}
    except Exception as e:
        logger.error(f"Error clearing cart: {str(e)}")
        raise HTTPException(status_code=500, detail="Error clearing cart")

# ==================== RAZORPAY ENDPOINTS ====================

@api_router.post("/razorpay/create-order")
async def create_razorpay_order(order_data: RazorpayOrderCreate):
    """Create Razorpay order"""
    try:
        razorpay_order = razorpay_client.order.create({
            "amount": order_data.amount,  # Amount in paise
            "currency": order_data.currency,
            "receipt": order_data.receipt,
            "notes": order_data.notes,
            "payment_capture": 1
        })
        logger.info(f"Razorpay order created: {razorpay_order['id']}")
        return razorpay_order
    except Exception as e:
        logger.error(f"Error creating Razorpay order: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error creating Razorpay order: {str(e)}")

@api_router.post("/razorpay/verify-payment")
async def verify_payment(payment_data: PaymentVerification):
    """Verify Razorpay payment signature and clear cart"""
    try:
        # Verify signature
        signature = payment_data.razorpay_signature
        order_id = payment_data.razorpay_order_id
        payment_id = payment_data.razorpay_payment_id
        
        # Generate expected signature
        generated_signature = hmac.new(
            os.environ['RAZORPAY_KEY_SECRET'].encode(),
            f"{order_id}|{payment_id}".encode(),
            hashlib.sha256
        ).hexdigest()
        
        if generated_signature != signature:
            raise HTTPException(status_code=400, detail="Invalid payment signature")
        
        # Update order with payment details
        order = await db.orders.find_one({"order_number": payment_data.order_number})
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        await db.orders.update_one(
            {"order_number": payment_data.order_number},
            {
                "$set": {
                    "razorpay_order_id": order_id,
                    "razorpay_payment_id": payment_id,
                    "razorpay_signature": signature,
                    "payment_status": "paid",
                    "status": "completed",
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        # Clear cart after successful payment
        # Find the session_id from the order (we need to get it from OrderCreate, so we'll pass it)
        # For now, we'll return success and let frontend handle cart clearing
        
        logger.info(f"Payment verified for order: {payment_data.order_number}")
        return {"status": "success", "message": "Payment verified successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error verifying payment: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error verifying payment: {str(e)}")

# ==================== ORDERS ENDPOINTS ====================

@api_router.post("/orders", response_model=Order)
async def create_order(order_create: OrderCreate):
    """Create order from cart"""
    try:
        # Get cart
        cart = await db.carts.find_one({"session_id": order_create.session_id})
        if not cart or not cart.get('items'):
            raise HTTPException(status_code=400, detail="Cart is empty")
        
        # Get product details for order items
        order_items = []
        subtotal = 0
        total_original_price = 0
        
        for cart_item in cart['items']:
            product = await db.products.find_one({"id": cart_item['product_id']})
            if product:
                item_total = product['current_price'] * cart_item['quantity']
                subtotal += item_total
                total_original_price += product['original_price'] * cart_item['quantity']
                
                order_items.append(OrderItem(
                    product_id=cart_item['product_id'],
                    product_title=product['title'],
                    quantity=cart_item['quantity'],
                    price=product['current_price']
                ))
        
        discount = total_original_price - subtotal
        
        # Create order
        order = Order(
            order_number=generate_order_number(),
            customer_email=order_create.customer_email,
            customer_name=order_create.customer_name,
            customer_phone=order_create.customer_phone,
            billing_address=order_create.billing_address,
            city=order_create.city,
            state=order_create.state,
            pincode=order_create.pincode,
            items=order_items,
            subtotal=subtotal,
            discount=discount,
            total=subtotal,
            status="pending",
            payment_status="pending"
        )
        
        await db.orders.insert_one(order.dict())
        
        # Don't clear cart yet - will be cleared after successful payment
        
        return order
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating order: {str(e)}")
        raise HTTPException(status_code=500, detail="Error creating order")

@api_router.get("/orders/{order_number}", response_model=Order)
async def get_order(order_number: str):
    """Get order by order number"""
    try:
        order = await db.orders.find_one({"order_number": order_number})
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return Order(**order)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching order: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching order")

@api_router.get("/orders/email/{email}", response_model=List[Order])
async def get_orders_by_email(email: str):
    """Get all orders for an email"""
    try:
        orders = await db.orders.find({"customer_email": email}).to_list(1000)
        return [Order(**order) for order in orders]
    except Exception as e:
        logger.error(f"Error fetching orders: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching orders")

# ==================== CONTACT ENDPOINTS ====================

@api_router.post("/contact")
async def submit_contact_message(message: ContactMessageCreate):
    """Submit contact form"""
    try:
        contact_msg = ContactMessage(**message.dict())
        await db.contact_messages.insert_one(contact_msg.dict())
        return {"message": "Contact message received successfully"}
    except Exception as e:
        logger.error(f"Error submitting contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Error submitting message")

@api_router.get("/contact/messages", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages (Admin)"""
    try:
        messages = await db.contact_messages.find().sort("created_at", -1).to_list(1000)
        return [ContactMessage(**msg) for msg in messages]
    except Exception as e:
        logger.error(f"Error fetching messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching messages")

# ==================== TESTIMONIALS ENDPOINTS ====================

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    """Get all active testimonials"""
    try:
        testimonials = await db.testimonials.find({"is_active": True}).to_list(1000)
        return [Testimonial(**testimonial) for testimonial in testimonials]
    except Exception as e:
        logger.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching testimonials")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()