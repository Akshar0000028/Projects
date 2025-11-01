import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const products = [
  {
    name: "Classic Street Hoodie",
    price: 6499,
    category: "Men",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    description: "Premium quality hoodie with embroidered logo. Made from sustainable cotton blend for ultimate comfort.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true,
    trending: true,
    stock: 50,
  },
  {
    name: "Urban Classic Tee",
    price: 2499,
    category: "Unisex",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    description: "Minimalist design with premium fabric. Perfect for everyday wear.",
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    new: true,
    stock: 100,
  },
  {
    name: "Designer Cargo Pants",
    price: 9499,
    category: "Men",
    image: "https://images.unsplash.com/photo-1594938291221-94f313b0a7a0?w=800&q=80",
    description: "Functional and stylish cargo pants with multiple pockets. Streetwear essential.",
    sizes: ["M", "L", "XL", "XXL"],
    featured: false,
    trending: true,
    stock: 30,
  },
  {
    name: "Oversized Denim Jacket",
    price: 10999,
    category: "Women",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    description: "Vintage-inspired oversized denim jacket with unique distressing details.",
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    new: true,
    stock: 25,
  },
  {
    name: "Minimalist Sneakers",
    price: 13499,
    category: "Unisex",
    image: "https://images.unsplash.com/photo-1542291026-7eec32c3e7c3?w=800&q=80",
    description: "Clean and versatile sneakers perfect for any outfit. Premium materials.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    featured: false,
    trending: true,
    stock: 40,
  },
  {
    name: "Designer Cap",
    price: 2999,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    description: "Premium structured cap with embroidered logo. Adjustable fit.",
    sizes: ["One Size"],
    featured: false,
    new: true,
    stock: 75,
  },
  {
    name: "Street Style Dress",
    price: 7499,
    category: "Women",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    description: "Modern streetwear dress with unique cut. Perfect for day to night.",
    sizes: ["S", "M", "L"],
    featured: true,
    trending: false,
    stock: 35,
  },
  {
    name: "Premium Backpack",
    price: 8999,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    description: "Functional and stylish backpack with multiple compartments. Water-resistant.",
    sizes: ["One Size"],
    featured: false,
    new: false,
    stock: 45,
  },
  {
    name: "Classic Joggers",
    price: 5999,
    category: "Men",
    image: "https://images.unsplash.com/photo-1506629905607-887cef8761d5?w=800&q=80",
    description: "Comfortable joggers with tapered fit. Perfect for casual wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: false,
    trending: false,
    stock: 60,
  },
  {
    name: "Cropped Sweater",
    price: 5299,
    category: "Women",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    description: "Cozy cropped sweater with modern fit. Soft and warm.",
    sizes: ["S", "M", "L"],
    featured: true,
    new: true,
    stock: 40,
  },
  {
    name: "Leather Belt",
    price: 4499,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=800&q=80",
    description: "Genuine leather belt with minimal buckle design. Classic and timeless.",
    sizes: ["S", "M", "L", "XL"],
    featured: false,
    trending: false,
    stock: 50,
  },
  {
    name: "Graphic Print Tee",
    price: 3299,
    category: "Unisex",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    description: "Bold graphic print on premium cotton. Statement piece.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: false,
    new: false,
    stock: 80,
  },
];

const seedProducts = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/seenplays';
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🗑️  Deleted existing products');

    await Product.insertMany(products);
    console.log('✅ Products seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedProducts();

