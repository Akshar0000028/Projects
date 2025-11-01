import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold font-montserrat mb-4">
            <span className="bg-gradient-to-r from-white via-gold to-gold-light bg-clip-text text-transparent">
              Join Seen Plays
            </span>
          </h1>
          <p className="text-beige/70 text-lg">
            Create your account to start shopping
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-beige/5 rounded-lg p-8 border border-gold/10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-white font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-gold/20 rounded-lg text-white placeholder-beige/40 focus:outline-none focus:border-gold transition-colors"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-white font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-gold/20 rounded-lg text-white placeholder-beige/40 focus:outline-none focus:border-gold transition-colors"
                placeholder="your@email.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-gold/20 rounded-lg text-white placeholder-beige/40 focus:outline-none focus:border-gold transition-colors"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-white font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-gold/20 rounded-lg text-white placeholder-beige/40 focus:outline-none focus:border-gold transition-colors"
                placeholder="••••••••"
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Register Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                loading
                  ? 'bg-beige/20 text-beige/50 cursor-not-allowed'
                  : 'bg-gold text-black hover:bg-gold-light'
              }`}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-beige/70 text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-gold hover:text-gold-light font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6"
        >
          <Link
            to="/"
            className="text-beige/70 hover:text-gold text-sm transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;

