# Razorpay Integration Guide for BookBlaze

## 🎯 Overview
This guide will help you integrate Razorpay payment gateway for checkout and show order confirmation after successful payment.

## 📋 Table of Contents
1. [Razorpay Account Setup](#razorpay-account-setup)
2. [Installation](#installation)
3. [Backend Integration](#backend-integration)
4. [Frontend Integration](#frontend-integration)
5. [Testing](#testing)

---

## 🔑 Razorpay Account Setup

### Step 1: Create Razorpay Account
1. Go to: https://razorpay.com
2. Click **Sign Up** (or **Login** if you have account)
3. Complete registration
4. Verify your email

### Step 2: Get API Keys
1. Login to Razorpay Dashboard
2. Go to **Settings** → **API Keys**
3. Click **Generate Test Keys** (for testing)
4. You'll get:
   ```
   Key ID: rzp_test_XXXXXXXXXXXXX
   Key Secret: YYYYYYYYYYYYYYYY
   ```
5. **Save these keys securely!**

### Step 3: Test Mode vs Live Mode
- **Test Mode:** Use `rzp_test_` keys for development
- **Live Mode:** Use `rzp_live_` keys for production (requires KYC verification)

---

## 📦 Installation

### Frontend Package:
```bash
cd frontend
yarn add razorpay-web
# or
npm install razorpay-web
```

### Backend Package:
```bash
cd backend
pip install razorpay
```

Update `requirements.txt`:
```bash
cd backend
pip freeze | grep razorpay >> requirements.txt
```

---

## 🔧 Backend Integration

### Step 1: Add Razorpay to Backend `.env`
```bash
# backend/.env
MONGO_URL=mongodb+srv://...
DB_NAME=bookblaze_db
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=YYYYYYYYYYYYYYYY
```

### Step 2: Update `server.py` with Payment Endpoints

I'll update your backend code in the next steps.

---

## 💻 Frontend Integration

### Step 1: Add Razorpay to Frontend `.env`
```bash
# frontend/.env
REACT_APP_BACKEND_URL=http://localhost:8001
REACT_APP_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXX
```

### Step 2: Frontend Files to Update
1. **Cart.jsx** - Add Razorpay checkout
2. **OrderConfirmation.jsx** - Show success message (new file)
3. **api/client.js** - Add order endpoints
4. **App.js** - Add route for order confirmation

---

## 🎨 Payment Flow

```
┌─────────────────────────────────────────────────────────┐
│  1. User clicks "Proceed to Checkout"                  │
│     ↓                                                    │
│  2. Backend creates Razorpay order                      │
│     ↓                                                    │
│  3. Frontend opens Razorpay payment modal               │
│     ↓                                                    │
│  4. User enters payment details                         │
│     ↓                                                    │
│  5. Payment success/failure                             │
│     ↓                                                    │
│  6. Backend verifies payment signature                  │
│     ↓                                                    │
│  7. Create order in database                            │
│     ↓                                                    │
│  8. Clear cart                                          │
│     ↓                                                    │
│  9. Show "Order Confirmed" page                         │
│     "Team will provide PDF access in 24 hours"          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔐 Security Notes

1. **Never expose Key Secret on frontend!**
   - Key ID: ✅ Safe on frontend
   - Key Secret: ❌ Backend only!

2. **Always verify payment signature on backend**
   - Don't trust frontend payment status
   - Verify using Razorpay signature

3. **Use webhooks for production**
   - Razorpay will notify your backend about payment status
   - More reliable than frontend callbacks

---

## 🧪 Testing

### Test Card Details (Razorpay Test Mode)

**Successful Payment:**
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date
- OTP: `1234` (for OTP flow)

**Failed Payment:**
- Card Number: `4000 0000 0000 0002`
- Will trigger payment failure

**UPI Test:**
- UPI ID: `success@razorpay`

### Testing Flow:
1. Start backend: `uvicorn server:app --reload`
2. Start frontend: `yarn start`
3. Add items to cart
4. Click "Proceed to Checkout"
5. Enter customer details
6. Use test card: `4111 1111 1111 1111`
7. Complete payment
8. See order confirmation

---

## 💰 Razorpay Pricing

### Transaction Fees:
- **Domestic Cards:** 2% + GST
- **International Cards:** 3% + GST
- **UPI:** 0% (currently free)
- **Net Banking:** 2% + GST
- **Wallets:** 2% + GST

### No Setup Fee:
- ✅ Free account creation
- ✅ Free test mode
- ✅ Pay only on successful transactions

---

## 📞 Razorpay Support

- **Documentation:** https://razorpay.com/docs/
- **Support:** https://razorpay.com/support/
- **Test Dashboard:** https://dashboard.razorpay.com/test/
- **Live Dashboard:** https://dashboard.razorpay.com/live/

---

## ✅ Checklist

Before going live:

- [ ] Complete KYC verification on Razorpay
- [ ] Get live API keys (rzp_live_xxx)
- [ ] Update environment variables
- [ ] Test in live mode with small amount
- [ ] Set up webhooks for payment notifications
- [ ] Add refund handling
- [ ] Add payment failure handling
- [ ] Email notifications for orders
- [ ] PDF delivery system (manual or automated)

---

## 🚀 Next Steps

I'll now create/update the following files:
1. Backend: Update `server.py` with Razorpay integration
2. Frontend: Update `Cart.jsx` with payment flow
3. Frontend: Create `OrderConfirmation.jsx` page
4. Frontend: Update API client with order endpoints
5. Frontend: Add route in `App.js`
