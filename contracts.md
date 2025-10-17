# BookBlaze Backend Implementation Contracts

## Overview
This document outlines the API contracts, database models, and integration strategy for the BookBlaze eCommerce platform.

## Database Models

### 1. Product Model
```python
{
  "id": str (UUID),
  "title": str,
  "slug": str (unique),
  "image": str (URL),
  "original_price": int,
  "current_price": int,
  "description": str,
  "long_description": str,
  "features": List[str],
  "created_at": datetime,
  "updated_at": datetime
}
```

### 2. Cart Model
```python
{
  "id": str (UUID),
  "user_id": str (optional, for future auth),
  "session_id": str,
  "items": List[CartItem],
  "created_at": datetime,
  "updated_at": datetime
}

CartItem:
{
  "product_id": str,
  "quantity": int,
  "price_at_time": int
}
```

### 3. Order Model
```python
{
  "id": str (UUID),
  "order_number": str (unique),
  "customer_email": str,
  "customer_name": str,
  "items": List[OrderItem],
  "subtotal": int,
  "discount": int,
  "total": int,
  "status": str (pending/completed/failed),
  "payment_status": str,
  "created_at": datetime,
  "updated_at": datetime
}

OrderItem:
{
  "product_id": str,
  "product_title": str,
  "quantity": int,
  "price": int
}
```

### 4. Contact Message Model
```python
{
  "id": str (UUID),
  "name": str,
  "email": str,
  "subject": str,
  "message": str,
  "status": str (new/read/replied),
  "created_at": datetime
}
```

### 5. Testimonial Model
```python
{
  "id": int,
  "name": str,
  "position": str,
  "image": str (URL),
  "text": str,
  "is_active": bool,
  "created_at": datetime
}
```

## API Endpoints

### Products API

#### GET /api/products
- **Description**: Get all products
- **Response**: List[Product]
- **Frontend**: Replace mockData.products

#### GET /api/products/:slug
- **Description**: Get single product by slug
- **Response**: Product
- **Frontend**: ProductDetail page

#### POST /api/products (Admin)
- **Description**: Create new product
- **Request**: Product data
- **Response**: Product

#### PUT /api/products/:id (Admin)
- **Description**: Update product
- **Request**: Updated product data
- **Response**: Product

#### DELETE /api/products/:id (Admin)
- **Description**: Delete product
- **Response**: Success message

### Cart API

#### GET /api/cart/:session_id
- **Description**: Get cart by session ID
- **Response**: Cart

#### POST /api/cart/:session_id/items
- **Description**: Add item to cart
- **Request**: { product_id, quantity }
- **Response**: Updated Cart

#### PUT /api/cart/:session_id/items/:product_id
- **Description**: Update cart item quantity
- **Request**: { quantity }
- **Response**: Updated Cart

#### DELETE /api/cart/:session_id/items/:product_id
- **Description**: Remove item from cart
- **Response**: Updated Cart

#### DELETE /api/cart/:session_id
- **Description**: Clear cart
- **Response**: Success message

### Orders API

#### POST /api/orders
- **Description**: Create order from cart
- **Request**: { session_id, customer_name, customer_email }
- **Response**: Order

#### GET /api/orders/:order_number
- **Description**: Get order details
- **Response**: Order

#### GET /api/orders/email/:email
- **Description**: Get all orders for an email
- **Response**: List[Order]

### Contact API

#### POST /api/contact
- **Description**: Submit contact form
- **Request**: { name, email, subject, message }
- **Response**: Success message
- **Frontend**: Contact page form

#### GET /api/contact/messages (Admin)
- **Description**: Get all contact messages
- **Response**: List[ContactMessage]

### Testimonials API

#### GET /api/testimonials
- **Description**: Get all active testimonials
- **Response**: List[Testimonial]
- **Frontend**: Replace mockData.testimonials

## Frontend Integration Plan

### Phase 1: Setup API Client
- Create `src/api/client.js` with axios instance
- Use `process.env.REACT_APP_BACKEND_URL`

### Phase 2: Replace Mock Data
1. **Products**
   - Home.jsx: Fetch from `/api/products`
   - Products.jsx: Fetch from `/api/products`
   - ProductDetail.jsx: Fetch from `/api/products/:slug`

2. **Cart**
   - Generate session_id on first visit (localStorage)
   - Cart.jsx: Use `/api/cart/:session_id/*` endpoints
   - ProductCard: POST to `/api/cart/:session_id/items`

3. **Testimonials**
   - Home.jsx: Fetch from `/api/testimonials`

4. **Contact**
   - Contact.jsx: POST to `/api/contact`

### Phase 3: State Management
- Use React Context for cart state
- Sync localStorage with API responses

## Mock Data to Backend Mapping

### Current Mock Data (to be replaced)
- `mockData.products` → `/api/products`
- `mockData.testimonials` → `/api/testimonials`
- `localStorage.cart` → `/api/cart/:session_id`

### Components to Update
1. **Home.jsx**
   - Fetch products API
   - Fetch testimonials API
   - Update addToCart to use API

2. **Products.jsx**
   - Fetch products API
   - Update addToCart to use API

3. **ProductDetail.jsx**
   - Fetch product by slug
   - Update addToCart to use API

4. **Cart.jsx**
   - Fetch cart from API
   - Update quantity via API
   - Remove items via API
   - Checkout creates order via API

5. **Contact.jsx**
   - Submit form to API

## Implementation Order

1. **Backend Setup**
   - Define all models
   - Create database schemas
   - Implement CRUD operations

2. **API Implementation**
   - Products endpoints
   - Cart endpoints
   - Orders endpoints
   - Contact endpoints
   - Testimonials endpoints

3. **Seed Database**
   - Add 3 products from mockData
   - Add 5 testimonials from mockData

4. **Frontend Integration**
   - Create API client
   - Update components one by one
   - Test each integration
   - Remove mockData.js when complete

## Error Handling
- All endpoints return proper HTTP status codes
- Frontend shows toast notifications for errors
- Validation errors returned with 400 status
- 404 for not found resources
- 500 for server errors

## Security Considerations
- CORS configured for frontend domain
- Input validation on all endpoints
- SQL injection protection (using Pydantic models)
- Rate limiting on contact form
- Future: Add authentication for admin routes
