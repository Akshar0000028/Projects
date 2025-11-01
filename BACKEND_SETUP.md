# 🚀 Backend Setup Guide for Seen Plays

## Quick Start

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Set Up Environment Variables

Create a file named `.env` in the `backend` folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/seenplays
JWT_SECRET=seen-plays-secret-key-2024-change-in-production
NODE_ENV=development
```

### Step 3: Install MongoDB

**Option A: MongoDB Community Edition (Local)**
1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB
3. Start MongoDB service (Windows: runs automatically after install)

**Option B: MongoDB Atlas (Cloud - Recommended for Beginners)**
1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create a free cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env` file

**Option C: Docker (If you have Docker)**
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### Step 4: Start the Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

### Step 5: Seed Initial Data (Optional)

To populate products from your frontend:

```bash
cd backend
node scripts/seed.js
```

## Testing the API

### Test Health Endpoint
Open browser: `http://localhost:5000/api/health`

### Test with Postman or Browser

**Get All Products:**
```
GET http://localhost:5000/api/products
```

**Register User:**
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login:**
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

## Project Structure

```
backend/
├── models/          # Database models (Product, User, Order)
├── routes/          # API routes
├── middleware/      # Auth middleware
├── scripts/         # Seed scripts
├── server.js        # Main server file
└── package.json     # Dependencies
```

## Next Steps

1. ✅ Backend is ready
2. ⏭️ Connect frontend to backend API
3. ⏭️ Update Login/Register pages to use API
4. ⏭️ Add payment integration
5. ⏭️ Deploy to cloud (Heroku, Railway, Render)

## Troubleshooting

**MongoDB Connection Error?**
- Make sure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For Atlas: Whitelist your IP address

**Port Already in Use?**
- Change `PORT` in `.env` file
- Or kill process using port 5000

**Module Not Found?**
- Run `npm install` again
- Check Node.js version (should be 14+)

