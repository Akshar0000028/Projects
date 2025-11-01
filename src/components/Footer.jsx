import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com' },
    { name: 'Pinterest', icon: '📌', url: 'https://pinterest.com' },
    { name: 'TikTok', icon: '🎵', url: 'https://tiktok.com' },
  ];

  const footerLinks = {
    Shop: ['New Arrivals', 'Men', 'Women', 'Accessories'],
    Company: ['About Us', 'Contact', 'Careers', 'Sustainability'],
    Support: ['Shipping', 'Returns', 'Size Guide', 'FAQs'],
  };

  return (
    <footer className="bg-black border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold font-montserrat bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent mb-4"
            >
              Seen Plays
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-beige/70 mb-6 max-w-md"
            >
              Where Street Meets Style. Premium streetwear for the modern urban lifestyle.
            </motion.p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-xl hover:bg-gold/30 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <div key={category}>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="text-white font-semibold mb-4"
              >
                {category}
              </motion.h3>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * (index + 1) + 0.05 * linkIndex }}
                  >
                    <a
                      href="#"
                      className="text-beige/70 hover:text-gold transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-beige/50 text-sm">
            © {new Date().getFullYear()} Seen Plays. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-beige/50 hover:text-gold text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-beige/50 hover:text-gold text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

