import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../services/api';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = ['All', 'Men', 'Women', 'Unisex', 'Accessories'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const filters = selectedCategory !== 'All' ? { category: selectedCategory } : {};
        const data = await productsAPI.getAll(filters);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to local data if API fails
        const { products: localProducts } = await import('../data/products');
        setProducts(localProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold font-montserrat mb-4">
            <span className="bg-gradient-to-r from-white via-gold to-gold-light bg-clip-text text-transparent">
              Shop
            </span>
          </h1>
          <p className="text-beige/70 text-lg">Discover our complete collection</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gold text-black'
                  : 'bg-beige/10 text-white hover:bg-beige/20 border border-gold/20'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-beige/70 text-xl">Loading products...</p>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product, index) => (
                <ProductCard key={product._id || product.id} product={product} index={index} />
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-beige/70 text-xl">No products found in this category.</p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;

