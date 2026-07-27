'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
  HeartHandshake,
  CheckCircle2,
  FileCheck,
  Upload,
  User,
  Phone,
  Mail,
  Award,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SponsorshipPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    age: '',
    exam: 'UPSC',
    prepDuration: '',
    income: 'Below ₹1.5 Lakhs',
    reason: '',
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
      <section className="bg-[#007085] text-white pt-28 sm:pt-32 pb-16 px-4 sm:px-6 border-b-4 border-[#005e70]">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Apply for Seat Sponsorship</h1>
          <p className="max-w-2xl mx-auto text-cyan-50 text-base">
            No hardworking aspirant should be deprived of a quiet study space due to financial constraints.
          </p>
        </div>
      </section>

      {/* Overview & Eligibility Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
              What is a Sponsored Seat?
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
              Zero Cost Access to ANUBHAVV Study Hall
            </h2>
            <p className="text-slate-700 text-base leading-relaxed">
              Jhanvit Foundation collects donations from well-wishers and uses that money to sponsor study hall seats for aspirants who genuinely cannot afford the monthly fee.
            </p>
            <p className="text-slate-700 text-base leading-relaxed">
              If selected, <strong>Jhanvit Foundation pays your seat fee directly to ANUBHAVV Impact Labs</strong> on your behalf. You receive full 24x7 study hall access at zero cost to you.
            </p>
          </div>

          {/* Eligibility Box */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" /> Eligibility Criteria
            </h3>
            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Annual family income below <strong>₹3.0 Lakhs</strong> per annum.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Actively preparing for UPSC, MPSC, or equivalent competitive exam.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Has a clear preparation timeline & commitment to study regularly.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Has not received a sponsored seat from another NGO for the same purpose.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Free Application Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-2xl font-bold text-slate-900">Sponsorship Application Form</h3>
                <p className="text-xs text-slate-500 mt-1">This is a 100% free application. Our team reviews submissions within 7 working days.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pooja Deshmukh"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#007085] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Age *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 23"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#007085] focus:outline-none"
                  />
                </div>
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#007085] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="pooja@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#007085] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Exam Target *</label>
                  <select
                    value={formData.exam}
                    onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#007085] focus:outline-none bg-white"
                  >
                    <option value="UPSC">UPSC Civil Services</option>
                    <option value="MPSC">MPSC Rajyaseva / Combined</option>
                    <option value="Banking">Banking (IBPS / SBI)</option>
                    <option value="SSC">SSC CGL / CHSL</option>
                    <option value="Other">Other Competitive Exam</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Annual Family Income *</label>
                  <select
                    value={formData.income}
                    onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#007085] focus:outline-none bg-white"
                  >
                    <option value="Below ₹1.5 Lakhs">Below ₹1.5 Lakhs</option>
                    <option value="₹1.5 Lakhs - ₹3.0 Lakhs">₹1.5 Lakhs - ₹3.0 Lakhs</option>
                    <option value="Above ₹3.0 Lakhs">Above ₹3.0 Lakhs</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preparation Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 1 year of self study in Pune"
                  value={formData.prepDuration}
                  onChange={(e) => setFormData({ ...formData, prepDuration: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#007085] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Why do you need a sponsored seat? *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your family background, financial constraints, and commitment to studies..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#007085] focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Upload Income Proof (PDF/JPG, max 5MB)</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#f5b82e] hover:bg-amber-400 text-[#0f172a] font-extrabold py-4 rounded-xl shadow-lg transition text-xs flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Sponsorship Application (Free)'}
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Application Submitted!</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                Thank you {formData.fullName}! Your sponsorship application has been received. Our team will review your application within 7 working days and reach out to you at <strong>{formData.phone}</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-slate-900 text-white text-xs font-bold px-6 py-3 rounded-xl"
              >
                Submit Another Application
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
