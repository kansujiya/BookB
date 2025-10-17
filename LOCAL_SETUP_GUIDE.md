# Local Development Setup Guide

## Prerequisites
1. Node.js (v16 or higher)
2. Python 3.8+
3. MongoDB (running locally or MongoDB Atlas account)

## Step 1: Backend Setup

### 1.1 Navigate to backend folder
```bash
cd backend
```

### 1.2 Create `.env` file in backend folder
Create a file named `.env` with the following content:

```env
MONGO_URL=mongodb://localhost:27017/
DB_NAME=bookblaze_db
```

**Note:** If using MongoDB Atlas (cloud), use your connection string:
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=bookblaze_db
```

### 1.3 Install Python dependencies
```bash
pip install -r requirements.txt
```

### 1.4 Seed the database (one-time setup)
```bash
python seed_db.py
```

### 1.5 Start the backend server
```bash
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

The backend should now be running at: `http://localhost:8001`

---

## Step 2: Frontend Setup

### 2.1 Open a NEW terminal and navigate to frontend folder
```bash
cd frontend
```

### 2.2 Create `.env` file in frontend folder
Create a file named `.env` with the following content:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

### 2.3 Install dependencies
```bash
yarn install
# OR
npm install
```

### 2.4 Start the development server (NOT production build)
```bash
yarn start
# OR
npm start
```

**DO NOT use `serve -s build` for development!**

The frontend should now open automatically at: `http://localhost:3000`

---

## Common Issues & Solutions

### Issue 1: Blank page with `serve -s build`
**Solution:** Use `yarn start` or `npm start` for development instead.

### Issue 2: MongoDB connection error
**Solution:** 
- Install MongoDB: https://www.mongodb.com/try/download/community
- Start MongoDB service:
  - Windows: Run MongoDB as a service
  - Mac: `brew services start mongodb-community`
  - Linux: `sudo systemctl start mongod`

### Issue 3: CORS errors
**Solution:** Make sure backend is running and `.env` file has correct `REACT_APP_BACKEND_URL`

### Issue 4: Port already in use
**Solution:** 
- Backend: Change port in uvicorn command: `--port 8002`
- Frontend: It will ask to use a different port automatically

---

## Quick Start Summary

**Terminal 1 (Backend):**
```bash
cd backend
pip install -r requirements.txt
python seed_db.py  # Only first time
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

**Terminal 2 (Frontend):**
```bash
cd frontend
yarn install  # Only first time
yarn start
```

---

## For Production Build (Only when deploying)

If you really need to build for production:

```bash
# Build the app
cd frontend
yarn build

# Serve the build (but update .env first)
serve -s build
```

**Important:** Make sure your `.env` file has the production backend URL before building!
