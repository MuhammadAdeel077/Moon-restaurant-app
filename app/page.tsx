'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/Icon';

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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
              Moon Restaurant
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 sm:mb-10 lg:mb-12 font-light tracking-wide px-4"
            >
              We have Only Two Branches Naran And Besar
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            >
              <Link
                href="/booking"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-[rgb(var(--primary))] text-white rounded-full font-semibold text-base sm:text-lg shadow-2xl hover:shadow-[rgb(var(--primary))/50] hover:bg-[rgb(var(--secondary))] transition-all duration-300 hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Icon name="calendar" size={20} />
                <span>Make Booking</span>
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
            className="text-white"
          >
            <Icon name="down-arrow" size={40} />
          </motion.div>
        </motion.div>
      </section>

      {/* Branches Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-[rgb(var(--primary))] mb-3 sm:mb-4">
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
                    src="/assets/images/besar.jpeg"
                    alt="Naran Branch"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="location" size={20} />
                      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">Location</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold">Naran</h3>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-[rgb(var(--foreground))] leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    Experience authentic Pakistani cuisine in the heart of Naran&apos;s scenic beauty. 
                    Perfect for tourists and families seeking memorable dining experiences surrounded by mountains.
                  </p>
                  <div className="flex items-center gap-2 text-[rgb(var(--primary))] font-semibold text-sm sm:text-base">
                    <Icon name="location" size={18} />
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
                    src="/assets/images/naran.jpeg"
                    alt="Besar Branch"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="location" size={20} />
                      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">Location</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold">Besar</h3>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-[rgb(var(--foreground))] leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    Discover culinary excellence in Besar with our premium dining experience. 
                    Ideal for group celebrations, special occasions, and unforgettable moments.
                  </p>
                  <div className="flex items-center gap-2 text-[rgb(var(--primary))] font-semibold text-sm sm:text-base">
                    <Icon name="location" size={18} />
                    <span>Besar, Pakistan</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features Section - Alternating Layout */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white to-[rgb(var(--muted))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16 sm:mb-20 lg:mb-24">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block px-4 py-2 bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] rounded-full text-sm font-semibold mb-4"
              >
                Our Excellence
              </motion.span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--primary))]">
                Why Choose Moon Restaurant
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {[
              { 
                icon: 'party', 
                title: 'Perfect Gathering Place', 
                desc: 'Bringing families and friends together',
                longDesc: 'Moon Restaurant is the perfect destination for gatherings of all kinds. Whether it\'s a family reunion, friends catching up, or special celebrations, our welcoming atmosphere and spacious seating create the ideal setting for creating cherished memories together.',
                image: '/assets/images/1.jpeg'
              },
              { 
                icon: 'restaurant', 
                title: 'International Experience', 
                desc: 'Welcoming guests from around the world',
                longDesc: 'We take pride in serving international visitors who seek authentic Pakistani cuisine. Foreigners and tourists consistently choose Moon Restaurant for our exceptional hospitality, delicious meals, and the unique cultural dining experience that makes their journey through Pakistan truly memorable.',
                image: '/assets/images/2.jpeg'
              },

              { 
                icon: 'star', 
                title: 'Best Cuisine in Naran', 
                desc: 'Authentic flavors in the heart of the mountains',
                longDesc: 'Experience the finest Pakistani cuisine in the heart of Naran. Our expertly crafted dishes showcase traditional recipes passed down through generations, prepared with the freshest ingredients and authentic spices that capture the true essence of Pakistani gastronomy.',
                image: '/assets/images/3.jpeg'
              },
              { 
                icon: 'landscape', 
                title: 'Breathtaking Mountain Views', 
                desc: 'Dine surrounded by scenic natural beauty',
                longDesc: 'Enjoy your meal with stunning panoramic views of majestic mountains and pristine landscapes. Our strategic location offers an unparalleled dining experience where spectacular scenery complements exceptional cuisine, making every visit a feast for both the palate and the eyes.',
                image: '/assets/images/4.jpeg'
              },
              { 
                icon: 'award', 
                title: 'Luxury & Comfort', 
                desc: 'Premium amenities with convenient parking',
                longDesc: 'Experience luxury at its finest with our premium facilities designed for your ultimate comfort. From elegant interiors and plush seating to ample secure parking space, every detail ensures a hassle-free and sophisticated dining experience that reflects our commitment to excellence.',
                image: '/assets/images/5.jpeg'
              },
            ].map((feature, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 sm:gap-12 lg:gap-16`}
                  >
                    {/* Image Section */}
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? -80 : 80, scale: 0.9 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                      className="w-full lg:w-1/2"
                    >
                      <div className="relative group">
                        {/* Decorative elements */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          className={`absolute -z-10 w-full h-full bg-[rgb(var(--primary))]/20 rounded-2xl ${isEven ? '-right-4 -bottom-4 sm:-right-6 sm:-bottom-6' : '-left-4 -bottom-4 sm:-left-6 sm:-bottom-6'}`}
                        />
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                          className={`absolute -z-20 w-3/4 h-3/4 bg-[rgb(var(--secondary))]/10 rounded-2xl ${isEven ? '-right-8 -bottom-8 sm:-right-12 sm:-bottom-12' : '-left-8 -bottom-8 sm:-left-12 sm:-bottom-12'}`}
                        />
                        
                        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          >
                            <Image
                              src={feature.image}
                              alt={feature.title}
                              width={600}
                              height={450}
                              className="w-full h-[280px] sm:h-[350px] lg:h-[400px] object-cover"
                            />
                          </motion.div>
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Floating icon badge */}
                          <motion.div 
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 200 }}
                            className={`absolute ${isEven ? '-right-4 sm:-right-6' : '-left-4 sm:-left-6'} -bottom-4 sm:-bottom-6 bg-[rgb(var(--primary))] p-4 sm:p-5 rounded-xl shadow-xl`}
                          >
                            <Icon name={feature.icon} size={32} className="text-white" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Text Section */}
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? 80 : -80 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                      className={`w-full lg:w-1/2 ${isEven ? 'lg:pl-4' : 'lg:pr-4'}`}
                    >
                      <div className="space-y-4 sm:space-y-6">
                        <motion.h3 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[rgb(var(--primary))]"
                        >
                          {feature.title}
                        </motion.h3>
                        
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className="text-lg sm:text-xl text-[rgb(var(--secondary))] font-medium"
                        >
                          {feature.desc}
                        </motion.p>
                        
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                          className="text-base sm:text-lg text-[rgb(var(--muted-foreground))] leading-relaxed"
                        >
                          {feature.longDesc}
                        </motion.p>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                        >
                          <motion.button
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 text-[rgb(var(--primary))] font-semibold group"
                          >
                            <span>Learn More</span>
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <Icon name="arrow" size={20} className="group-hover:translate-x-1 transition-transform" />
                            </motion.span>
                          </motion.button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Decorative line between sections */}
                  {index < 5 && (
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="hidden lg:block w-1/2 h-px bg-gradient-to-r from-transparent via-[rgb(var(--border))] to-transparent mx-auto mt-12 sm:mt-16 lg:mt-20"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scrolling Reviews Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[rgb(var(--primary))] overflow-hidden">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              What Our Guests Say
            </h2>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Real experiences from our valued customers
            </p>
          </div>
        </ScrollReveal>
        
        {/* First Row - Left to Right */}
        <div className="relative mb-4 sm:mb-6">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex gap-4 sm:gap-6"
          >
            {[
              { name: 'Ahmad Hassan', avatar: 'AH', rating: 5, comment: 'Absolutely amazing experience! The food was authentic and delicious. The ambiance was perfect for our family gathering.' },
              { name: 'Fatima Khan', avatar: 'FK', rating: 5, comment: 'Best Pakistani restaurant in the area. Fresh ingredients, excellent service, and beautiful location.' },
              { name: 'Ali Raza', avatar: 'AR', rating: 5, comment: 'Perfect place for tourists! The staff was very welcoming and the food exceeded our expectations.' },
              { name: 'Sara Ahmed', avatar: 'SA', rating: 4, comment: 'Great food and atmosphere. We celebrated our anniversary here and it was memorable.' },
              { name: 'Usman Malik', avatar: 'UM', rating: 5, comment: 'Outstanding! From appetizers to desserts, everything was perfect. Authentic flavors!' },
              { name: 'Ayesha Tariq', avatar: 'AT', rating: 5, comment: 'Wonderful experience with family. The group booking was seamless and they accommodated all our requests.' },
              { name: 'Ahmad Hassan', avatar: 'AH', rating: 5, comment: 'Absolutely amazing experience! The food was authentic and delicious. The ambiance was perfect for our family gathering.' },
              { name: 'Fatima Khan', avatar: 'FK', rating: 5, comment: 'Best Pakistani restaurant in the area. Fresh ingredients, excellent service, and beautiful location.' },
              { name: 'Ali Raza', avatar: 'AR', rating: 5, comment: 'Perfect place for tourists! The staff was very welcoming and the food exceeded our expectations.' },
              { name: 'Sara Ahmed', avatar: 'SA', rating: 4, comment: 'Great food and atmosphere. We celebrated our anniversary here and it was memorable.' },
              { name: 'Usman Malik', avatar: 'UM', rating: 5, comment: 'Outstanding! From appetizers to desserts, everything was perfect. Authentic flavors!' },
              { name: 'Ayesha Tariq', avatar: 'AT', rating: 5, comment: 'Wonderful experience with family. The group booking was seamless and they accommodated all our requests.' },
            ].map((review, index) => (
              <motion.div
                key={`row1-${index}`}
                whileHover={{ scale: 1.02, y: -5 }}
                className="flex-shrink-0 w-[300px] sm:w-[350px] bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base">{review.name}</h4>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="star" size={12} className={i < review.rating ? 'text-yellow-300' : 'text-white/30'} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  &quot;{review.comment}&quot;
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Right to Left */}
        {/* <div className="relative">
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="flex gap-4 sm:gap-6"
          >
            {[
              { name: 'Ayesha Tariq', avatar: 'AT', rating: 5, comment: 'Wonderful experience with family. The group booking was seamless and they accommodated all our requests.' },
              { name: 'Usman Malik', avatar: 'UM', rating: 5, comment: 'Outstanding! From appetizers to desserts, everything was perfect. Authentic flavors!' },
              { name: 'Sara Ahmed', avatar: 'SA', rating: 4, comment: 'Great food and atmosphere. We celebrated our anniversary here and it was memorable.' },
              { name: 'Ali Raza', avatar: 'AR', rating: 5, comment: 'Perfect place for tourists! The staff was very welcoming and the food exceeded our expectations.' },
              { name: 'Fatima Khan', avatar: 'FK', rating: 5, comment: 'Best Pakistani restaurant in the area. Fresh ingredients, excellent service, and beautiful location.' },
              { name: 'Ahmad Hassan', avatar: 'AH', rating: 5, comment: 'Absolutely amazing experience! The food was authentic and delicious. The ambiance was perfect for our family gathering.' },
              { name: 'Ayesha Tariq', avatar: 'AT', rating: 5, comment: 'Wonderful experience with family. The group booking was seamless and they accommodated all our requests.' },
              { name: 'Usman Malik', avatar: 'UM', rating: 5, comment: 'Outstanding! From appetizers to desserts, everything was perfect. Authentic flavors!' },
              { name: 'Sara Ahmed', avatar: 'SA', rating: 4, comment: 'Great food and atmosphere. We celebrated our anniversary here and it was memorable.' },
              { name: 'Ali Raza', avatar: 'AR', rating: 5, comment: 'Perfect place for tourists! The staff was very welcoming and the food exceeded our expectations.' },
              { name: 'Fatima Khan', avatar: 'FK', rating: 5, comment: 'Best Pakistani restaurant in the area. Fresh ingredients, excellent service, and beautiful location.' },
              { name: 'Ahmad Hassan', avatar: 'AH', rating: 5, comment: 'Absolutely amazing experience! The food was authentic and delicious. The ambiance was perfect for our family gathering.' },
            ].map((review, index) => (
              <motion.div
                key={`row2-${index}`}
                whileHover={{ scale: 1.02, y: -5 }}
                className="flex-shrink-0 w-[300px] sm:w-[350px] bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base">{review.name}</h4>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="star" size={12} className={i < review.rating ? 'text-yellow-300' : 'text-white/30'} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  &quot;{review.comment}&quot;
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div> */}

        {/* View All Reviews Link */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-[rgb(var(--primary))] rounded-full font-semibold text-sm sm:text-base shadow-lg hover:bg-white/90 transition-all duration-300 hover:scale-105"
          >
            <span>View All Reviews</span>
            <Icon name="arrow" size={20} />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[rgb(var(--muted))] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-[rgb(var(--primary))] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[rgb(var(--secondary))] rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[rgb(var(--primary))]">
              Ready for an Unforgettable Experience?
            </h2>
            <p className="text-base sm:text-lg mb-8 sm:mb-10 text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
              Book your table today and enjoy exceptional dining
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-[rgb(var(--primary))] text-white rounded-full font-semibold text-base sm:text-lg shadow-lg hover:bg-[rgb(var(--secondary))] transition-all duration-300 hover:scale-105"
            >
              <Icon name="calendar" size={24} />
              <span>Reserve Your Table</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
