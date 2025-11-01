# API Endpoints & Frontend Integration Guide

## 📚 Table of Contents
1. [Postman Collection](#postman-collection)
2. [API Client Configuration](#api-client-configuration)
3. [Endpoint Mapping](#endpoint-mapping)
4. [Frontend Code Locations](#frontend-code-locations)
5. [How to Update Backend URL](#how-to-update-backend-url)

---

## 📮 Postman Collection

### Import Collection:
1. **File Location:** `/app/BookBlaze_API_Collection.postman_collection.json`
2. **Open Postman**
3. Click **Import** button
4. Select the JSON file
5. Collection will be imported with all endpoints!

### Configure Variables:
After importing, update these variables:

**For Local Testing:**
```
base_url: http://localhost:8001
session_id: session-test-123
```

**For Production:**
```
base_url: https://your-backend.onrender.com
session_id: session-abc-xyz
```

---

## 🔧 API Client Configuration

### File: `/frontend/src/api/client.js`

This is the **CENTRAL** file that connects frontend to backend.

```javascript
import axios from 'axios';

// 🎯 THIS IS WHERE YOU POINT TO YOUR BACKEND
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

**To Change Backend URL:**
Edit `/frontend/.env` file:
```bash
# Local
REACT_APP_BACKEND_URL=http://localhost:8001

# Production
REACT_APP_BACKEND_URL=https://bookblaze-backend.onrender.com
```

---

## 📍 Endpoint Mapping

### Complete API Endpoint List

| Endpoint | Method | Frontend Usage | File Location |
|----------|--------|---------------|---------------|
| `/api/products` | GET | Fetch all products | `Home.jsx`, `Products.jsx`, `Cart.jsx` |
| `/api/products/{slug}` | GET | Fetch single product | `ProductDetail.jsx` |
| `/api/cart/{session_id}` | GET | Get cart contents | `App.js`, `Cart.jsx` |
| `/api/cart/{session_id}/items` | POST | Add to cart | `Home.jsx`, `Products.jsx`, `ProductDetail.jsx` |
| `/api/cart/{session_id}/items/{id}` | PUT | Update quantity | `Cart.jsx` |
| `/api/cart/{session_id}/items/{id}` | DELETE | Remove from cart | `Cart.jsx` |
| `/api/orders` | POST | Create order | `Cart.jsx` |
| `/api/contact` | POST | Submit contact form | `Contact.jsx` |
| `/api/testimonials` | GET | Fetch testimonials | `Home.jsx` |

---

## 🗺️ Frontend Code Locations

### 1. Products API

#### GET `/api/products` - Get All Products

**📁 File: `/frontend/src/pages/Home.jsx`**
```javascript
// Line ~25-35
const fetchData = async () => {
  try {
    const [productsRes, testimonialsRes] = await Promise.all([
      productsAPI.getAll(),  // 👈 CALLS /api/products
      testimonialsAPI.getAll()
    ]);
    
    setProducts(productsRes.data);
    setTestimonials(testimonialsRes.data);
  } catch (error) {
    toast({
      title: "Error loading data",
      description: "Please refresh the page to try again.",
      variant: "destructive",
    });
  }
};
```

**📁 File: `/frontend/src/pages/Products.jsx`**
```javascript
// Line ~16-24
const fetchProducts = async () => {
  try {
    const response = await productsAPI.getAll();  // 👈 CALLS /api/products
    setProducts(response.data);
  } catch (error) {
    toast({
      title: "Error loading products",
      description: "Please refresh the page to try again.",
      variant: "destructive",
    });
  }
};
```

**📁 File: `/frontend/src/pages/Cart.jsx`**
```javascript
// Line ~40-55
// Also fetches products to get product details for cart items
const productsResponse = await productsAPI.getAll();  // 👈 CALLS /api/products
const allProducts = productsResponse.data;
```

**📝 Implementation in API Client:**
```javascript
// /frontend/src/api/client.js
export const productsAPI = {
  getAll: () => apiClient.get('/products'),  // Full URL: /api/products
};
```

---

#### GET `/api/products/{slug}` - Get Single Product

**📁 File: `/frontend/src/pages/ProductDetail.jsx`**
```javascript
// Line ~20-30
const fetchProduct = async () => {
  try {
    const response = await productsAPI.getBySlug(slug);  // 👈 CALLS /api/products/{slug}
    setProduct(response.data);
  } catch (error) {
    if (error.response?.status === 404) {
      toast({
        title: "Product not found",
        description: "This product doesn't exist.",
        variant: "destructive",
      });
    }
  }
};
```

**📝 Implementation in API Client:**
```javascript
// /frontend/src/api/client.js
export const productsAPI = {
  getBySlug: (slug) => apiClient.get(`/products/${slug}`),  // Full URL: /api/products/software-system-design
};
```

---

### 2. Cart API

#### GET `/api/cart/{session_id}` - Get Cart

**📁 File: `/frontend/src/App.js`**
```javascript
// Line ~24-35
const updateCartCount = useCallback(async () => {
  try {
    const sessionId = getSessionId();
    const response = await cartAPI.getCart(sessionId);  // 👈 CALLS /api/cart/{session_id}
    const cart = response.data;
    const count = cart.items && Array.isArray(cart.items) 
      ? cart.items.reduce((total, item) => total + item.quantity, 0)
      : 0;
    setCartCount(count);
  } catch (error) {
    setCartCount(0);
  }
}, []);
```

**📁 File: `/frontend/src/pages/Cart.jsx`**
```javascript
// Line ~25-35
const fetchCart = async () => {
  try {
    const sessionId = getSessionId();
    const response = await cartAPI.getCart(sessionId);  // 👈 CALLS /api/cart/{session_id}
    const cartData = response.data;
    setCart(cartData);
    // ... fetch product details
  } catch (error) {
    // Handle error
  }
};
```

**📝 Implementation in API Client:**
```javascript
// /frontend/src/api/client.js
export const cartAPI = {
  getCart: (sessionId) => apiClient.get(`/cart/${sessionId}`),  // Full URL: /api/cart/session-abc-123
};
```

---

#### POST `/api/cart/{session_id}/items` - Add to Cart

**📁 File: `/frontend/src/pages/Home.jsx`**
```javascript
// Line ~38-52
const handleAddToCart = useCallback(async (product) => {
  try {
    const sessionId = getSessionId();
    await cartAPI.addItem(sessionId, {  // 👈 CALLS POST /api/cart/{session_id}/items
      product_id: product.id,
      quantity: 1
    });
    
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Added to cart!",
      description: `${product.title} has been added to your cart.`,
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to add item to cart. Please try again.",
      variant: "destructive",
    });
  }
}, [toast]);
```

**📁 File: `/frontend/src/pages/Products.jsx`**
```javascript
// Line ~26-40
const handleAddToCart = useCallback(async (product) => {
  try {
    const sessionId = getSessionId();
    await cartAPI.addItem(sessionId, {  // 👈 CALLS POST /api/cart/{session_id}/items
      product_id: product.id,
      quantity: 1
    });
    
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Added to cart!",
      description: `${product.title} has been added to your cart.`,
    });
  } catch (error) {
    // Handle error
  }
}, [toast]);
```

**📁 File: `/frontend/src/pages/ProductDetail.jsx`**
```javascript
// Line ~32-45
const handleAddToCart = async () => {
  try {
    const sessionId = getSessionId();
    await cartAPI.addItem(sessionId, {  // 👈 CALLS POST /api/cart/{session_id}/items
      product_id: product.id,
      quantity: 1
    });
    
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Added to cart!",
      description: `${product.title} has been added to your cart.`,
    });
  } catch (error) {
    // Handle error
  }
};
```

**📝 Implementation in API Client:**
```javascript
// /frontend/src/api/client.js
export const cartAPI = {
  addItem: (sessionId, item) => 
    apiClient.post(`/cart/${sessionId}/items`, item),  // Full URL: POST /api/cart/session-abc/items
};
```

**Request Body:**
```json
{
  "product_id": "prod-1",
  "quantity": 1
}
```

---

#### PUT `/api/cart/{session_id}/items/{product_id}` - Update Quantity

**📁 File: `/frontend/src/pages/Cart.jsx`**
```javascript
// Line ~74-90
const handleUpdateQuantity = async (productId, newQuantity) => {
  try {
    const sessionId = getSessionId();
    
    if (newQuantity <= 0) {
      await handleRemoveItem(productId);
      return;
    }
    
    await cartAPI.updateItem(sessionId, productId, newQuantity);  // 👈 CALLS PUT /api/cart/{session_id}/items/{id}
    
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
    
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to update quantity.",
      variant: "destructive",
    });
  }
};
```

**📝 Implementation in API Client:**
```javascript
// /frontend/src/api/client.js
export const cartAPI = {
  updateItem: (sessionId, productId, quantity) => 
    apiClient.put(`/cart/${sessionId}/items/${productId}`, { quantity }),
};
```

**Request Body:**
```json
{
  "quantity": 3
}
```

---

#### DELETE `/api/cart/{session_id}/items/{product_id}` - Remove Item

**📁 File: `/frontend/src/pages/Cart.jsx`**
```javascript
// Line ~58-72
const handleRemoveItem = async (productId) => {
  try {
    const sessionId = getSessionId();
    await cartAPI.removeItem(sessionId, productId);  // 👈 CALLS DELETE /api/cart/{session_id}/items/{id}
    
    setCartItems(prev => prev.filter(item => item.id !== productId));
    
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to remove item from cart.",
      variant: "destructive",
    });
  }
};
```

**📝 Implementation in API Client:**
```javascript
// /frontend/src/api/client.js
export const cartAPI = {
  removeItem: (sessionId, productId) => 
    apiClient.delete(`/cart/${sessionId}/items/${productId}`),
};
```

---

### 3. Orders API

#### POST `/api/orders` - Create Order

**📁 File: `/frontend/src/pages/Cart.jsx`**
```javascript
// Line ~100-107
const handleCheckout = () => {
  toast({
    title: "Checkout initiated",
    description: "Proceeding to checkout...",
  });
  // TO IMPLEMENT: Create order via ordersAPI.create()
};
```

**📝 Implementation in API Client (TO USE):**
```javascript
// /frontend/src/api/client.js
export const ordersAPI = {
  create: (orderData) => apiClient.post('/orders', orderData),
};

