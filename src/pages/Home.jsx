import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsAPI.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to local data
        const { products: localProducts } = await import('../data/products');
        setProducts(localProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const newArrivals = products.filter(p => p.new).slice(0, 4);
  const trendingProducts = products.filter(p => p.trending).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with parallax effect */}
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <div className="w-full h-full bg-gradient-to-br from-black via-black to-gold/10" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold font-montserrat mb-6"
          >
            <span className="bg-gradient-to-r from-white via-gold-light to-gold bg-clip-text text-transparent">
              Seen Plays
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-beige/80 mb-8 font-light"
          >
            Where Street Meets Style
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gold text-black font-bold rounded-full text-lg hover:bg-gold-light transition-colors shadow-lg shadow-gold/50"
              >
                Shop Now
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-gold rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-gold rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 bg-beige/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
              <span className="bg-gradient-to-r from-white to-gold bg-clip-text text-transparent">
                New Arrivals
              </span>
            </h2>
            <p className="text-beige/70 text-lg">Discover our latest collection</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-4 text-center py-10">
                <p className="text-beige/70">Loading products...</p>
              </div>
            ) : (
              newArrivals.map((product, index) => (
                <ProductCard key={product._id || product.id} product={product} index={index} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
              <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                Featured Collection
              </span>
            </h2>
            <p className="text-beige/70 text-lg">Handpicked favorites</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product._id || product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 bg-beige/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
              <span className="bg-gradient-to-r from-white to-gold bg-clip-text text-transparent">
                Trending Now
              </span>
            </h2>
            <p className="text-beige/70 text-lg">What's hot right now</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <ProductCard key={product._id || product.id} product={product} index={index} />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-gold text-gold font-bold rounded-full text-lg hover:bg-gold hover:text-black transition-all"
              >
                View All Products
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

