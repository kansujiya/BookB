# 💳 Razorpay Payment Integration Guide

## Overview
BookBlaze uses Razorpay payment gateway for secure online payments. This guide explains the complete integration flow.

---

## 🔑 Prerequisites

### 1. Razorpay Account Setup
1. Sign up at [https://razorpay.com/](https://razorpay.com/)
2. Complete KYC verification for live mode
3. Get your API credentials:
   - Go to **Settings** → **API Keys**
   - Generate **Test Keys** (for testing)
   - Generate **Live Keys** (for production)

### 2. API Credentials
```
Test Mode:
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx

Live Mode:
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
```

---

## 🛠️ Implementation

### Backend Setup (FastAPI)

#### 1. Install Dependencies
```bash
cd /app/backend
pip install razorpay
pip freeze > requirements.txt
```

#### 2. Environment Variables
Add to `/app/backend/.env`:
```env
RAZORPAY_KEY_ID="rzp_test_Rda1vj7q3n34NZ"
RAZORPAY_KEY_SECRET="eAQidhEaHmAO7dCtplrJNaOT"
```

#### 3. Backend Code (`server.py`)

**Import Razorpay:**
```python
import razorpay
import hmac
import hashlib

# Initialize Razorpay client
razorpay_client = razorpay.Client(auth=(
    os.environ['RAZORPAY_KEY_ID'], 
    os.environ['RAZORPAY_KEY_SECRET']
))
```

**Create Order Endpoint:**
```python
@api_router.post("/razorpay/create-order")
async def create_razorpay_order(order_data: RazorpayOrderCreate):
    razorpay_order = razorpay_client.order.create({
        "amount": order_data.amount,  # Amount in paise
        "currency": order_data.currency,
        "receipt": order_data.receipt,
        "notes": order_data.notes,
        "payment_capture": 1
    })
    return razorpay_order
```

**Verify Payment Endpoint:**
```python
@api_router.post("/razorpay/verify-payment")
async def verify_payment(payment_data: PaymentVerification):
    # Generate signature
    generated_signature = hmac.new(
        os.environ['RAZORPAY_KEY_SECRET'].encode(),
        f"{payment_data.razorpay_order_id}|{payment_data.razorpay_payment_id}".encode(),
        hashlib.sha256
    ).hexdigest()
    
    # Verify signature
    if generated_signature != payment_data.razorpay_signature:
        raise HTTPException(status_code=400, detail="Invalid payment signature")
    
    # Update order status
    await db.orders.update_one(
        {"order_number": payment_data.order_number},
        {"$set": {
            "razorpay_order_id": payment_data.razorpay_order_id,
            "razorpay_payment_id": payment_data.razorpay_payment_id,
            "razorpay_signature": payment_data.razorpay_signature,
            "payment_status": "paid",
            "status": "completed"
        }}
    )
    
    return {"status": "success"}
```

---

### Frontend Setup (React)

#### 1. Environment Variables
Add to `/app/frontend/.env`:
```env
REACT_APP_RAZORPAY_KEY_ID=rzp_test_Rda1vj7q3n34NZ
```

#### 2. Load Razorpay Script
```javascript
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
```

#### 3. Payment Flow
```javascript
const handlePayment = async () => {
  // 1. Create order in database
  const orderResponse = await fetch(`${BACKEND_URL}/api/orders`, {
    method: 'POST',
    body: JSON.stringify(orderData)
  });
  const order = await orderResponse.json();

  // 2. Create Razorpay order
  const razorpayOrderResponse = await fetch(`${BACKEND_URL}/api/razorpay/create-order`, {
    method: 'POST',
    body: JSON.stringify({
      amount: total * 100, // Convert to paise
      currency: "INR",
      receipt: order.order_number
    })
  });
  const razorpayOrder = await razorpayOrderResponse.json();

  // 3. Open Razorpay checkout
  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    name: "BookBlaze",
    order_id: razorpayOrder.id,
    handler: async function (response) {
      // 4. Verify payment on backend
      await fetch(`${BACKEND_URL}/api/razorpay/verify-payment`, {
        method: 'POST',
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          order_number: order.order_number
        })
      });
      
      // 5. Show success message
      setPaymentSuccess(true);
    },
    prefill: {
      name: formData.name,
      email: formData.email,
      contact: formData.phone
    },
    theme: {
      color: "#256975"
    }
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
```

---

## 🔄 Complete Payment Flow

```
1. User fills checkout form
   ↓
2. Frontend creates order in database (status: pending)
   ↓
3. Frontend creates Razorpay order via backend
   ↓
4. Razorpay modal opens with payment options
   ↓
5. User completes payment (UPI/Card/NetBanking)
   ↓
6. Razorpay sends payment response to frontend
   ↓
7. Frontend sends payment details to backend for verification
   ↓
8. Backend verifies payment signature (HMAC SHA256)
   ↓
9. Backend updates order status to "completed"
   ↓
10. Backend sends confirmation email with download links
   ↓
11. Frontend shows success message
   ↓
12. Cart is cleared
```

---

## 🔒 Security Features

### 1. Signature Verification
- Every payment is verified using HMAC SHA256 signature
- Prevents payment tampering and fraud
- Secret key never exposed to frontend

### 2. Server-Side Validation
- All payment verification happens on backend
- Frontend cannot fake payment success
- Database only updated after successful verification

### 3. Environment Variables
- API keys stored securely in `.env` files
- Never committed to git
- Different keys for test/live mode

---

## 🧪 Testing

### Test Card Details
```
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits
Expiry: Any future date
Name: Any name
```

### Test UPI ID
```
success@razorpay
```

### Test Payment Scenarios
1. **Successful Payment**: Use test card above
2. **Failed Payment**: Use card `4000 0000 0000 0002`
3. **Payment Cancel**: Close the Razorpay modal

---

## 📧 Email Integration

After successful payment, an automated email is sent containing:
- ✅ Order number and date
- ✅ Payment ID
- ✅ Purchased items with download links
- ✅ Customer details
- ✅ Recommended products

**Email Service**: Hostinger SMTP
**From**: sell@bookblaze.org

---

## 💰 Pricing & Fees

### Razorpay Fees
- **Domestic Cards**: 2% + GST
- **International Cards**: 3% + GST
- **UPI/RuPay**: 0% (Free)
- **NetBanking**: 2% + GST
- **Wallets**: 2% + GST

### Settlement Time
- **Test Mode**: Instant (no real money)
- **Live Mode**: T+3 days (3 business days)

---

## 🚀 Going Live

### Checklist
1. ✅ Complete KYC on Razorpay dashboard
2. ✅ Get live API keys
3. ✅ Update `.env` files with live keys:
   ```env
   RAZORPAY_KEY_ID="rzp_live_xxxxxxxxxxxxx"
   RAZORPAY_KEY_SECRET="xxxxxxxxxxxxxxxx"
   ```
4. ✅ Test end-to-end flow with test keys
5. ✅ Configure webhook (optional)
6. ✅ Set up auto-settlement
7. ✅ Deploy to production
8. ✅ Test with small live transaction

---

## 🐛 Troubleshooting

### Payment Modal Not Opening
```javascript
// Check if script is loaded
console.log(window.Razorpay); // Should not be undefined

// Check environment variable
console.log(process.env.REACT_APP_RAZORPAY_KEY_ID);
```

### Payment Verification Failing
```python
# Check signature generation
print(f"Order ID: {order_id}")
print(f"Payment ID: {payment_id}")
print(f"Generated Signature: {generated_signature}")
print(f"Received Signature: {signature}")
```

### Email Not Sending
```python
# Check SMTP settings
print(f"SMTP Host: {os.environ.get('SMTP_HOST')}")
print(f"SMTP User: {os.environ.get('SMTP_USER')}")
# Check logs for email errors
```

---

## 📞 Support

**Razorpay Support:**
- Dashboard: https://dashboard.razorpay.com/
- Docs: https://razorpay.com/docs/
- Support: support@razorpay.com

**BookBlaze Support:**
- Email: sell@bookblaze.org

---

## 🔗 API Endpoints

### Backend Endpoints
```
POST /api/razorpay/create-order
POST /api/razorpay/verify-payment
POST /api/orders
GET /api/products
```

### Request/Response Examples

**Create Razorpay Order:**
```json
POST /api/razorpay/create-order
{
  "amount": 49900,
  "currency": "INR",
  "receipt": "ORD20250115001"
}

Response:
{
  "id": "order_xxxxxxxxxxxxx",
  "amount": 49900,
  "currency": "INR",
  "receipt": "ORD20250115001",
  "status": "created"
}
```

**Verify Payment:**
```json
POST /api/razorpay/verify-payment
{
  "razorpay_order_id": "order_xxxxxxxxxxxxx",
  "razorpay_payment_id": "pay_xxxxxxxxxxxxx",
  "razorpay_signature": "xxxxxxxxxxxxxxxxxxxxxxxx",
  "order_number": "ORD20250115001"
}

Response:
{
  "status": "success",
  "message": "Payment verified successfully"
}
```

---

## ✅ Best Practices

1. **Always verify payments on server-side**
2. **Use environment variables for API keys**
3. **Test thoroughly in test mode before going live**
4. **Handle payment failures gracefully**
5. **Send email confirmation after successful payment**
6. **Log all payment transactions**
7. **Implement retry logic for email sending**
8. **Use HTTPS in production**
9. **Keep Razorpay SDK updated**
10. **Monitor payment success rates**

---

## 📝 Current Configuration

```
Environment: Test Mode
Razorpay Key ID: rzp_test_Rda1vj7q3n34NZ
Theme Color: #256975 (Blue)
Currency: INR
Payment Capture: Automatic
Email Service: Hostinger SMTP
Email From: sell@bookblaze.org
```

---

**Last Updated**: January 2025
**Version**: 1.0
