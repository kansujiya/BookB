# BookBlaze - Complete Code Explanation & Deployment Guide

## 📚 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Database Explanation](#database-explanation)
3. [Backend Explanation](#backend-explanation)
4. [Frontend Explanation](#frontend-explanation)
5. [Deployment Guide](#deployment-guide)
6. [Troubleshooting](#troubleshooting)

---

## 🏗️ Architecture Overview

### Tech Stack
```
Frontend: React.js (Port 3000)
Backend: FastAPI (Python) (Port 8001)
Database: MongoDB
```

### How It Works
```
User Browser → React Frontend → Axios API calls → FastAPI Backend → MongoDB Database
```

1. **Frontend (React)** - User interface running in browser
2. **Backend (FastAPI)** - REST API server handling business logic
3. **Database (MongoDB)** - NoSQL database storing all data

### Why You Need BOTH:
- ✅ **Frontend** - Displays the website to users
- ✅ **Backend** - Handles data, cart, orders, and business logic
- ✅ **Database** - Stores products, cart, orders, testimonials

**Without backend, the frontend won't work because:**
- No product data to display
- Cart won't save
- No orders can be created

---

## 🗄️ Database Explanation (MongoDB)

### What is MongoDB?
MongoDB is a **NoSQL database** that stores data in JSON-like documents.

### Why MongoDB?
- ✅ Flexible schema (easy to add new fields)
- ✅ Fast for reading data
- ✅ Great for eCommerce apps
- ✅ Free tier available (MongoDB Atlas)

### Database Structure

#### Collection: `products`
```json
{
  "id": "prod-1",
  "title": "Software System Design",
  "slug": "software-system-design",
  "image": "https://...",
  "original_price": 1499,
  "current_price": 499,
  "description": "Master system design...",
  "long_description": "Used by 1000+ engineers...",
  "features": ["100+ Flowcharts", "Real-World Case Studies", ...]
}
```

#### Collection: `carts`
```json
{
  "id": "cart-123",
  "session_id": "session-abc123",
  "items": [
    {
      "product_id": "prod-1",
      "quantity": 2,
      "price_at_time": 499
    }
  ],
  "created_at": "2025-01-15T10:30:00",
  "updated_at": "2025-01-15T10:35:00"
}
```

#### Collection: `orders`
```json
{
  "id": "order-123",
  "order_number": "ORD-ABC123XYZ",
  "customer_email": "user@example.com",
  "customer_name": "John Doe",
  "items": [...],
  "subtotal": 998,
  "discount": 2000,
  "total": 998,
  "status": "completed",
  "created_at": "2025-01-15T10:40:00"
}
```

#### Collection: `testimonials`
```json
{
  "id": 1,
  "name": "Ankit Sharma",
  "position": "Software Engineer at Google",
  "image": "https://...",
  "text": "This book gave me confidence...",
  "is_active": true
}
```

#### Collection: `contact_messages`
```json
{
  "id": "msg-123",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Product Inquiry",
  "message": "I have a question about...",
  "status": "new",
  "created_at": "2025-01-15T11:00:00"
}
```

---

## 🔧 Backend Explanation (FastAPI)

### File Structure
```
/backend/
├── server.py           # Main API server
├── models.py           # Database models (Pydantic)
├── seed_db.py          # Seeds initial data
├── requirements.txt    # Python dependencies
└── .env               # Environment variables
```

### Key Files Explained

#### 1. `server.py` - Main API Server
```python
# This file creates all the API endpoints

# Example: Get all products
@api_router.get("/products")
async def get_products():
    products = await db.products.find().to_list(1000)
    return products

# When frontend calls: GET /api/products
# Backend fetches from MongoDB and returns JSON
```

**API Endpoints:**
- `GET /api/products` - Get all products
- `GET /api/products/{slug}` - Get one product
- `POST /api/cart/{session_id}/items` - Add to cart
- `GET /api/cart/{session_id}` - Get cart
- `PUT /api/cart/{session_id}/items/{product_id}` - Update quantity
- `DELETE /api/cart/{session_id}/items/{product_id}` - Remove from cart
- `POST /api/orders` - Create order
- `POST /api/contact` - Submit contact form
- `GET /api/testimonials` - Get testimonials

#### 2. `models.py` - Data Models
```python
# Defines the structure of data

class Product(BaseModel):
    id: str
    title: str
    price: int
    # ... other fields

# Ensures data is valid before saving to database
```

#### 3. `seed_db.py` - Initial Data
```python
# Populates database with 3 products and 5 testimonials
# Run once: python seed_db.py
```

#### 4. `.env` - Configuration
```
MONGO_URL=mongodb://localhost:27017/
DB_NAME=bookblaze_db
```

### How Backend Works

**Example: Adding to Cart**
```
1. User clicks "Add to Cart" button
2. Frontend sends: POST /api/cart/session-abc/items
   Body: { "product_id": "prod-1", "quantity": 1 }
3. Backend:
   - Gets product from database
   - Adds to cart in database
   - Returns updated cart
4. Frontend shows success message
```

---

## ⚛️ Frontend Explanation (React)

### File Structure
```
/frontend/src/
├── App.js                    # Main app component
├── api/
│   └── client.js            # API calls to backend
├── components/
│   ├── Navbar.jsx           # Top navigation
│   ├── Footer.jsx           # Bottom footer
│   ├── ProductCard.jsx      # Product display card
│   ├── TestimonialCard.jsx # Testimonial display
│   └── PurchaseNotification.jsx # Popup notifications
├── pages/
│   ├── Home.jsx             # Homepage
│   ├── Products.jsx         # All products page
│   ├── ProductDetail.jsx    # Single product page
│   ├── Cart.jsx             # Shopping cart
│   ├── Contact.jsx          # Contact form
│   ├── About.jsx            # About page
│   └── [Policy pages]       # Terms, Privacy, etc.
├── mockData.js              # Hero section data
└── .env                     # Frontend config
```

### Key Files Explained

#### 1. `App.js` - Main Application
```javascript
function App() {
  const [cartCount, setCartCount] = useState(0);
  
  // Fetches cart count from backend
  // Updates navbar badge (red circle with number)
  
  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        ...
      </Routes>
    </BrowserRouter>
  );
}
```

#### 2. `api/client.js` - Backend Communication
```javascript
// All API calls to backend

export const productsAPI = {
  getAll: () => axios.get('/api/products'),
  getBySlug: (slug) => axios.get(`/api/products/${slug}`)
};

export const cartAPI = {
  addItem: (sessionId, item) => 
    axios.post(`/api/cart/${sessionId}/items`, item)
};
```

#### 3. `pages/Home.jsx` - Homepage
```javascript
const Home = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Fetch products from backend on page load
    fetchProducts();
  }, []);
  
  const handleAddToCart = async (product) => {
    // Add product to cart via backend API
    await cartAPI.addItem(sessionId, { 
      product_id: product.id, 
      quantity: 1 
    });
  };
  
  return (
    // Display hero section, products, testimonials
  );
};
```

#### 4. `pages/Cart.jsx` - Shopping Cart
```javascript
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    // Fetch cart from backend
    fetchCart();
  }, []);
  
  const handleRemoveItem = async (productId) => {
    // Remove item via backend API
    await cartAPI.removeItem(sessionId, productId);
  };
  
  return (
    // Display cart items, quantities, total
  );
};
```

#### 5. `.env` - Frontend Configuration
```
REACT_APP_BACKEND_URL=http://localhost:8001
```
This tells frontend where backend is running.

### How Frontend Works

**Example: Viewing Products**
```
1. User visits homepage
2. Home.jsx runs: fetchProducts()
3. API call: GET http://localhost:8001/api/products
4. Backend returns product data
5. Frontend displays ProductCard for each product
```

### Session Management
```javascript
// getSessionId() creates unique ID for each user
// Stored in localStorage
// Used to track cart without login

session_id: "session-abc123-1234567890"
```

---

## 🚀 Deployment Guide

### Option 1: Deploy on Emergent (Current Setup)
✅ **Already deployed!**
- Frontend: Running on port 3000
- Backend: Running on port 8001
- MongoDB: Connected via MONGO_URL

**Your app URL:**
```
https://ebook-store-45.preview.emergentagent.com
```

### Option 2: Deploy Locally

#### Step 1: Install Requirements
```bash
# Install MongoDB
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community
# Linux: sudo apt install mongodb

# Start MongoDB
mongod
```

#### Step 2: Backend Setup
```bash
cd backend

# Create .env file
echo "MONGO_URL=mongodb://localhost:27017/" > .env
echo "DB_NAME=bookblaze_db" >> .env

# Install Python packages
pip install -r requirements.txt

# Seed database (one time)
python seed_db.py

# Start backend
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```
Backend will run at: `http://localhost:8001`

#### Step 3: Frontend Setup
```bash
cd frontend

# Create .env file
echo "REACT_APP_BACKEND_URL=http://localhost:8001" > .env

# Install packages
yarn install

# Start frontend
yarn start
```
Frontend will open at: `http://localhost:3000`

### Option 3: Deploy to Production

#### Frontend (Netlify/Vercel)
```bash
cd frontend
yarn build
# Upload 'build' folder to Netlify or Vercel
```

#### Backend (Heroku/Railway/DigitalOcean)
```bash
# Add Procfile:
web: uvicorn server:app --host 0.0.0.0 --port $PORT

# Set environment variables:
MONGO_URL=<your-mongodb-atlas-url>
DB_NAME=bookblaze_db
```

#### Database (MongoDB Atlas - Free)
1. Go to mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Use in MONGO_URL

---

## 🔍 Data Flow Example: Adding to Cart

### Complete Journey:
```
1. USER ACTION
   ↓
   User clicks "Add to Cart" button on product card

2. FRONTEND (ProductCard.jsx)
   ↓
   onClick → handleAddToCart(product)

3. API CALL (api/client.js)
   ↓
   POST http://localhost:8001/api/cart/session-abc/items
   Body: { product_id: "prod-1", quantity: 1 }

4. BACKEND (server.py)
   ↓
   @api_router.post("/cart/{session_id}/items")
   - Validates product exists
   - Gets or creates cart in MongoDB
   - Adds item to cart.items array
   - Saves to database

5. DATABASE (MongoDB)
   ↓
   Updates 'carts' collection:
   {
     session_id: "session-abc",
     items: [
       { product_id: "prod-1", quantity: 1, price_at_time: 499 }
     ]
   }

6. BACKEND RESPONSE
   ↓
   Returns updated cart JSON

7. FRONTEND UPDATE
   ↓
   - Triggers 'cartUpdated' event
   - App.js catches event
   - Fetches new cart count
   - Updates navbar badge: "1"
   - Shows toast: "Added to cart!"

8. USER SEES
   ↓
   - Success message
   - Cart badge shows "1"
   - Can view cart page
```

---

## 🐛 Common Issues & Fixes

### Issue 1: Products Not Showing
**Cause:** Backend not running or database empty

**Fix:**
```bash
cd backend
python seed_db.py  # Seed products
uvicorn server:app --reload --port 8001  # Start backend
```

### Issue 2: Add to Cart Not Working
**Cause:** Frontend can't reach backend

**Fix:**
1. Check backend is running: `http://localhost:8001/api/products`
2. Check .env has correct URL: `REACT_APP_BACKEND_URL=http://localhost:8001`
3. Restart frontend: `yarn start`

### Issue 3: Cart Count Not Updating
**Cause:** Event not triggering properly

**Fix:** Already fixed with `cartUpdated` event in optimized code

### Issue 4: MongoDB Connection Error
**Cause:** MongoDB not running

**Fix:**
```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas (cloud - free)
# Get URL from atlas.mongodb.com
```

### Issue 5: CORS Error
**Cause:** Frontend and backend on different domains

**Fix:** Already handled in `server.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
)
```

---

## 📊 Summary

### What You Have:
1. ✅ **React Frontend** - Beautiful eCommerce UI
2. ✅ **FastAPI Backend** - RESTful API server
3. ✅ **MongoDB Database** - Storing all data
4. ✅ **Session-based Cart** - No login required
5. ✅ **Product Management** - 3 eBooks
6. ✅ **Order System** - Track purchases
7. ✅ **Contact Form** - User inquiries
8. ✅ **Policy Pages** - Legal compliance

### To Run Locally:
```bash
# Terminal 1: Start MongoDB
mongod

# Terminal 2: Start Backend
cd backend
python seed_db.py  # One time only
uvicorn server:app --reload --port 8001

# Terminal 3: Start Frontend
cd frontend
yarn start
```

### To Deploy:
**Yes, you need BOTH frontend AND backend deployed!**

- Frontend → Netlify/Vercel (Static hosting)
- Backend → Heroku/Railway (Server hosting)
- Database → MongoDB Atlas (Cloud database)

---

## 🎯 Quick Reference

### Important URLs (Local):
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8001`
- API Docs: `http://localhost:8001/docs`

### Important Commands:
```bash
# Backend
python seed_db.py              # Seed database
uvicorn server:app --reload    # Start server

# Frontend  
yarn start                     # Development
yarn build                     # Production build

# Database
mongod                         # Start MongoDB
mongo                          # MongoDB shell
```

### Environment Variables:
**Backend (.env):**
```
MONGO_URL=mongodb://localhost:27017/
DB_NAME=bookblaze_db
```

**Frontend (.env):**
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

---

**Need Help?** Check `/app/LOCAL_SETUP_GUIDE.md` for detailed setup instructions!
