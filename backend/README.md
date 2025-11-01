# Seen Plays Backend API

Node.js/Express backend for the Seen Plays e-commerce website.

## Features

- ✅ User Authentication (Register/Login with JWT)
- ✅ Product Management (CRUD operations)
- ✅ Order Management
- ✅ User Profile Management
- ✅ MongoDB Database
- ✅ Protected Routes
- ✅ Admin Routes

## Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/seenplays
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### 3. Install MongoDB (Choose one option)

**Option A: MongoDB Community Edition**
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**Option B: MongoDB Atlas (Cloud - Free)**
- Sign up at: https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string and update `MONGODB_URI` in `.env`

**Option C: Docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### 4. Seed Initial Data (Optional)

Create a `seed.js` file to populate products:

```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import { products } from '../src/data/products.js'; // Import from frontend

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log('Data seeded successfully');
  process.exit();
});
```

### 5. Run the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Users
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get single order (Protected)

### Health Check
- `GET /api/health` - Check API status

## Frontend Integration

Update your React app's API calls to point to:
- Development: `http://localhost:5000/api`
- Production: Your backend URL

## Example API Usage

### Register User
```javascript
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  })
})
```

### Login
```javascript
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
})
```

### Get Products (with Auth Token)
```javascript
fetch('http://localhost:5000/api/products', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

## Next Steps

1. Connect frontend to backend API
2. Add payment integration (Razorpay/PayPal)
3. Add email notifications
4. Add file upload for product images
5. Add admin dashboard
6. Add product reviews/ratings

