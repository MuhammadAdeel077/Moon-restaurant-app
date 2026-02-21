'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Quick Links': [
      { label: 'Home', href: '/' },
      { label: 'Locations', href: '/locations' },
      { label: 'Booking', href: '/booking' },
      { label: 'Reviews', href: '/reviews' },
    ],
    'Contact': [
      { label: 'Naran Branch', href: '/locations#naran' },
      { label: 'Besar Branch', href: '/locations#besar' },
      { label: 'Phone: +92-XXX-XXXXXXX', href: 'tel:+92XXXXXXXXXX' },
      { label: 'Email: info@moonrestaurant.com', href: 'mailto:info@moonrestaurant.com' },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--secondary))] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-serif font-bold mb-4">Moon Restaurant</h3>
            <p className="text-white/90 mb-4">
              Where Taste Meets the Moonlight. Experience authentic Pakistani cuisine in a premium dining atmosphere.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <span className="text-xl">📘</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <span className="text-xl">📷</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <span className="text-xl">🐦</span>
              </a>
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], sectionIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (sectionIndex + 1) * 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-white/20 mt-12 pt-8 text-center text-white/70"
        >
          <p>© {currentYear} Moon Restaurant. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
