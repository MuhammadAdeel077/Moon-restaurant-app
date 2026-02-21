'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/locations', label: 'Locations' },
    { href: '/booking', label: 'Reservations' },
    { href: '/reviews', label: 'Reviews' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-xl shadow-xl border-b border-gray-100'
          : 'bg-white/95 backdrop-blur-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group relative">
            <div className="relative w-10 h-10 sm:w-14 sm:h-14 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--secondary))] rounded-full opacity-20 blur-md group-hover:opacity-30 transition-opacity" />
              <Image
                src="/assets/logos/logo.png"
                alt="Moon Restaurant"
                fill
                className="object-contain relative z-10 drop-shadow-lg"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-serif font-bold bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] bg-clip-text text-transparent leading-tight">
                Moon Restaurant
              </span>
              <span className="text-[0.6rem] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] text-[rgb(var(--muted-foreground))] uppercase font-medium hidden xs:block">
                Taste Meets Moonlight
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  className="group relative px-4 xl:px-5 py-2 text-[rgb(var(--foreground))] font-medium transition-all duration-300 rounded-lg hover:bg-[rgb(var(--muted))]"
                >
                  <span className="relative z-10 text-sm xl:text-base tracking-wide">
                    {link.label}
                  </span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] transition-all duration-300 group-hover:w-3/4 rounded-full" />
                </Link>
              </motion.div>
            ))}
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link
                href="/booking"
                className="ml-4 px-5 xl:px-6 py-2.5 xl:py-3 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm xl:text-base tracking-wide"
              >
                Book Now
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 sm:w-12 sm:h-12 flex flex-col items-center justify-center gap-1.5 focus:outline-none group"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 sm:w-7 h-0.5 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] transition-all duration-300 rounded-full ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 sm:w-7 h-0.5 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] transition-all duration-300 rounded-full ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 sm:w-7 h-0.5 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] transition-all duration-300 rounded-full ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-100 overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-4 sm:py-6 space-y-1 sm:space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-xl hover:bg-gradient-to-r hover:from-[rgb(var(--primary))]/5 hover:to-[rgb(var(--secondary))]/5 transition-all duration-300 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] group-hover:scale-150 transition-transform" />
                    <span className="text-base sm:text-lg font-medium text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--primary))] transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-2 sm:pt-4"
              >
                <Link
                  href="/booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center hover:scale-[1.02]"
                >
                  Book a Table Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
