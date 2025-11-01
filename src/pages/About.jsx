import { motion } from 'framer-motion';

const About = () => {
  const stats = [
    { number: '2018', label: 'Founded' },
    { number: '50K+', label: 'Happy Customers' },
    { number: '500+', label: 'Products' },
    { number: '30+', label: 'Countries' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold font-montserrat mb-6">
            <span className="bg-gradient-to-r from-white via-gold to-gold-light bg-clip-text text-transparent">
              About Seen Plays
            </span>
          </h1>
          <p className="text-xl text-beige/80 max-w-3xl mx-auto">
            Where Street Meets Style
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold font-montserrat mb-6 text-gold">Our Story</h2>
            <div className="space-y-4 text-beige/80 leading-relaxed">
              <p>
                Seen Plays was born from a simple vision: to bridge the gap between street culture
                and luxury fashion. Founded in 2018, we set out to create clothing that speaks to
                the modern urbanite who values both comfort and style.
              </p>
              <p>
                What started as a small collection of premium streetwear has grown into a global
                brand, known for its commitment to quality, sustainability, and authentic design.
                Every piece in our collection is thoughtfully crafted, blending streetwear
                aesthetics with luxury materials.
              </p>
              <p>
                We believe fashion should be accessible yet exclusive, comfortable yet bold, and
                timeless yet contemporary. This philosophy drives everything we create.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-beige/5 border border-gold/10">
              <img
                src="https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80"
                alt="Brand Story"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-beige/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-montserrat mb-6 text-gold">Our Mission</h2>
            <p className="text-xl text-beige/80 max-w-3xl mx-auto">
              To empower individuals to express their unique style through premium streetwear that
              combines quality craftsmanship with contemporary design.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality First',
                description:
                  'We source the finest materials and employ skilled craftspeople to ensure every garment meets our high standards.',
                icon: '⭐',
              },
              {
                title: 'Sustainability',
                description:
                  "We're committed to ethical production and sustainable practices, reducing our environmental footprint.",
                icon: '🌱',
              },
              {
                title: 'Innovation',
                description:
                  'We constantly push boundaries, blending traditional techniques with modern design concepts.',
                icon: '💡',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-black/50 border border-gold/10"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gold">{value.title}</h3>
                <p className="text-beige/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl md:text-5xl font-bold text-gold mb-2">
                  {stat.number}
                </h3>
                <p className="text-beige/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold font-montserrat mb-6 text-gold">Meet the Founder</h2>
          <div className="max-w-2xl mx-auto">
            <div className="aspect-square w-64 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gold/30">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Founder"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">Alex Morgan</h3>
            <p className="text-beige/80 leading-relaxed">
              "Fashion is more than clothing—it's a form of self-expression. At Seen Plays, we
              create pieces that allow you to tell your story, celebrate your individuality, and
              feel confident in your own skin. Every design we release is a piece of our journey,
              and we're honored to share it with you."
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;

