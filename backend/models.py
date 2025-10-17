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

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

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

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_number: str
    customer_email: str
    customer_name: str
    items: List[OrderItem]
    subtotal: int
    discount: int
    total: int
    status: str = "pending"
    payment_status: str = "pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

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
