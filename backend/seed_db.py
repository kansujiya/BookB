import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Seed data
products_data = [
    {
        "id": "prod-1",
        "title": "Foundations of Software Design Volume 2",
        "slug": "foundations-of-software-design-volume-2",
        "image": "https://digital.marksense.in/wp-content/uploads/2025/06/foundations_of_software_design_vol_2.webp",
        "original_price": 1499,
        "current_price": 9,
        "description": "Advanced concepts in software architecture and design patterns for modern applications.",
        "long_description": "Dive deep into advanced software architecture concepts, design patterns, and best practices. This comprehensive guide covers microservices, event-driven architecture, scalability patterns, and real-world case studies from leading tech companies.",
        "features": [
            "Advanced Design Patterns",
            "Microservices Architecture",
            "Event-Driven Systems",
            "Scalability Best Practices",
            "Real-World Case Studies",
            "150+ Visual Diagrams"
        ],
        "download_link": "https://drive.google.com/file/d/1pTAipI93r6nmWDdKxL_3dFuQMpTwEiO5/view?usp=drive_link",
        "pdf_link": "https://drive.google.com/file/d/1pTAipI93r6nmWDdKxL_3dFuQMpTwEiO5/view?usp=drive_link"
    },
    {
        "id": "prod-2",
        "title": "Software System Design",
        "slug": "software-system-design",
        "image": "https://digital.marksense.in/wp-content/uploads/2025/06/software_system_design_cover_photo.webp",
        "original_price": 1499,
        "current_price": 9,
        "description": "Master system design fundamentals to advanced concepts with real-world case studies.",
        "long_description": "Used by 1000+ engineers featuring 100+ visuals to master real-world concepts. Learn how to design software like a pro with practical examples from Uber, Facebook Messenger, Zoom, Swiggy, Instagram, Slack, and Dropbox.",
        "features": [
            "Crack FAANG Interviews",
            "100+ System Design Flowcharts",
            "Real-World Case Studies (Uber, Instagram, etc.)",
            "Scalability Principles",
            "Database & Caching Strategies",
            "API Design Best Practices"
        ],
        "download_link": "https://drive.google.com/file/d/1pTAipI93r6nmWDdKxL_3dFuQMpTwEiO5/view?usp=drive_link",
        "pdf_link": "https://drive.google.com/file/d/1pTAipI93r6nmWDdKxL_3dFuQMpTwEiO5/view?usp=drive_link"
    },
    {
        "id": "prod-3",
        "title": "Software Architecture Patterns",
        "slug": "software-architecture-patterns",
        "image": "https://digital.marksense.in/wp-content/uploads/2025/04/sap_cover_photo.png.webp",
        "original_price": 1499,
        "current_price": 9,
        "description": "Comprehensive guide to architectural patterns and best practices in software development.",
        "long_description": "Master essential software architecture patterns including Layered, Event-Driven, Microservices, Space-Based, and Service-Oriented Architecture. Learn when to use each pattern and understand trade-offs for building robust, scalable systems.",
        "features": [
            "Layered Architecture",
            "Event-Driven Architecture",
            "Microservices Patterns",
            "Space-Based Architecture",
            "Service-Oriented Architecture (SOA)",
            "Trade-off Analysis & Decision Making"
        ],
        "download_link": "https://drive.google.com/file/d/1pTAipI93r6nmWDdKxL_3dFuQMpTwEiO5/view?usp=drive_link",
        "pdf_link": "https://drive.google.com/file/d/1pTAipI93r6nmWDdKxL_3dFuQMpTwEiO5/view?usp=drive_link"
    }
]

testimonials_data = [
    {
        "id": 1,
        "name": "Ankit Sharma",
        "position": "Software Engineer at Google",
        "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwwfHx8fDE3NjA2NDYyMDd8MA&ixlib=rb-4.1.0&q=85",
        "text": "This book gave me the confidence to tackle system design interviews at top tech companies. I landed my dream job at Google!",
        "is_active": True
    },
    {
        "id": 2,
        "name": "Priya Patel",
        "position": "SDE II at Microsoft",
        "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwwfHx8fDE3NjA2NDYyMDd8MA&ixlib=rb-4.1.0&q=85",
        "text": "Clear, practical, and packed with examples. The breakdown of databases, caching, and microservices was game-changing.",
        "is_active": True
    },
    {
        "id": 3,
        "name": "Rahul Verma",
        "position": "SDE III at Amazon",
        "image": "https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwwfHx8fDE3NjA2NDYyMDd8MA&ixlib=rb-4.1.0&q=85",
        "text": "This book made complex topics like distributed systems and scalability easy to understand. Highly recommend!",
        "is_active": True
    },
    {
        "id": 4,
        "name": "Neha Yadav",
        "position": "Staff Engineer at Intuit",
        "image": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwwfHx8fDE3NjA2NDYyMDd8MA&ixlib=rb-4.1.0&q=85",
        "text": "Before reading this book, I was overwhelmed with architecture choices. This book made everything simple. Now, I can confidently decide between Monolithic, Microservices, and Event-Driven models!",
        "is_active": True
    },
    {
        "id": 5,
        "name": "Arjun Malhotra",
        "position": "Enterprise Architect at TCS",
        "image": "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg",
        "text": "This book is a goldmine for any software engineer aspiring to become a solutions architect. It provides structured learning, real-world applications, and practical exercises that make learning engaging!",
        "is_active": True
    }
]

async def seed_database():
    print("Starting database seeding...")
    
    # Clear existing data
    await db.products.delete_many({})
    await db.testimonials.delete_many({})
    print("Cleared existing data")
    
    # Insert products
    await db.products.insert_many(products_data)
    print(f"Inserted {len(products_data)} products")
    
    # Insert testimonials
    await db.testimonials.insert_many(testimonials_data)
    print(f"Inserted {len(testimonials_data)} testimonials")
    
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    asyncio.run(seed_database())
    client.close()
