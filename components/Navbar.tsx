'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              <Image
                src="/assets/logos/logo.png"
                alt="Moon Restaurant"
                fill
                className="object-contain relative z-10 drop-shadow-lg"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-bold text-[rgb(var(--primary))] leading-tight">
                Moon Restaurant
              </span>
              <span className="text-[0.6rem] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] text-[rgb(var(--muted-foreground))] uppercase font-medium hidden xs:block">
                Taste Meets Moonlight
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Admin Link - Subtle */}

            {/* Book Now Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Link
                href="/booking"
                className="px-5 sm:px-6 xl:px-8 py-2.5 sm:py-3 xl:py-3.5 bg-[rgb(var(--primary))] hover:bg-[rgb(var(--secondary))] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base xl:text-lg tracking-wide"
              >
                Book Now
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
