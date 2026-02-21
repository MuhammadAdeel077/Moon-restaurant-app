'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/Icon';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface Review {
  _id: string;
  name: string;
  rating: number;
  createdAt: string;
  branch: string;
  comment: string;
  avatar: string;
}

// Fallback reviews for when API is not available
const fallbackReviews: Review[] = [
  {
    _id: '1',
    name: 'Ahmad Hassan',
    rating: 5,
    createdAt: '2026-01-15',
    branch: 'Naran',
    comment: 'Absolutely amazing experience! The food was authentic and delicious. The ambiance was perfect for our family gathering. Highly recommended!',
    avatar: 'AH'
  },
  {
    _id: '2',
    name: 'Fatima Khan',
    rating: 5,
    createdAt: '2026-01-10',
    branch: 'Besar',
    comment: 'Best Pakistani restaurant in the area. Fresh ingredients, excellent service, and beautiful location. Will definitely come back!',
    avatar: 'FK'
  },
  {
    _id: '3',
    name: 'Ali Raza',
    rating: 5,
    createdAt: '2026-01-05',
    branch: 'Naran',
    comment: 'Perfect place for tourists! The staff was very welcoming and the food exceeded our expectations. The mountain view is a bonus!',
    avatar: 'AR'
  },
  {
    _id: '4',
    name: 'Sara Ahmed',
    rating: 4,
    createdAt: '2025-12-28',
    branch: 'Besar',
    comment: 'Great food and atmosphere. We celebrated our anniversary here and it was memorable. The service could be a bit faster during peak hours.',
    avatar: 'SA'
  },
  {
    _id: '5',
    name: 'Usman Malik',
    rating: 5,
    createdAt: '2025-12-20',
    branch: 'Naran',
    comment: 'Outstanding! From appetizers to desserts, everything was perfect. The chef really knows how to bring out authentic flavors.',
    avatar: 'UM'
  },
  {
    _id: '6',
    name: 'Ayesha Tariq',
    rating: 5,
    createdAt: '2025-12-15',
    branch: 'Besar',
    comment: 'Wonderful experience with family. The group booking was seamless and they accommodated all our special requests. Thank you!',
    avatar: 'AT'
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [averageRating, setAverageRating] = useState('4.8');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: '',
    rating: 5,
    comment: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/reviews`);
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setReviews(data.data);
          setAverageRating(data.averageRating.toString());
        }
      } catch {
        // Use fallback reviews if API fails
        console.log('Using fallback reviews');
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', branch: '', rating: 5, comment: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Something went wrong');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Failed to submit review. Please try again.');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-[rgb(var(--primary))] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-center">
              Customer Reviews
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-center text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Hear what our valued guests have to say about their Moon Restaurant experience
            </p>
            
            {/* Overall Rating */}
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold">{averageRating}</div>
              <div className="flex gap-1 text-2xl sm:text-3xl">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="star" size={32} className={i < Math.round(Number(averageRating)) ? 'text-yellow-300' : 'text-white/30'} />
                ))}
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-white/80">Based on {reviews.length} reviews</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[rgb(var(--primary))] mb-8 sm:mb-10 lg:mb-12">
              What Our Guests Say
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {reviews.map((review, index) => (
              <ScrollReveal key={review._id} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[rgb(var(--border))]"
                >
                  <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[rgb(var(--primary))] rounded-full flex items-center justify-center text-sm sm:text-base font-bold text-white flex-shrink-0">
                        {review.avatar}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-[rgb(var(--foreground))] text-sm sm:text-base truncate">
                          {review.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-[rgb(var(--muted-foreground))]">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                    </div>
                    <span className="px-2 sm:px-3 py-1 bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap flex-shrink-0">
                      {review.branch}
                    </span>
                  </div>

                  <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="star" size={20} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'} />
                    ))}
                  </div>

                  <p className="text-[rgb(var(--foreground))] leading-relaxed text-sm sm:text-base">
                    &quot;{review.comment}&quot;
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Review Form */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[rgb(var(--primary))] mb-3 sm:mb-4">
              Share Your Experience
            </h2>
            <p className="text-center text-[rgb(var(--muted-foreground))] mb-6 sm:mb-8 text-sm sm:text-base">
              We value your feedback and would love to hear about your visit
            </p>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-[rgb(var(--border))]">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
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
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:outline-none transition-colors bg-white text-sm sm:text-base"
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
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:outline-none transition-colors bg-white text-sm sm:text-base"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <label htmlFor="branch" className="block text-sm font-semibold text-[rgb(var(--foreground))] mb-2">
                  Which Branch Did You Visit? *
                </label>
                <select
                  id="branch"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:outline-none transition-colors bg-white text-sm sm:text-base"
                >
                  <option value="">Select a branch</option>
                  <option value="Naran">Naran Branch</option>
                  <option value="Besar">Besar Branch</option>
                </select>
              </div>

              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-semibold text-[rgb(var(--foreground))] mb-2">
                  Your Rating *
                </label>
                <div className="flex gap-1 sm:gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Icon name="star" size={32} className={star <= formData.rating ? 'text-yellow-500' : 'text-gray-300'} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <label htmlFor="comment" className="block text-sm font-semibold text-[rgb(var(--foreground))] mb-2">
                  Your Review *
                </label>
                <textarea
                  id="comment"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:outline-none transition-colors resize-none bg-white text-sm sm:text-base"
                  placeholder="Tell us about your experience..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[rgb(var(--primary))] hover:bg-[rgb(var(--secondary))] text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Submitting...' : (
                  <>
                    <Icon name="star" size={20} />
                    <span>Submit Review</span>
                  </>
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 sm:mt-4 p-3 sm:p-4 bg-green-50 border-2 border-green-500 rounded-xl text-green-700 text-center font-semibold text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <Icon name="check" size={20} />
                  <span>Thank you for your review! It will be published soon.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 border-2 border-red-500 rounded-xl text-red-700 text-center font-semibold text-sm sm:text-base"
                >
                  {errorMessage || 'Something went wrong. Please try again.'}
                </motion.div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Scrolling Reviews Marquee */}
      <section className="py-8 sm:py-12 bg-[rgb(var(--primary))] overflow-hidden">
        <div className="mb-6 sm:mb-8 text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            What People Are Saying
          </h3>
        </div>
        
        {/* First Row - Left to Right */}
        <div className="relative mb-4 sm:mb-6">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex gap-4 sm:gap-6"
          >
            {[...reviews, ...reviews].map((review, index) => (
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
        <div className="relative">
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="flex gap-4 sm:gap-6"
          >
            {[...reviews.slice().reverse(), ...reviews.slice().reverse()].map((review, index) => (
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
        </div>
      </section>
    </div>
  );
}