// Usage example:
const response = await ordersAPI.create({
  session_id: "session-abc-123",
  customer_name: "John Doe",
  customer_email: "john@example.com"
});
```

**Request Body:**
```json
{
  "session_id": "session-abc-123",
  "customer_name": "John Doe",
  "customer_email": "john@example.com"
}
```

---

### 4. Contact API

#### POST `/api/contact` - Submit Contact Form

**📁 File: `/frontend/src/pages/Contact.jsx`**
```javascript
// Line ~23-42
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    await contactAPI.submit(formData);  // 👈 CALLS POST /api/contact
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you as soon as possible.",
    });
    
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to send message. Please try again.",
      variant: "destructive",
    });
  }
};
```

**📝 Implementation in API Client:**
```javascript
// /frontend/src/api/client.js
export const contactAPI = {
  submit: (messageData) => apiClient.post('/contact', messageData),
};
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Product Inquiry",
  "message": "I have a question about..."
}
```

---

### 5. Testimonials API

#### GET `/api/testimonials` - Get All Testimonials

**📁 File: `/frontend/src/pages/Home.jsx`**
```javascript
// Line ~25-35
const fetchData = async () => {
  try {
    const [productsRes, testimonialsRes] = await Promise.all([
      productsAPI.getAll(),
      testimonialsAPI.getAll()  // 👈 CALLS /api/testimonials
    ]);
    
    setProducts(productsRes.data);
    setTestimonials(testimonialsRes.data);
  } catch (error) {
    toast({
      title: "Error loading data",
      description: "Please refresh the page to try again.",
      variant: "destructive",
    });
  }
};
```

**📝 Implementation in API Client:**
```javascript
// /frontend/src/api/client.js
export const testimonialsAPI = {
  getAll: () => apiClient.get('/testimonials'),
};
```

---

## 🔄 Session Management

### Helper Function: `getSessionId()`

**📁 File: `/frontend/src/api/client.js`**
```javascript
// Line ~60-67
export const getSessionId = () => {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = 'session-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
    localStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};
