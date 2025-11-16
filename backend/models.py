from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

# Product Models
class ProductBase(BaseModel):
    title: str
    slug: str
    image: str
    original_price: int
    current_price: int
    description: str
    long_description: str
    features: List[str]
    download_link: str = ""  # Google Drive link for PDF download
    pdf_link: str = ""  # Direct PDF download link

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

# Public Product Model (without download_link for public APIs)
class ProductPublic(BaseModel):
    id: str
    title: str
    slug: str
    image: str
    original_price: int
    current_price: int
    description: str
    long_description: str
    features: List[str]
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Cart Models
class CartItem(BaseModel):
    product_id: str
    quantity: int
    price_at_time: int

class Cart(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    items: List[CartItem] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

class CartItemAdd(BaseModel):
    product_id: str
    quantity: int = 1

class CartItemUpdate(BaseModel):
    quantity: int

# Order Models
class OrderItem(BaseModel):
    product_id: str
    product_title: str
    quantity: int
    price: int

class OrderCreate(BaseModel):
    session_id: str
    customer_name: str
    customer_email: EmailStr
    customer_phone: str = ""
    billing_address: str = ""
    city: str = ""
    state: str = ""
    pincode: str = ""

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_number: str
    customer_email: str
    customer_name: str
    customer_phone: str = ""
    billing_address: str = ""
    city: str = ""
    state: str = ""
    pincode: str = ""
    items: List[OrderItem]
    subtotal: int
    discount: int
    total: int
    status: str = "pending"
    payment_status: str = "pending"
    razorpay_order_id: str = ""
    razorpay_payment_id: str = ""
    razorpay_signature: str = ""
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

# Razorpay Payment Models
class RazorpayOrderCreate(BaseModel):
    amount: int  # Amount in paise (INR)
    currency: str = "INR"
    receipt: str
    notes: dict = {}

class PaymentVerification(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    order_number: str

# Contact Models
class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactMessage(ContactMessageCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "new"
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

# Testimonial Models
class TestimonialBase(BaseModel):
    name: str
    position: str
    image: str
    text: str
    is_active: bool = True

class Testimonial(TestimonialBase):
    id: int
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True
