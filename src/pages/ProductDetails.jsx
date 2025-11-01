import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { productsAPI } from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productsAPI.getById(id);
        setProduct(data);
        setSelectedSize(data.sizes?.[0] || '');
      } catch (error) {
        console.error('Error fetching product:', error);
        // Fallback to local data
        const { products: localProducts } = await import('../data/products');
        const localProduct = localProducts.find(p => p.id === parseInt(id) || p._id === id);
        if (localProduct) {
          setProduct(localProduct);
          setSelectedSize(localProduct.sizes?.[0] || '');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-beige/70 text-xl">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-beige/70 text-xl">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-beige/70 hover:text-gold transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-beige/5 border border-gold/10">
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80';
                }}
                loading="lazy"
              />
            </div>
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.new && (
                <span className="bg-gold text-black px-4 py-2 text-sm font-bold rounded-full">
                  NEW
                </span>
              )}
              {product.trending && (
                <span className="bg-black text-gold px-4 py-2 text-sm font-bold rounded-full border border-gold">
                  TRENDING
                </span>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="text-gold text-sm font-medium mb-2">{product.category}</p>
              <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-gold mb-6">₹{product.price.toLocaleString('en-IN')}</p>
            </div>

            <div>
              <p className="text-beige/80 leading-relaxed mb-8">{product.description}</p>
            </div>

            {/* Size Selector */}
            <div>
              <label className="block text-white font-semibold mb-4">Select Size</label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all border-2 ${
                      selectedSize === size
                        ? 'bg-gold text-black border-gold'
                        : 'bg-beige/10 text-white border-gold/20 hover:border-gold/40'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-gold text-black hover:bg-gold-light'
                }`}
              >
                {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
              </motion.button>
              {addedToCart && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Link
                    to="/cart"
                    className="block w-full py-4 border-2 border-gold text-gold font-bold rounded-lg text-lg hover:bg-gold hover:text-black transition-all text-center"
                  >
                    View Cart & Checkout
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Additional Info */}
            <div className="pt-6 border-t border-gold/20 space-y-4 text-sm text-beige/70">
              <div className="flex items-center space-x-2">
                <span>✓</span>
                <span>Free shipping on orders over ₹7,500</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✓</span>
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✓</span>
                <span>Authenticity guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;

