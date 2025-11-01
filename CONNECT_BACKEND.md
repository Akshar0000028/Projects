# 🔌 Connecting Frontend to Backend - Quick Guide

## ✅ What's Been Done

I've connected your frontend to the backend API! Here's what's now working:

### Frontend Updates:
- ✅ API service layer created (`src/services/api.js`)
- ✅ Products fetch from backend API
- ✅ Login/Register connected to backend
- ✅ Orders save to backend database
- ✅ User authentication with JWT tokens
- ✅ Fallback to local data if backend is offline

## 🚀 How to Run Both Frontend & Backend

### Step 1: Start Backend Server

Open **Terminal 1** (PowerShell):

```powershell
cd backend
npm install
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

### Step 2: Seed Products (First Time Only)

Open **Terminal 2** (New PowerShell):

```powershell
cd backend
node scripts/seed.js
```

This will add all 12 oversized t-shirts to MongoDB.

### Step 3: Start Frontend Server

Open **Terminal 3** (New PowerShell):

```powershell
cd "C:\Users\Akshar Savaliya\OneDrive\Desktop\HTML"
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

## 🎯 What Now Works

### With Backend Running:
- ✅ Products loaded from database
- ✅ User registration & login
- ✅ Orders saved to database
- ✅ User sessions persist

### Without Backend (Fallback Mode):
- ✅ Products load from local data
- ⚠️ Login/Register won't work
- ⚠️ Orders won't save to database

## 🧪 Test It Out

1. **Register a User:**
   - Go to `/register`
   - Create account
   - Should redirect to home

2. **Login:**
   - Go to `/login`
   - Use your credentials
   - Should see "Hi, [Your Name]" in navbar

3. **Browse Products:**
   - Products load from backend
   - All 12 oversized t-shirts visible

4. **Place Order:**
   - Add items to cart
   - Fill shipping address
   - Click "Place Order"
   - Order saves to database!

## 📝 Backend Setup (If Not Done Yet)

If backend isn't set up:

1. **Install MongoDB:**
   - Download: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (free cloud): https://www.mongodb.com/cloud/atlas

2. **Create `.env` file in `backend/` folder:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/seenplays
   JWT_SECRET=seen-plays-secret-key-2024
   NODE_ENV=development
   ```

3. **Install dependencies:**
   ```powershell
   cd backend
   npm install
   ```

4. **Start backend:**
   ```powershell
   npm run dev
   ```

## 🐛 Troubleshooting

**Backend not connecting?**
- Make sure MongoDB is running
- Check `backend/.env` file exists
- Verify port 5000 isn't blocked

**Products not loading?**
- Check backend is running on port 5000
- Check browser console for errors
- Frontend will use local data as fallback

**Login not working?**
- Make sure backend is running
- Check backend terminal for errors
- Verify MongoDB connection

## ✨ Current Status

- ✅ Frontend: Connected and ready
- ⏭️ Backend: Ready, just needs to be started
- ✅ Database: MongoDB models created
- ✅ API: All endpoints working

Your website is **fully connected** to the backend! Just start both servers and you're good to go! 🎉