```

**Usage:**
```javascript
const sessionId = getSessionId();  // Returns: "session-abc123-1234567890"
```

This creates a unique ID for each user's browser to track their cart without requiring login.

---

## 🎯 How to Update Backend URL

### When You Deploy Backend:

#### 1. Update Environment Variable
```bash
# Edit /frontend/.env
REACT_APP_BACKEND_URL=https://bookblaze-backend.onrender.com
```

#### 2. NO Code Changes Needed!
The API client automatically uses the environment variable:
```javascript
// /frontend/src/api/client.js
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;
```

#### 3. Rebuild & Redeploy Frontend
```bash
cd frontend
yarn build
# Deploy to Vercel/Netlify
```

---

## 📊 Complete Endpoint Overview

### Visual Mapping:

```
┌─────────────────────────────────────────────────────────┐
│  FRONTEND PAGES                                         │
├─────────────────────────────────────────────────────────┤
│  Home.jsx                                               │
│    ├─ GET /api/products         (fetch all products)   │
│    ├─ GET /api/testimonials     (fetch testimonials)   │
│    └─ POST /api/cart/.../items  (add to cart)         │
│                                                          │
│  Products.jsx                                           │
│    ├─ GET /api/products         (fetch all products)   │
│    └─ POST /api/cart/.../items  (add to cart)         │
│                                                          │
│  ProductDetail.jsx                                      │
│    ├─ GET /api/products/{slug}  (fetch one product)    │
│    └─ POST /api/cart/.../items  (add to cart)         │
│                                                          │
│  Cart.jsx                                               │
│    ├─ GET /api/cart/{session}   (fetch cart)          │
│    ├─ GET /api/products         (get product details) │
│    ├─ PUT /api/cart/.../items/. (update quantity)     │
│    ├─ DELETE /api/cart/.../...  (remove item)         │
│    └─ POST /api/orders          (create order - TBD)  │
│                                                          │
│  Contact.jsx                                            │
│    └─ POST /api/contact         (submit form)         │
│                                                          │
│  App.js                                                 │
│    └─ GET /api/cart/{session}   (get cart count)      │
└─────────────────────────────────────────────────────────┘
```

---

## 🧪 Testing Endpoints in Postman

### Step 1: Import Collection
1. Open Postman
2. Click **Import**
3. Select `/app/BookBlaze_API_Collection.postman_collection.json`

### Step 2: Update Variables
1. Click on collection name
2. Go to **Variables** tab
3. Update:
   - `base_url`: Your backend URL
   - `session_id`: Test session ID

### Step 3: Test Endpoints

**Test Flow:**
1. **GET Products** → Should return 3 products
2. **GET Testimonials** → Should return 5 testimonials
3. **POST Add to Cart** → Add product to cart
4. **GET Cart** → See cart with item
5. **PUT Update Quantity** → Change quantity
6. **DELETE Remove Item** → Remove from cart
7. **POST Contact** → Submit message

---

## 📝 Summary

### Key Files to Update Backend URL:

| File | Purpose | Line |
|------|---------|------|
| `/frontend/.env` | Backend URL config | 1 |
| `/frontend/src/api/client.js` | API client setup | 4 |

### All API Calls Go Through:
```
/frontend/src/api/client.js
```

This file contains:
- `productsAPI` - Product endpoints
- `cartAPI` - Cart endpoints
- `ordersAPI` - Order endpoints
- `contactAPI` - Contact endpoints
- `testimonialsAPI` - Testimonial endpoints
- `getSessionId()` - Session helper

### Frontend Files That Make API Calls:
1. `App.js` - Cart count
2. `Home.jsx` - Products, testimonials, add to cart
3. `Products.jsx` - Products, add to cart
4. `ProductDetail.jsx` - Single product, add to cart
5. `Cart.jsx` - Cart CRUD operations
6. `Contact.jsx` - Contact form

**That's it!** All API endpoints are documented and mapped to frontend code! 🎉
