import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Link to={`/product/${product._id || product.id}`}>
        <div className="relative overflow-hidden rounded-lg bg-beige/5 border border-gold/10 hover:border-gold/30 transition-all duration-300">
          {/* Image */}
          <div className="relative overflow-hidden aspect-square bg-black/20">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80';
              }}
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.new && (
                <span className="bg-gold text-black px-3 py-1 text-xs font-bold rounded-full">
                  NEW
                </span>
              )}
              {product.trending && (
                <span className="bg-black text-gold px-3 py-1 text-xs font-bold rounded-full border border-gold">
                  TRENDING
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-white font-semibold mb-1 group-hover:text-gold transition-colors">
              {product.name}
            </h3>
            <p className="text-beige/60 text-sm mb-2">{product.category}</p>
            <p className="text-gold font-bold text-lg">₹{product.price.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;

