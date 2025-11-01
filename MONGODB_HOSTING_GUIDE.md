# MongoDB Hosting Guide for BookBlaze

## ❌ Can I host MongoDB on Vercel?
**NO!** Vercel is only for:
- ✅ Frontend (React/Next.js static sites)
- ✅ Serverless functions (API routes)
- ❌ NOT for databases
- ❌ NOT for long-running servers

## 🎯 Where to Host Each Component

### Complete Hosting Architecture:

```
┌─────────────────────────────────────────────────────────┐
│                   USER'S BROWSER                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│  FRONTEND (React)                                       │
│  ✅ Host on: Vercel / Netlify / GitHub Pages           │
│  URL: https://bookblaze.vercel.app                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓ API Calls
┌─────────────────────────────────────────────────────────┐
│  BACKEND (FastAPI)                                      │
│  ✅ Host on: Railway / Render / Heroku / DigitalOcean  │
│  URL: https://bookblaze-api.railway.app                │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓ Database Queries
┌─────────────────────────────────────────────────────────┐
│  DATABASE (MongoDB)                                     │
│  ✅ Host on: MongoDB Atlas (Recommended)               │
│  Connection: mongodb+srv://...                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🏆 RECOMMENDED: MongoDB Atlas (FREE!)

### Why MongoDB Atlas?
- ✅ **Official MongoDB Cloud Service**
- ✅ **FREE Tier** (512 MB storage - enough for your app)
- ✅ **No credit card required** for free tier
- ✅ **Automatic backups**
- ✅ **Global CDN** (fast from anywhere)
- ✅ **Easy setup** (5 minutes)
- ✅ **99.9% uptime**

### Step-by-Step Setup (FREE)

#### Step 1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with email or Google account
3. Choose **FREE** tier (M0)

#### Step 2: Create a Free Cluster
1. Click **"Build a Database"**
2. Select **"M0 FREE"** tier
3. Choose cloud provider:
   - AWS (Recommended)
   - Google Cloud
   - Azure
4. Select region closest to your users (e.g., Mumbai for India)
5. Cluster name: `BookBlaze` (or any name)
6. Click **"Create"**
7. Wait 1-3 minutes for cluster to deploy

#### Step 3: Create Database User
1. Go to **Security → Database Access**
2. Click **"Add New Database User"**
3. Authentication: **Password**
4. Username: `bookblaze_admin` (or any name)
5. Password: Generate strong password (SAVE THIS!)
6. User Privileges: **Read and write to any database**
7. Click **"Add User"**

#### Step 4: Whitelist IP Addresses
1. Go to **Security → Network Access**
2. Click **"Add IP Address"**
3. Choose one:
   - **Allow Access from Anywhere**: `0.0.0.0/0` (Easy, less secure)
   - **Add Your IP**: Click "Add Current IP Address" (More secure)
4. Click **"Confirm"**

#### Step 5: Get Connection String
1. Go to **Database → Clusters**
2. Click **"Connect"** button
3. Choose **"Connect your application"**
4. Driver: **Python** / Version: **3.12 or later**
5. Copy the connection string:

```
mongodb+srv://bookblaze_admin:<password>@bookblaze.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

6. **Replace `<password>`** with your actual password
7. Your final connection string will look like:

```
mongodb+srv://bookblaze_admin:MyP@ssw0rd123@bookblaze.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

#### Step 6: Update Backend `.env`
```bash
# backend/.env
MONGO_URL=mongodb+srv://bookblaze_admin:MyP@ssw0rd123@bookblaze.xxxxx.mongodb.net/?retryWrites=true&w=majority
DB_NAME=bookblaze_db
```

#### Step 7: Seed the Database
```bash
cd backend
python seed_db.py
```

✅ **Done! Your MongoDB is now hosted in the cloud!**

---

## 🚀 Complete Deployment Architecture

### Option 1: All Free Tier (RECOMMENDED)

#### 1. Frontend → Vercel (FREE)
```bash
cd frontend

# Build the app
yarn build

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Project name: bookblaze
# - Build command: yarn build
# - Output directory: build
```

**OR** Connect GitHub:
1. Push code to GitHub
2. Go to vercel.com
3. Import GitHub repository
4. Auto-deploys on every push!

**Result:** `https://bookblaze.vercel.app`

#### 2. Backend → Railway (FREE)
```bash
# Create Procfile in backend folder:
web: uvicorn server:app --host 0.0.0.0 --port $PORT

# Go to: railway.app
# Connect GitHub repository
# Select backend folder
# Add environment variables:
#   MONGO_URL=mongodb+srv://...
#   DB_NAME=bookblaze_db
# Deploy!
```

**Result:** `https://bookblaze-production.up.railway.app`

#### 3. Database → MongoDB Atlas (FREE)
Already set up above!

**Result:** `mongodb+srv://...`

---

## 💰 Pricing Comparison

### MongoDB Hosting Options:

| Provider | Free Tier | Paid Plans | Notes |
|----------|-----------|------------|-------|
| **MongoDB Atlas** | ✅ 512 MB | $9/month for 2GB | **BEST** - Official, reliable |
| **Railway** | ✅ $5 credit/month | $5/GB/month | Can host DB + Backend |
| **DigitalOcean** | ❌ No free tier | $6/month | VPS - Need to manage yourself |
| **AWS DocumentDB** | ❌ No free tier | $200+/month | Enterprise only |
| **Heroku** | ❌ Removed free tier | $5/month minimum | Not recommended |

