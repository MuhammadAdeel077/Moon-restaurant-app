'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';

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
      { label: 'Phone: +92 311 2932080', href: 'tel:+923112932080' },
      { label: 'Phone: +92 331 2241322', href: 'tel:+923312241322' },
      { label: 'Email: info@moonrestaurant.com', href: 'mailto:info@moonrestaurant.com' },
    ],
  };

  return (
    <footer className="bg-[rgb(var(--primary))] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Moon Restaurant</h3>
            <p className="text-white/90 mb-4 text-sm sm:text-base leading-relaxed">
              Where Taste Meets the Moonlight. Experience authentic Pakistani cuisine in a premium dining atmosphere.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Icon name="facebook" size={20} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Icon name="instagram" size={20} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Icon name="twitter" size={20} className="text-white" />
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
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm sm:text-base text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
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
          className="border-t border-white/20 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-white/70 text-sm sm:text-base"
        >
          <p>© {currentYear} Moon Restaurant. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
