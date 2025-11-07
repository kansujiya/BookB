import requests
import json
import uuid
from datetime import datetime

# Get backend URL from frontend .env
BACKEND_URL = "https://ebook-store-45.preview.emergentagent.com/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'

def print_test(test_name):
    print(f"\n{Colors.BLUE}{'='*80}{Colors.END}")
    print(f"{Colors.BLUE}TEST: {test_name}{Colors.END}")
    print(f"{Colors.BLUE}{'='*80}{Colors.END}")

def print_success(message):
    print(f"{Colors.GREEN}✓ {message}{Colors.END}")

def print_error(message):
    print(f"{Colors.RED}✗ {message}{Colors.END}")

def print_info(message):
    print(f"{Colors.YELLOW}ℹ {message}{Colors.END}")

# Test data
test_session_id = f"test-session-{uuid.uuid4()}"
test_product_id = None
test_order_number = None

def test_1_create_test_product():
    """Create a test product for order testing"""
    print_test("Create Test Product")
    
    product_data = {
        "title": "Test eBook - Python Mastery",
        "slug": f"test-python-mastery-{uuid.uuid4()}",
        "image": "https://via.placeholder.com/400x600/4F46E5/FFFFFF?text=Python+Mastery",
        "original_price": 999,
        "current_price": 599,
        "description": "Master Python programming with this comprehensive guide",
        "long_description": "This comprehensive guide covers everything from basics to advanced Python concepts.",
        "features": [
            "Complete Python fundamentals",
            "Advanced programming techniques",
            "Real-world projects",
            "Lifetime access"
        ]
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/products", json=product_data)
        print_info(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            global test_product_id
            product = response.json()
            test_product_id = product['id']
            print_success(f"Product created successfully with ID: {test_product_id}")
            return True
        else:
            print_error(f"Failed to create product: {response.text}")
            return False
    except Exception as e:
        print_error(f"Exception occurred: {str(e)}")
        return False

def test_2_add_product_to_cart():
    """Add product to cart before creating order"""
    print_test("Add Product to Cart")
    
    if not test_product_id:
        print_error("No test product available. Skipping test.")
        return False
    
    cart_item = {
        "product_id": test_product_id,
        "quantity": 2
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/cart/{test_session_id}/items",
            json=cart_item
        )
        print_info(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            cart = response.json()
            print_success(f"Product added to cart successfully")
            print_info(f"Cart has {len(cart['items'])} item(s)")
            return True
        else:
            print_error(f"Failed to add to cart: {response.text}")
            return False
    except Exception as e:
        print_error(f"Exception occurred: {str(e)}")
        return False

def test_3_create_order_with_complete_billing():
    """Test order creation with complete billing details"""
    print_test("Create Order with Complete Billing Details")
    
    order_data = {
        "session_id": test_session_id,
        "customer_name": "Rajesh Kumar",
        "customer_email": "rajesh.kumar@bookblaze.com",
        "customer_phone": "9876543210",
        "billing_address": "123 MG Road, Koramangala, Apt 4B",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400001"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/orders", json=order_data)
        print_info(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            global test_order_number
            order = response.json()
            test_order_number = order['order_number']
            
            print_success(f"Order created successfully: {test_order_number}")
            
            # Verify all billing fields are present
            billing_fields = {
                "customer_name": order.get('customer_name'),
                "customer_email": order.get('customer_email'),
                "customer_phone": order.get('customer_phone'),
                "billing_address": order.get('billing_address'),
                "city": order.get('city'),
                "state": order.get('state'),
                "pincode": order.get('pincode')
            }
            
            print_info("Verifying billing fields in response:")
            all_fields_present = True
            for field, value in billing_fields.items():
                if value == order_data[field]:
                    print_success(f"  {field}: {value}")
                else:
                    print_error(f"  {field}: Expected '{order_data[field]}', got '{value}'")
                    all_fields_present = False
            
            # Verify order items
            if 'items' in order and len(order['items']) > 0:
                print_success(f"Order has {len(order['items'])} item(s)")
            else:
                print_error("Order has no items")
                all_fields_present = False
            
            # Verify pricing
            if order.get('subtotal') and order.get('total'):
                print_success(f"Subtotal: ₹{order['subtotal']}, Total: ₹{order['total']}")
            else:
                print_error("Missing pricing information")
                all_fields_present = False
            
            return all_fields_present
        else:
            print_error(f"Failed to create order: {response.text}")
            return False
    except Exception as e:
        print_error(f"Exception occurred: {str(e)}")
        return False

def test_4_verify_cart_cleared():
    """Verify cart is cleared after order creation"""
    print_test("Verify Cart Cleared After Order")
    
    try:
        response = requests.get(f"{BACKEND_URL}/cart/{test_session_id}")
        print_info(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            cart = response.json()
            if len(cart.get('items', [])) == 0:
                print_success("Cart is empty after order creation")
                return True
            else:
                print_error(f"Cart still has {len(cart['items'])} item(s)")
                return False
        else:
            print_error(f"Failed to fetch cart: {response.text}")
            return False
    except Exception as e:
        print_error(f"Exception occurred: {str(e)}")
        return False

def test_5_retrieve_order_with_billing():
    """Test order retrieval and verify billing details are present"""
    print_test("Retrieve Order and Verify Billing Details")
    
    if not test_order_number:
        print_error("No test order available. Skipping test.")
        return False
    
    try:
        response = requests.get(f"{BACKEND_URL}/orders/{test_order_number}")
        print_info(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            order = response.json()
            print_success(f"Order retrieved successfully: {test_order_number}")
            
            # Verify billing fields
            required_fields = [
                'customer_name', 'customer_email', 'customer_phone',
                'billing_address', 'city', 'state', 'pincode'
            ]
            
            print_info("Verifying billing fields in retrieved order:")
            all_fields_present = True
            for field in required_fields:
                if field in order:
                    print_success(f"  {field}: {order[field]}")
                else:
                    print_error(f"  {field}: Missing")
                    all_fields_present = False
            
            return all_fields_present
        else:
            print_error(f"Failed to retrieve order: {response.text}")
            return False
    except Exception as e:
        print_error(f"Exception occurred: {str(e)}")
        return False

def test_6_order_with_empty_billing_fields():
    """Test order creation with empty billing fields (should work as they're optional)"""
    print_test("Create Order with Empty Billing Fields")
    
    # First add product to a new cart
    new_session_id = f"test-session-{uuid.uuid4()}"
    cart_item = {
        "product_id": test_product_id,
        "quantity": 1
    }
    
    try:
        # Add to cart
        cart_response = requests.post(
            f"{BACKEND_URL}/cart/{new_session_id}/items",
            json=cart_item
        )
        
        if cart_response.status_code != 200:
            print_error(f"Failed to add to cart: {cart_response.text}")
            return False
        
        # Create order with minimal fields
        order_data = {
            "session_id": new_session_id,
            "customer_name": "Minimal User",
            "customer_email": "minimal@bookblaze.com"
        }
        
        response = requests.post(f"{BACKEND_URL}/orders", json=order_data)
        print_info(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            order = response.json()
            print_success(f"Order created with minimal fields: {order['order_number']}")
            
            # Verify empty fields default to ""
            empty_fields = ['customer_phone', 'billing_address', 'city', 'state', 'pincode']
            all_empty = True
            for field in empty_fields:
                value = order.get(field, None)
                if value == "" or value is None:
                    print_success(f"  {field}: Empty (as expected)")
                else:
                    print_error(f"  {field}: Expected empty, got '{value}'")
                    all_empty = False
            
            return all_empty
        else:
            print_error(f"Failed to create order: {response.text}")
            return False
    except Exception as e:
        print_error(f"Exception occurred: {str(e)}")
        return False

def test_7_order_with_invalid_session():
    """Test order creation with invalid session_id (should fail)"""
    print_test("Create Order with Invalid Session ID")
    
    order_data = {
        "session_id": "non-existent-session-id",
        "customer_name": "Test User",
        "customer_email": "test@bookblaze.com",
        "customer_phone": "9876543210",
        "billing_address": "123 Test Street",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400001"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/orders", json=order_data)
        print_info(f"Status Code: {response.status_code}")
        
        if response.status_code == 400:
            print_success("Correctly rejected order with invalid session (400 error)")
            print_info(f"Error message: {response.json().get('detail', 'No detail')}")
            return True
        elif response.status_code == 200:
            print_error("Order was created with invalid session (should have failed)")
            return False
        else:
            print_error(f"Unexpected status code: {response.status_code}")
            return False
    except Exception as e:
        print_error(f"Exception occurred: {str(e)}")
        return False

def test_8_order_with_empty_cart():
    """Test order creation with empty cart (should fail)"""
    print_test("Create Order with Empty Cart")
    
    empty_session_id = f"empty-session-{uuid.uuid4()}"
    
    order_data = {
        "session_id": empty_session_id,
        "customer_name": "Test User",
        "customer_email": "test@bookblaze.com",
        "customer_phone": "9876543210",
        "billing_address": "123 Test Street",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400001"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/orders", json=order_data)
        print_info(f"Status Code: {response.status_code}")
        
        if response.status_code == 400:
            print_success("Correctly rejected order with empty cart (400 error)")
            print_info(f"Error message: {response.json().get('detail', 'No detail')}")
            return True
        elif response.status_code == 200:
            print_error("Order was created with empty cart (should have failed)")
            return False
        else:
            print_error(f"Unexpected status code: {response.status_code}")
            return False
    except Exception as e:
        print_error(f"Exception occurred: {str(e)}")
        return False

def run_all_tests():
    """Run all tests and report results"""
    print(f"\n{Colors.BLUE}{'='*80}{Colors.END}")
    print(f"{Colors.BLUE}BOOKBLAZE CHECKOUT & ORDER CREATION TESTS{Colors.END}")
    print(f"{Colors.BLUE}Backend URL: {BACKEND_URL}{Colors.END}")
    print(f"{Colors.BLUE}{'='*80}{Colors.END}")
    
    tests = [
        ("Create Test Product", test_1_create_test_product),
        ("Add Product to Cart", test_2_add_product_to_cart),
        ("Create Order with Complete Billing", test_3_create_order_with_complete_billing),
        ("Verify Cart Cleared", test_4_verify_cart_cleared),
        ("Retrieve Order with Billing", test_5_retrieve_order_with_billing),
        ("Order with Empty Billing Fields", test_6_order_with_empty_billing_fields),
        ("Order with Invalid Session", test_7_order_with_invalid_session),
        ("Order with Empty Cart", test_8_order_with_empty_cart),
    ]
    
    results = []
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print_error(f"Test '{test_name}' crashed: {str(e)}")
            results.append((test_name, False))
    
    # Print summary
    print(f"\n{Colors.BLUE}{'='*80}{Colors.END}")
    print(f"{Colors.BLUE}TEST SUMMARY{Colors.END}")
    print(f"{Colors.BLUE}{'='*80}{Colors.END}")
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        if result:
            print_success(f"{test_name}")
        else:
            print_error(f"{test_name}")
    
    print(f"\n{Colors.BLUE}{'='*80}{Colors.END}")
    if passed == total:
        print(f"{Colors.GREEN}ALL TESTS PASSED: {passed}/{total}{Colors.END}")
    else:
        print(f"{Colors.RED}TESTS FAILED: {total - passed}/{total} failed, {passed}/{total} passed{Colors.END}")
    print(f"{Colors.BLUE}{'='*80}{Colors.END}\n")
    
    return passed == total

if __name__ == "__main__":
    success = run_all_tests()
    exit(0 if success else 1)
