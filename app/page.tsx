'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop"
            alt="Restaurant Interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
              Moon Restaurant
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 sm:mb-10 lg:mb-12 font-light tracking-wide px-4"
            >
              Where Taste Meets the Moonlight ✨
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            >
              <Link
                href="/locations"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] text-white rounded-full font-semibold text-base sm:text-lg shadow-2xl hover:shadow-[rgb(var(--primary))/50] transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <span className="relative z-10">📍 Locate Us</span>
              </Link>
              <Link
                href="/booking"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold text-base sm:text-lg border-2 border-white/50 hover:bg-white hover:text-[rgb(var(--primary))] transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <span className="relative z-10">📅 Make Booking</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="text-white text-3xl sm:text-4xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* Branches Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-[rgb(var(--muted))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-center text-[rgb(var(--primary))] mb-3 sm:mb-4">
              Our Branches
            </h2>
            <p className="text-center text-[rgb(var(--muted-foreground))] text-base sm:text-lg mb-10 sm:mb-12 lg:mb-16 max-w-2xl mx-auto px-4">
              Experience authentic Pakistani cuisine at our premium locations
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Naran Branch */}
            <ScrollReveal direction="left" delay={0.2}>
              <div className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop"
                    alt="Naran Branch"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl sm:text-2xl">📍</span>
                      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">Location</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold">Naran</h3>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-[rgb(var(--foreground))] leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    Experience authentic Pakistani cuisine in the heart of Naran&apos;s scenic beauty. 
                    Perfect for tourists and families seeking memorable dining experiences surrounded by mountains.
                  </p>
                  <div className="flex items-center gap-2 text-[rgb(var(--primary))] font-semibold text-sm sm:text-base">
                    <span>📍</span>
                    <span>Naran, Pakistan</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Besar Branch */}
            <ScrollReveal direction="right" delay={0.4}>
              <div className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop"
                    alt="Besar Branch"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl sm:text-2xl">📍</span>
                      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">Location</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold">Besar</h3>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-[rgb(var(--foreground))] leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    Discover culinary excellence in Besar with our premium dining experience. 
                    Ideal for group celebrations, special occasions, and unforgettable moments.
                  </p>
                  <div className="flex items-center gap-2 text-[rgb(var(--primary))] font-semibold text-sm sm:text-base">
                    <span>📍</span>
                    <span>Besar, Pakistan</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-center text-[rgb(var(--primary))] mb-10 sm:mb-12 lg:mb-16">
              Why Choose Moon Restaurant
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: '🍽️', title: 'Authentic Cuisine', desc: 'Traditional Pakistani flavors prepared by expert chefs' },
              { icon: '👨‍👩‍👧‍👦', title: 'Family Friendly', desc: 'Spacious dining areas perfect for family gatherings' },
              { icon: '🎉', title: 'Group Bookings', desc: 'Special arrangements for celebrations and events' },
              { icon: '⭐', title: 'Premium Quality', desc: 'Fresh ingredients and highest quality standards' },
              { icon: '🏞️', title: 'Scenic Locations', desc: 'Beautiful ambiance in picturesque settings' },
              { icon: '💯', title: 'Excellent Service', desc: 'Attentive staff dedicated to your satisfaction' },
            ].map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[rgb(var(--muted))] to-white border border-[rgb(var(--border))] hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">{feature.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[rgb(var(--primary))] mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[rgb(var(--muted-foreground))]">
                    {feature.desc}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--secondary))] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4 sm:mb-6">
              Ready for an Unforgettable Experience?
            </h2>
            <p className="text-lg sm:text-xl mb-8 sm:mb-10 text-white/90 px-4">
              Book your table today and taste the difference
            </p>
            <Link
              href="/booking"
              className="inline-block px-8 sm:px-10 py-4 sm:py-5 bg-white text-[rgb(var(--primary))] rounded-full font-bold text-base sm:text-lg shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105"
            >
              📅 Reserve Your Table Now
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
