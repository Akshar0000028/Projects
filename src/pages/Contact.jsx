import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    { icon: '📍', title: 'Address', info: '123 Fashion Street, New York, NY 10001' },
    { icon: '📧', title: 'Email', info: 'hello@seenplays.com' },
    { icon: '📞', title: 'Phone', info: '+1 (555) 123-4567' },
  ];

  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com', icon: '📷' },
    { name: 'Pinterest', url: 'https://pinterest.com', icon: '📌' },
    { name: 'TikTok', url: 'https://tiktok.com', icon: '🎵' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold font-montserrat mb-4">
            <span className="bg-gradient-to-r from-white via-gold to-gold-light bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>
          <p className="text-xl text-beige/80 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-beige/5 rounded-lg p-8 border border-gold/10"
          >
            <h2 className="text-2xl font-bold mb-6 text-gold">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-gold/20 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-gold/20 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 bg-black/50 border border-gold/20 rounded-lg text-white focus:outline-none focus:border-gold transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                  submitted
                    ? 'bg-green-500 text-white'
                    : 'bg-gold text-black hover:bg-gold-light'
                }`}
              >
                {submitted ? '✓ Message Sent!' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gold">Contact Information</h2>
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-beige/5 rounded-lg border border-gold/10"
                >
                  <div className="text-3xl">{info.icon}</div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                    <p className="text-beige/70">{info.info}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h2 className="text-2xl font-bold text-gold mb-6">Follow Us</h2>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center text-2xl hover:bg-gold/30 transition-colors border border-gold/20"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gold mb-4">Find Us</h2>
              <div className="aspect-video rounded-lg overflow-hidden bg-beige/5 border border-gold/10">
                <div className="w-full h-full flex items-center justify-center text-beige/50">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📍</div>
                    <p>Map Integration</p>
                    <p className="text-sm">123 Fashion Street, New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

