'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/Icon';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: '',
    date: '',
    time: '',
    guests: '',
    occasion: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          guests: parseInt(formData.guests),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          branch: '',
          date: '',
          time: '',
          guests: '',
          occasion: '',
          message: '',
        });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Something went wrong');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Failed to submit booking. Please try again.');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Header Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-[rgb(var(--primary))] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-center">
              Group Booking
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-center text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Reserve your perfect dining experience for groups and special occasions
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6">
              {[
                { icon: 'users', text: 'Group Dining' },
                { icon: 'party', text: 'Special Events' },
                { icon: 'restaurant', text: 'Custom Menus' },
                { icon: 'star', text: 'Premium Service' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base"
                >
                  <Icon name={feature.icon} size={20} className="text-white" />
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-[rgb(var(--primary))] mb-6 sm:mb-8 text-center">
                Reserve Your Table
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[rgb(var(--foreground))] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:outline-none transition-colors text-sm sm:text-base"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[rgb(var(--foreground))] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:outline-none transition-colors text-sm sm:text-base"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[rgb(var(--foreground))] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:outline-none transition-colors text-sm sm:text-base"
                    placeholder="+92-XXX-XXXXXXX"
                  />
                </div>

                {/* Branch */}
                <div>
                  <label htmlFor="branch" className="block text-sm font-semibold text-[rgb(var(--foreground))] mb-2">
                    Select Branch *
                  </label>
                  <select
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:outline-none transition-colors text-sm sm:text-base"
                  >
                    <option value="">Choose a branch</option>
                    <option value="naran">Naran Branch</option>
                    <option value="besar">Besar Branch</option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-[rgb(var(--foreground))] mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:outline-none transition-colors text-sm sm:text-base"
                  />
                </div>

                {/* Time */}
                <div>
                  <label htmlFor="time" className="block text-sm font-semibold text-[rgb(var(--foreground))] mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:outline-none transition-colors text-sm sm:text-base"
                  />
                </div>

                {/* Number of Guests */}
                <div>
                  <label htmlFor="guests" className="block text-sm font-semibold text-[rgb(var(--foreground))] mb-2">
                    Number of Guests *
                  </label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:outline-none transition-colors text-sm sm:text-base"
                    placeholder="5"
                  />
                </div>

                {/* Occasion */}
                <div>
                  <label htmlFor="occasion" className="block text-sm font-semibold text-[rgb(var(--foreground))] mb-2">
                    Occasion
                  </label>
                  <select
                    id="occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:outline-none transition-colors text-sm sm:text-base"
                  >
                    <option value="">Select occasion</option>
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="business">Business Dinner</option>
                    <option value="family">Family Gathering</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="mb-6 sm:mb-8">
                <label htmlFor="message" className="block text-sm font-semibold text-[rgb(var(--foreground))] mb-2">
                  Special Requests
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:outline-none transition-colors resize-none text-sm sm:text-base"
                  placeholder="Any dietary restrictions or special arrangements?"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[rgb(var(--primary))] hover:bg-[rgb(var(--secondary))] text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Submitting...' : (
                  <>
                    <Icon name="calendar" size={20} />
                    <span>Confirm Booking</span>
                  </>
                )}
              </motion.button>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 border-2 border-green-500 rounded-xl text-green-700 text-center font-semibold text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <Icon name="check" size={20} />
                  <span>Booking request submitted successfully! We&apos;ll contact you shortly.</span>
                </motion.div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 border-2 border-red-500 rounded-xl text-red-700 text-center font-semibold text-sm sm:text-base"
                >
                  {errorMessage || 'Something went wrong. Please try again.'}
                </motion.div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: 'phone',
                title: 'Contact Us',
                desc: 'Call us for immediate booking or inquiries',
                action: '+92-XXX-XXXXXXX'
              },
              {
                icon: 'clock',
                title: 'Operating Hours',
                desc: 'Open daily from 11:00 AM to 11:00 PM',
                action: 'View Schedule'
              },
              {
                icon: 'payment',
                title: 'Payment Options',
                desc: 'We accept all major credit cards and cash',
                action: 'Learn More'
              },
            ].map((info, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center p-5 sm:p-6 rounded-2xl border-2 border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] transition-all duration-300 hover:shadow-lg">
                  <div className="text-[rgb(var(--primary))] mb-3 sm:mb-4 flex justify-center">
                    <Icon name={info.icon} size={48} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[rgb(var(--primary))] mb-2">
                    {info.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[rgb(var(--muted-foreground))] mb-2 sm:mb-3">
                    {info.desc}
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-[rgb(var(--primary))]">
                    {info.action}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
