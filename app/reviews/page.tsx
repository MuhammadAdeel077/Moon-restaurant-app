'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const reviews = [
  {
    id: 1,
    name: 'Ahmad Hassan',
    rating: 5,
    date: 'January 15, 2026',
    branch: 'Naran',
    comment: 'Absolutely amazing experience! The food was authentic and delicious. The ambiance was perfect for our family gathering. Highly recommended!',
    avatar: '👨'
  },
  {
    id: 2,
    name: 'Fatima Khan',
    rating: 5,
    date: 'January 10, 2026',
    branch: 'Besar',
    comment: 'Best Pakistani restaurant in the area. Fresh ingredients, excellent service, and beautiful location. Will definitely come back!',
    avatar: '👩'
  },
  {
    id: 3,
    name: 'Ali Raza',
    rating: 5,
    date: 'January 5, 2026',
    branch: 'Naran',
    comment: 'Perfect place for tourists! The staff was very welcoming and the food exceeded our expectations. The mountain view is a bonus!',
    avatar: '🧑'
  },
  {
    id: 4,
    name: 'Sara Ahmed',
    rating: 4,
    date: 'December 28, 2025',
    branch: 'Besar',
    comment: 'Great food and atmosphere. We celebrated our anniversary here and it was memorable. The service could be a bit faster during peak hours.',
    avatar: '👩'
  },
  {
    id: 5,
    name: 'Usman Malik',
    rating: 5,
    date: 'December 20, 2025',
    branch: 'Naran',
    comment: 'Outstanding! From appetizers to desserts, everything was perfect. The chef really knows how to bring out authentic flavors.',
    avatar: '👨'
  },
  {
    id: 6,
    name: 'Ayesha Tariq',
    rating: 5,
    date: 'December 15, 2025',
    branch: 'Besar',
    comment: 'Wonderful experience with family. The group booking was seamless and they accommodated all our special requests. Thank you!',
    avatar: '👩'
  },
];

export default function ReviewsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: '',
    rating: 5,
    comment: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', branch: '', rating: 5, comment: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };

  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative py-20 bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--secondary))] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-center">
              Customer Reviews
            </h1>
            <p className="text-xl text-center text-white/90 max-w-2xl mx-auto mb-8">
              Hear what our valued guests have to say about their Moon Restaurant experience
            </p>
            
            {/* Overall Rating */}
            <div className="flex flex-col items-center gap-4">
              <div className="text-7xl font-bold">{averageRating}</div>
              <div className="flex gap-1 text-3xl">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.round(Number(averageRating)) ? 'text-yellow-300' : 'text-white/30'}>
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-lg text-white/80">Based on {reviews.length} reviews</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-[rgb(var(--muted))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-[rgb(var(--primary))] mb-12">
              What Our Guests Say
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <ScrollReveal key={review.id} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[rgb(var(--border))]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--secondary))] rounded-full flex items-center justify-center text-2xl">
                        {review.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-[rgb(var(--foreground))]">
                          {review.name}
                        </h3>
                        <p className="text-sm text-[rgb(var(--muted-foreground))]">
                          {review.date}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] rounded-full text-sm font-semibold">
                      {review.branch}
                    </span>
                  </div>

                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xl ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                        ⭐
                      </span>
                    ))}
                  </div>

                  <p className="text-[rgb(var(--foreground))] leading-relaxed">
                    &quot;{review.comment}&quot;
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Review Form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-[rgb(var(--primary))] mb-4">
              Share Your Experience
            </h2>
            <p className="text-center text-[rgb(var(--muted-foreground))] mb-8">
              We value your feedback and would love to hear about your visit
            </p>

            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-[rgb(var(--muted))] to-white rounded-3xl shadow-xl p-8 border border-[rgb(var(--border))]">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[rgb(var(--foreground))] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:outline-none transition-colors bg-white"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[rgb(var(--foreground))] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:outline-none transition-colors bg-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="branch" className="block text-sm font-semibold text-[rgb(var(--foreground))] mb-2">
                  Which Branch Did You Visit? *
                </label>
                <select
                  id="branch"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:outline-none transition-colors bg-white"
                >
                  <option value="">Select a branch</option>
                  <option value="Naran">Naran Branch</option>
                  <option value="Besar">Besar Branch</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[rgb(var(--foreground))] mb-2">
                  Your Rating *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="text-4xl transition-transform hover:scale-125 focus:outline-none"
                    >
                      <span className={star <= formData.rating ? 'text-yellow-500' : 'text-gray-300'}>
                        ⭐
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="comment" className="block text-sm font-semibold text-[rgb(var(--foreground))] mb-2">
                  Your Review *
                </label>
                <textarea
                  id="comment"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:outline-none transition-colors resize-none bg-white"
                  placeholder="Tell us about your experience..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : '⭐ Submit Review'}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-50 border-2 border-green-500 rounded-xl text-green-700 text-center font-semibold"
                >
                  ✓ Thank you for your review! It will be published soon.
                </motion.div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
