import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');

  // Calculate prices
  const subtotal = getCartTotal();
  const shipping = subtotal > 7500 ? 0 : 199; // Free shipping over ₹7,500
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (productId, size, newQuantity) => {
    updateQuantity(productId, size, newQuantity);
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!isAuthenticated) {
      alert('Please login to place an order');
      navigate('/login');
      return;
    }

    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.zipCode) {
      alert('Please fill in shipping address');
      return;
    }

    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          product: item._id || item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          size: item.size,
          quantity: item.quantity,
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice: subtotal,
        shippingPrice: shipping,
        taxPrice: tax,
        totalPrice: total,
      };

      await ordersAPI.create(orderData);
      alert('Order placed successfully! Order details will be sent to your email.');
      clearCart();
      navigate('/shop');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-4xl font-bold font-montserrat mb-4 text-gold">Your Cart is Empty</h1>
          <p className="text-beige/70 mb-8">Add some items to get started!</p>
          <Link
            to="/shop"
            className="inline-block px-8 py-4 bg-gold text-black font-bold rounded-full hover:bg-gold-light transition-colors"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-2">
            <span className="bg-gradient-to-r from-white via-gold to-gold-light bg-clip-text text-transparent">
              Shopping Cart
            </span>
          </h1>
          <p className="text-beige/70">{cartItems.length} item(s) in your cart</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.size}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-beige/5 rounded-lg p-6 border border-gold/10 flex flex-col sm:flex-row gap-4"
              >
                {/* Product Image */}
                <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-black/50 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-beige/60 text-sm mb-2">
                      {item.category} • Size: {item.size}
                    </p>
                    <p className="text-gold font-bold text-xl">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleQuantityChange(item._id || item.id, item.size, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gold/20 hover:bg-gold/30 text-gold flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="text-white font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item._id || item.id, item.size, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gold/20 hover:bg-gold/30 text-gold flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-white font-bold text-lg">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id || item.id, item.size)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                      title="Remove item"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Payment Overview / Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-beige/5 rounded-lg p-6 border border-gold/10 sticky top-32"
            >
              <h2 className="text-2xl font-bold font-montserrat mb-6 text-gold">
                Order Summary
              </h2>

              {/* Shipping Address Form */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-4">Shipping Address</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={shippingAddress.street}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, street: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-black/50 border border-gold/20 rounded-lg text-white placeholder-beige/40 focus:outline-none focus:border-gold transition-colors text-sm"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, city: e.target.value })
                      }
                      className="px-4 py-2 bg-black/50 border border-gold/20 rounded-lg text-white placeholder-beige/40 focus:outline-none focus:border-gold transition-colors text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Zip Code"
                      value={shippingAddress.zipCode}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, zipCode: e.target.value })
                      }
                      className="px-4 py-2 bg-black/50 border border-gold/20 rounded-lg text-white placeholder-beige/40 focus:outline-none focus:border-gold transition-colors text-sm"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="State"
                    value={shippingAddress.state}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, state: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-black/50 border border-gold/20 rounded-lg text-white placeholder-beige/40 focus:outline-none focus:border-gold transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-4">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer p-3 bg-black/50 rounded-lg border border-gold/20 hover:border-gold/40 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-gold focus:ring-gold"
                    />
                    <span className="text-white">Cash on Delivery</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer p-3 bg-black/50 rounded-lg border border-gold/20 hover:border-gold/40 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="Online"
                      checked={paymentMethod === 'Online'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-gold focus:ring-gold"
                    />
                    <span className="text-white">Online Payment</span>
                  </label>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pt-6 border-t border-gold/20">
                <div className="flex justify-between text-beige/80">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-beige/80">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-400">FREE</span>
                    ) : (
                      `₹${shipping.toLocaleString('en-IN')}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-beige/80">
                  <span>GST (18%)</span>
                  <span>₹{tax.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gold pt-3 border-t border-gold/20">
                  <span>Total</span>
                  <span>₹{total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                className="w-full py-4 bg-gold text-black font-bold rounded-lg text-lg hover:bg-gold-light transition-colors mb-4"
              >
                Place Order
              </motion.button>

              <Link
                to="/shop"
                className="block text-center text-beige/70 hover:text-gold transition-colors text-sm"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

