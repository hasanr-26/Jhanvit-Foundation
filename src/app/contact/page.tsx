'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
  MapPin,
  Phone,
  Mail,
  Share2,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    role: 'Aspirant',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#0f172a] via-[#00667e] to-[#0090b0] text-white pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#f5b82e] text-xs font-semibold">
            <MessageSquare className="w-4 h-4 text-[#f5b82e]" />
            We Are Here To Help
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Get in Touch</h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-base">
            Have questions about consultation, study hall seats, or sponsorship? Contact our team today.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#0090b0] bg-[#e6f7fa] px-3 py-1 rounded-full">
                Contact Information
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">Reach Out to Us</h2>
              <p className="text-slate-600 text-sm">
                Feel free to call, email, or visit our study center in Sadashiv Peth, Pune.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e6f7fa] text-[#0090b0] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <h4 className="font-bold text-slate-900 text-sm">Operational Center</h4>
                  <p className="text-slate-600 mt-1">2nd Floor, Above ICICI Bank, Gogate Chambers, Nagnath Par, Sadashiv Peth, Pune – 411030</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e6f7fa] text-[#0090b0] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <h4 className="font-bold text-slate-900 text-sm">Phone Numbers</h4>
                  <p className="text-slate-600 mt-1">
                    <a href="tel:7066422555" className="hover:underline text-[#0090b0] font-bold">7066422555</a> / <a href="tel:9637502333" className="hover:underline text-[#0090b0] font-bold">9637502333</a>
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e6f7fa] text-[#0090b0] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <h4 className="font-bold text-slate-900 text-sm">Email Address</h4>
                  <p className="text-slate-600 mt-1">
                    <a href="mailto:anubhavveducation@gmail.com" className="hover:underline text-[#0090b0] font-bold">anubhavveducation@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e6f7fa] text-[#0090b0] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <h4 className="font-bold text-slate-900 text-sm">Working Hours</h4>
                  <p className="text-slate-600 mt-1">Study Hall: Open 24x7. Office queries responded 9 AM – 8 PM daily.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-2xl font-bold text-slate-900">Send Us a Message</h3>
                    <p className="text-xs text-slate-500 mt-1">We respond to all inquiries within 24 hours.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amit Patil"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="amit@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">I am a *</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none bg-white"
                    >
                      <option value="Aspirant">Aspirant / Student</option>
                      <option value="Donor">Donor / Well-wisher</option>
                      <option value="Volunteer">Volunteer</option>
                      <option value="Partner">Education Partner</option>
                      <option value="Media">Media / Press</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your question or message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0090b0] hover:bg-[#00667e] text-white font-bold py-4 rounded-xl shadow-lg transition text-xs flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      'Sending Message...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#f5b82e]" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">Message Received!</h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                    Thank you {formData.fullName}! Your message has been sent to <strong>anubhavveducation@gmail.com</strong>. We will get back to you shortly at {formData.phone}.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-[#0090b0] text-white text-xs font-bold px-6 py-3 rounded-xl"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Google Maps */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white p-4 rounded-3xl shadow-md border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-3 px-2">Location Map — Sadashiv Peth, Pune</h3>
          <div className="w-full h-96 rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.251239563454!2d73.8471243!3d18.5175463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06e30000001%3A0x123456789abcdef!2sSadashiv%20Peth%2C%20Pune!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Jhanvit Foundation Office Map"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
