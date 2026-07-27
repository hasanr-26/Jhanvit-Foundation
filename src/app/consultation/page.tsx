'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
  BookmarkCheck,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  ShieldCheck,
  FileText,
  Sparkles,
  CreditCard,
  MessageSquare,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    exam: 'UPSC',
    stage: 'Just starting',
    brief: '',
    preferredDate: '',
    preferredTime: '10:00 AM - 11:00 AM',
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
      <section className="bg-gradient-to-r from-[#00667e] via-[#0090b0] to-slate-900 text-white pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#f5b82e] text-xs font-semibold">
            <BookmarkCheck className="w-4 h-4 text-[#f5b82e]" />
            One-on-One Mentorship & Guidance
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Book a Consultation</h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-base">
            UPSC, MPSC & Competitive Exam Guidance with Experienced Mentors at Sadashiv Peth, Pune or Online.
          </p>
        </div>
      </section>

      {/* Main Content & Form Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Benefits & Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#0090b0] bg-[#e6f7fa] px-3 py-1 rounded-full">
                What You Get
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
                Tailored Guidance for Your Exam Journey
              </h2>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                In these dedicated one-on-one sessions, our experts review your background and build an actionable strategy.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#e6f7fa] text-[#0090b0] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Personalised Study Plan</h4>
                  <p className="text-xs text-slate-600">Based on your current preparation level, available daily hours, and target timeline.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#e6f7fa] text-[#0090b0] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Stage-Specific Strategy</h4>
                  <p className="text-xs text-slate-600">Tactics tailored for Prelims accuracy, Mains answer writing, or Interview guidance.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#e6f7fa] text-[#0090b0] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Honest Feedback</h4>
                  <p className="text-xs text-slate-600">Constructive breakdown of where you are going wrong and how to fix mistakes early.</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl text-xs text-slate-800 space-y-2">
              <h4 className="font-bold text-amber-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" /> Jhanvit Foundation Account
              </h4>
              <p className="text-slate-700">
                Consultation fees directly support Jhanvit Foundation&apos;s non-profit programs and student sponsorships. Payment receipt issued under Jhanvit Foundation.
              </p>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-2xl font-bold text-slate-900">Book Your Session</h3>
                    <p className="text-xs text-slate-500 mt-1">Fill out the details below to schedule your consultation slot.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Patil"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (WhatsApp) *</label>
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
                        placeholder="vikram@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Exam Target *</label>
                      <select
                        value={formData.exam}
                        onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none bg-white"
                      >
                        <option value="UPSC">UPSC Civil Services</option>
                        <option value="MPSC">MPSC Rajyaseva / Combined</option>
                        <option value="Banking">Banking (IBPS / SBI)</option>
                        <option value="SSC">SSC CGL / CHSL</option>
                        <option value="Other">Other Competitive Exam</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Current Stage *</label>
                      <select
                        value={formData.stage}
                        onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none bg-white"
                      >
                        <option value="Just starting">Just starting preparation</option>
                        <option value="Prelims prep">Prelims preparation</option>
                        <option value="Mains prep">Mains preparation</option>
                        <option value="Repeater">Repeater / Multiple attempts</option>
                        <option value="Interview stage">Interview stage</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Time Slot *</label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none bg-white"
                      >
                        <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                        <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                        <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
                        <option value="07:00 PM - 08:00 PM">07:00 PM - 08:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Brief about your prep stage & queries</label>
                    <textarea
                      rows={3}
                      placeholder="Share a short summary of your current prep status and key questions..."
                      value={formData.brief}
                      onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                    ></textarea>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700">Nominal Consultation Fee:</span>
                    <span className="text-lg font-extrabold text-[#0090b0]">₹199</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0090b0] hover:bg-[#00667e] text-white font-bold py-4 rounded-xl shadow-lg transition text-xs flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      'Processing Razorpay Payment...'
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 text-[#f5b82e]" /> Pay ₹199 & Confirm Booking
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">Consultation Session Booked!</h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                    Thank you {formData.fullName}! Your session is confirmed for <strong>{formData.preferredDate || 'Upcoming Date'}</strong> at <strong>{formData.preferredTime}</strong>. Confirmation link sent to WhatsApp <strong>{formData.phone}</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-[#0090b0] text-white text-xs font-bold px-6 py-3 rounded-xl"
                  >
                    Book Another Consultation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
