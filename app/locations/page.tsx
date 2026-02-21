'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/Icon';

const locations = [
  {
    id: 'naran',
    name: 'Naran Branch',
    address: 'Main Bazaar Road, Naran, Kaghan Valley',
    city: 'Naran',
    phone: '+92-XXX-XXXXXXX',
    email: 'naran@moonrestaurant.com',
    hours: 'Daily: 11:00 AM - 11:00 PM',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    description: 'Nestled in the heart of Naran, our flagship restaurant offers breathtaking mountain views and authentic Pakistani cuisine. Perfect for tourists exploring the Kaghan Valley.',
    features: ['Mountain View', 'Tourist Friendly', 'Family Dining', 'Parking Available'],
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.5!2d73.65!3d34.90!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDU0JzAwLjAiTiA3M8KwMzknMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890'
  },
  {
    id: 'besar',
    name: 'Besar Branch',
    address: 'Central Plaza, Besar City',
    city: 'Besar',
    phone: '+92-XXX-XXXXXXX',
    email: 'besar@moonrestaurant.com',
    hours: 'Daily: 11:00 AM - 11:00 PM',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
    description: 'Our modern Besar location combines elegant ambiance with traditional flavors. Ideal for special occasions, business dinners, and group celebrations.',
    features: ['Event Space', 'VIP Rooms', 'Business Friendly', 'Valet Parking'],
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.5!2d73.65!3d34.90!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDU0JzAwLjAiTiA3M8KwMzknMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890'
  },
];

export default function LocationsPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-[rgb(var(--primary))] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 text-center">
              Our Locations
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-center text-white/90 max-w-2xl mx-auto px-4">
              Visit us at our premium locations in Naran and Besar
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Locations */}
      {locations.map((location, index) => (
        <section
          key={location.id}
          id={location.id}
          className={`py-12 sm:py-16 lg:py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-[rgb(var(--muted))]'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Image */}
              <ScrollReveal direction={index % 2 === 0 ? 'left' : 'right'}>
                <div className="relative h-72 sm:h-80 lg:h-96 xl:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group">
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="location" size={24} className="text-white" />
                      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">Location</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold">{location.city}</h2>
                  </div>
                </div>
              </ScrollReveal>

              {/* Details */}
              <ScrollReveal direction={index % 2 === 0 ? 'right' : 'left'} delay={0.2}>
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[rgb(var(--primary))] mb-4 sm:mb-6">
                    {location.name}
                  </h2>
                  <p className="text-base sm:text-lg text-[rgb(var(--foreground))] leading-relaxed mb-6 sm:mb-8">
                    {location.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
                    {location.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 lg:px-4 py-2 bg-[rgb(var(--muted))] rounded-lg"
                      >
                        <Icon name="check" size={16} className="text-green-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-[rgb(var(--foreground))]">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Icon name="location" size={24} className="text-[rgb(var(--primary))] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-[rgb(var(--primary))] text-sm sm:text-base">Address</p>
                        <p className="text-[rgb(var(--foreground))] text-sm sm:text-base">{location.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Icon name="phone" size={24} className="text-[rgb(var(--primary))] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-[rgb(var(--primary))] text-sm sm:text-base">Phone</p>
                        <a href={`tel:${location.phone}`} className="text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] transition-colors text-sm sm:text-base">
                          {location.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Icon name="email" size={24} className="text-[rgb(var(--primary))] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-[rgb(var(--primary))] text-sm sm:text-base">Email</p>
                        <a href={`mailto:${location.email}`} className="text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] transition-colors text-sm sm:text-base break-all">
                          {location.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Icon name="clock" size={24} className="text-[rgb(var(--primary))] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-[rgb(var(--primary))] text-sm sm:text-base">Hours</p>
                        <p className="text-[rgb(var(--foreground))] text-sm sm:text-base">{location.hours}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                    <Link
                      href="/booking"
                      className="px-6 py-3 bg-[rgb(var(--primary))] hover:bg-[rgb(var(--secondary))] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      <Icon name="calendar" size={20} />
                      <span>Book a Table</span>
                    </Link>
                    <a
                      href={`https://www.google.com/maps/search/${encodeURIComponent(location.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] rounded-full font-semibold hover:bg-[rgb(var(--primary))] hover:text-white transition-all duration-300 flex items-center gap-2"
                    >
                      <Icon name="location" size={20} />
                      <span>Get Directions</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Map */}
            <ScrollReveal delay={0.4}>
              <div className="mt-8 sm:mt-10 lg:mt-12 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl h-64 sm:h-80 lg:h-96">
                <iframe
                  src={location.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${location.name} Map`}
                />
              </div>
            </ScrollReveal>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[rgb(var(--primary))] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">\n          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4 sm:mb-6">
              Can&apos;t Decide Which Location?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90 px-4">
              Both branches offer the same premium quality and exceptional service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="px-8 py-4 bg-white text-[rgb(var(--primary))] hover:bg-[rgb(var(--secondary))] hover:text-white rounded-full font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Icon name="calendar" size={24} />
                <span>Make a Reservation</span>
              </Link>
              <a
                href="tel:+92XXXXXXXXXX"
                className="px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-full font-bold text-lg border-2 border-white/50 hover:bg-white hover:text-[rgb(var(--primary))] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Icon name="phone" size={24} />
                <span>Call Us Now</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
