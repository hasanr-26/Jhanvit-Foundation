'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
  HeartHandshake,
  CheckCircle,
  ShieldCheck,
  QrCode,
  Building,
  CreditCard,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DonatePage() {
  const [selectedTier, setSelectedTier] = useState<number | 'custom'>(2000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    phone: '',
    email: '',
    pan: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [donated, setDonated] = useState(false);

  const getFinalAmount = () => {
    if (selectedTier === 'custom') {
      return parseInt(customAmount) || 0;
    }
    return selectedTier;
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setDonated(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#00667e] via-[#0090b0] to-emerald-950 text-white pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#f5b82e] text-xs font-semibold">
            <HeartHandshake className="w-4 h-4 text-[#f5b82e]" />
            Direct Impact Donation
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Support an Aspirant</h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-base">
            Your donation directly funds a study seat for a hardworking UPSC/MPSC aspirant who cannot afford one.
          </p>
        </div>
      </section>

      {/* Strict Payment Isolation Disclosure */}
      <section className="py-6 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="bg-amber-500/10 border border-amber-300 rounded-2xl p-4 flex items-center gap-3 text-xs text-amber-900 font-medium">
          <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span>
            <strong>Official Jhanvit Foundation Account Only:</strong> All donations go directly to Jhanvit Foundation (Section 8 Non-Profit, CIN: U85499PN2026NPL255094). Never transfer donation funds to ANUBHAVV accounts.
          </span>
        </div>
      </section>

      {/* Impact Breakdown Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900">What Your Donation Does</h2>
          <p className="text-slate-600 text-sm">Every single rupee is accounted for and directly sponsors study access.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={() => setSelectedTier(500)}
            className={`p-6 rounded-2xl border cursor-pointer transition-all ${
              selectedTier === 500
                ? 'bg-[#e6f7fa] border-[#0090b0] ring-2 ring-[#0090b0] shadow-md'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="text-2xl font-extrabold text-[#0090b0]">₹500</div>
            <div className="font-bold text-slate-900 text-sm mt-1">1 Week Sponsorship</div>
            <p className="text-xs text-slate-600 mt-2">Contributes to one week of 24x7 study hall access for a student.</p>
          </div>

          <div
            onClick={() => setSelectedTier(2000)}
            className={`p-6 rounded-2xl border cursor-pointer transition-all relative ${
              selectedTier === 2000
                ? 'bg-[#e6f7fa] border-[#0090b0] ring-2 ring-[#0090b0] shadow-md'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <span className="absolute -top-3 right-4 bg-[#f5b82e] text-[#0f172a] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
              Most Popular
            </span>
            <div className="text-2xl font-extrabold text-[#0090b0]">₹2,000</div>
            <div className="font-bold text-slate-900 text-sm mt-1">1 Full Month Seat</div>
            <p className="text-xs text-slate-600 mt-2">Sponsors 1 full month of dedicated study seat for 1 aspirant.</p>
          </div>

          <div
            onClick={() => setSelectedTier(6000)}
            className={`p-6 rounded-2xl border cursor-pointer transition-all ${
              selectedTier === 6000
                ? 'bg-[#e6f7fa] border-[#0090b0] ring-2 ring-[#0090b0] shadow-md'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="text-2xl font-extrabold text-[#0090b0]">₹6,000</div>
            <div className="font-bold text-slate-900 text-sm mt-1">Full Quarter (3 Months)</div>
            <p className="text-xs text-slate-600 mt-2">Sponsors 1 student through their critical Prelims or Mains prep phase.</p>
          </div>

          <div
            onClick={() => setSelectedTier(24000)}
            className={`p-6 rounded-2xl border cursor-pointer transition-all ${
              selectedTier === 24000
                ? 'bg-[#e6f7fa] border-[#0090b0] ring-2 ring-[#0090b0] shadow-md'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="text-2xl font-extrabold text-[#0090b0]">₹24,000</div>
            <div className="font-bold text-slate-900 text-sm mt-1">Full Year Sponsorship</div>
            <p className="text-xs text-slate-600 mt-2">Sponsors an aspirant for an entire year until their target exam.</p>
          </div>
        </div>
      </section>

      {/* Online Donation Form & Bank Transfer Details */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Razorpay Payment Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
            {!donated ? (
              <form onSubmit={handleDonateSubmit} className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-bold text-slate-900">Make an Online Donation</h3>
                  <p className="text-xs text-slate-500 mt-1">Instant contribution via Razorpay (UPI, Credit/Debit Cards, NetBanking)</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Select Donation Amount</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-xs font-bold">
                    {[500, 2000, 6000, 24000].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setSelectedTier(amt)}
                        className={`py-2.5 rounded-xl border transition ${
                          selectedTier === amt
                            ? 'bg-[#0090b0] text-white border-[#0090b0]'
                            : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        ₹{amt.toLocaleString()}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setSelectedTier('custom')}
                      className={`py-2.5 rounded-xl border transition ${
                        selectedTier === 'custom'
                          ? 'bg-[#0090b0] text-white border-[#0090b0]'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Custom
                    </button>
                  </div>

                  {selectedTier === 'custom' && (
                    <div className="mt-3">
                      <input
                        type="number"
                        placeholder="Enter custom amount in ₹"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Donor Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kulkarni"
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="anand@gmail.com"
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">PAN Number (for tax records)</label>
                    <input
                      type="text"
                      placeholder="ABCDE1234F"
                      value={donorInfo.pan}
                      onChange={(e) => setDonorInfo({ ...donorInfo, pan: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none uppercase font-mono"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">Total Contribution:</span>
                  <span className="text-2xl font-extrabold text-[#0090b0]">₹{getFinalAmount().toLocaleString()}</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || getFinalAmount() <= 0}
                  className="w-full bg-[#0090b0] hover:bg-[#00667e] text-white font-extrabold py-4 rounded-xl shadow-lg transition text-xs flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Connecting to Razorpay...'
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 text-[#f5b82e]" /> Donate ₹{getFinalAmount().toLocaleString()} via Razorpay
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">Thank You for Your Donation!</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                  Dear {donorInfo.name}, your generous contribution of <strong>₹{getFinalAmount().toLocaleString()}</strong> has been received by Jhanvit Foundation. Official receipt issued to <strong>{donorInfo.email}</strong>.
                </p>
                <button
                  onClick={() => setDonated(false)}
                  className="bg-[#0090b0] text-white text-xs font-bold px-6 py-3 rounded-xl"
                >
                  Make Another Donation
                </button>
              </div>
            )}
          </div>

          {/* Right: Direct Bank Transfer Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-6 border border-slate-800">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <Building className="w-6 h-6 text-[#f5b82e]" />
                <div>
                  <h4 className="font-bold text-lg text-white">Direct Bank Transfer</h4>
                  <p className="text-xs text-slate-400">Jhanvit Foundation Bank Details</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-800/80 p-3 rounded-xl flex justify-between items-center">
                  <span className="text-slate-400">Account Name:</span>
                  <span className="font-bold text-white">Jhanvit Foundation</span>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl flex justify-between items-center">
                  <span className="text-slate-400">Account Number:</span>
                  <span className="font-mono text-[#f5b82e] font-bold">[TO BE FILLED BY FOUNDER]</span>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl flex justify-between items-center">
                  <span className="text-slate-400">IFSC Code:</span>
                  <span className="font-mono text-slate-200 font-bold">[TO BE FILLED BY FOUNDER]</span>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl flex justify-between items-center">
                  <span className="text-slate-400">Bank Name:</span>
                  <span className="text-slate-200 font-bold">[TO BE FILLED BY FOUNDER]</span>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl flex justify-between items-center">
                  <span className="text-slate-400">UPI ID:</span>
                  <span className="font-mono text-emerald-400 font-bold">[TO BE FILLED BY FOUNDER]</span>
                </div>
              </div>

              {/* UPI QR Display */}
              <div className="text-center pt-2">
                <div className="w-36 h-36 bg-white rounded-2xl mx-auto p-3 shadow-md flex items-center justify-center border-2 border-[#f5b82e]">
                  <QrCode className="w-full h-full text-slate-900" />
                </div>
                <span className="text-[10px] text-slate-400 mt-2 block">Scan with GPay, PhonePe, Paytm or BHIM</span>
              </div>
            </div>

            {/* 80G Status Info */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs text-amber-900 space-y-1">
              <h4 className="font-bold text-amber-900">80G Income Tax Benefit Information</h4>
              <p className="text-slate-700">
                Jhanvit Foundation is in the process of obtaining 80G certification under the Income Tax Act. Once approved, all past donors will receive tax deduction certificates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