### Backend Hosting Options:

| Provider | Free Tier | Deployment | Notes |
|----------|-----------|------------|-------|
| **Railway** | ✅ $5 credit/month | Very Easy | **BEST** for FastAPI |
| **Render** | ✅ 750 hours/month | Easy | Good alternative |
| **Fly.io** | ✅ 3 VMs free | Medium | Fast globally |
| **Heroku** | ❌ Removed free tier | Easy | No longer free |
| **DigitalOcean** | ❌ $6/month minimum | Hard | Need server management |

### Frontend Hosting Options:

| Provider | Free Tier | Deployment | Notes |
|----------|-----------|------------|-------|
| **Vercel** | ✅ Unlimited | Easiest | **BEST** - Auto CI/CD |
| **Netlify** | ✅ 100GB bandwidth | Very Easy | Great alternative |
| **GitHub Pages** | ✅ Unlimited | Easy | Static only |
| **Cloudflare Pages** | ✅ Unlimited | Easy | Fast globally |

---

## 📝 Step-by-Step Full Deployment

### Prerequisites:
- GitHub account
- Vercel account (sign up free)
- Railway account (sign up free)
- MongoDB Atlas account (created above)

### Step 1: Push Code to GitHub
```bash
cd /path/to/bookblaze
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/bookblaze.git
git push -u origin main
```

### Step 2: Deploy Backend to Railway

1. **Go to**: https://railway.app
2. **Click**: "New Project" → "Deploy from GitHub repo"
3. **Select**: Your bookblaze repository
4. **Settings**:
   - Root directory: `backend`
   - Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. **Environment Variables** (Add these):
   ```
   MONGO_URL=mongodb+srv://bookblaze_admin:password@cluster.mongodb.net/
   DB_NAME=bookblaze_db
   ```
6. **Deploy!**
7. **Copy URL**: e.g., `https://bookblaze-production.up.railway.app`

### Step 3: Deploy Frontend to Vercel

1. **Go to**: https://vercel.com
2. **Import Project** → GitHub
3. **Select**: bookblaze repository
4. **Framework**: Create React App
5. **Root directory**: `frontend`
6. **Environment Variables**:
   ```
   REACT_APP_BACKEND_URL=https://bookblaze-production.up.railway.app
   ```
7. **Deploy!**
8. **Your site**: `https://bookblaze.vercel.app`

### Step 4: Seed Database (One Time)
```bash
# On your local machine:
cd backend

# Update .env with Atlas connection string
MONGO_URL=mongodb+srv://bookblaze_admin:password@cluster.mongodb.net/

# Seed database
python seed_db.py
```

✅ **DONE! Your app is live!**

---

## 🔧 Environment Variables Summary

### Backend (.env) - Railway/Render
```bash
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=bookblaze_db
```

### Frontend (.env) - Vercel/Netlify
```bash
REACT_APP_BACKEND_URL=https://your-backend.railway.app
```

---

## ⚠️ Common Mistakes

### ❌ WRONG: Trying to host MongoDB on Vercel
```
Vercel → Cannot host databases!
```

### ✅ RIGHT: Use MongoDB Atlas
```
MongoDB Atlas → Database
Railway → Backend API
Vercel → Frontend
```

### ❌ WRONG: Hardcoding URLs
```javascript
// frontend/src/api/client.js
const API_URL = 'http://localhost:8001';  // ❌ Wrong!
```

### ✅ RIGHT: Use environment variables
```javascript
// frontend/src/api/client.js
const API_URL = process.env.REACT_APP_BACKEND_URL;  // ✅ Correct!
```

---

## 🎯 Recommended Setup (FREE)

```
┌──────────────────────────────────────────────────┐
│  Your BookBlaze App - All FREE!                 │
├──────────────────────────────────────────────────┤
│  1. Frontend:  Vercel                           │
│     URL: bookblaze.vercel.app                   │
│     Cost: FREE ✅                                │
│                                                  │
│  2. Backend:   Railway                          │
│     URL: bookblaze-api.railway.app              │
│     Cost: FREE ($5 credit/month) ✅             │
│                                                  │
│  3. Database:  MongoDB Atlas                    │
│     Size: 512 MB                                │
│     Cost: FREE ✅                                │
└──────────────────────────────────────────────────┘

Total Monthly Cost: $0 🎉
```

---

## 📞 Need Help?

### MongoDB Atlas Support
- Documentation: https://docs.atlas.mongodb.com/
- Community: https://community.mongodb.com/

### Railway Support
- Documentation: https://docs.railway.app/
- Discord: https://discord.gg/railway

### Vercel Support
- Documentation: https://vercel.com/docs
- Discord: https://vercel.com/discord

---

## 🚀 Quick Start Commands

### 1. Setup MongoDB Atlas (5 minutes)
- Go to mongodb.com/cloud/atlas
- Create free M0 cluster
- Get connection string
- Update backend/.env

### 2. Deploy Backend to Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
cd backend
railway init

# Deploy
railway up

# Add environment variables via dashboard
```

### 3. Deploy Frontend to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Add environment variable via dashboard
```

✅ **Your app is now live worldwide!**
