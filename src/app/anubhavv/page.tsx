'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
  Wifi,
  ShieldCheck,
  Clock,
  Zap,
  BookOpen,
  Users,
  Award,
  MapPin,
  Check,
  CheckCircle,
  AlertCircle,
  Sparkles,
  QrCode,
  CreditCard,
  Building,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AnubhavvPage() {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    exam: 'UPSC',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Generate 120 seat layout. Make ~25 seats occupied (grey) for realism, rest green available.
  const occupiedSeats = [3, 4, 11, 12, 18, 25, 26, 31, 32, 40, 41, 55, 56, 62, 70, 71, 85, 90, 102, 110];

  const handleSeatClick = (seatNum: number) => {
    if (occupiedSeats.includes(seatNum)) return;
    setSelectedSeat(seatNum);
    setShowModal(true);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate Razorpay payment trigger & Supabase record
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccess(true);
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
      <section className="bg-gradient-to-r from-[#571000] via-[#801800] to-slate-900 text-white pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-300" />
            24x7 Dedicated Study Space in Pune
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">ANUBHAVV Abhyasika</h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-base">
            Structured study hall for serious aspirants preparing for UPSC, MPSC, Banking & Govt examinations in Sadashiv Peth, Pune.
          </p>
        </div>
      </section>

      {/* Operational Partnership & Entity Disclosure */}
      <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 text-slate-800">
          <div className="w-12 h-12 rounded-xl bg-[#801800] text-white flex items-center justify-center flex-shrink-0">
            <Building className="w-6 h-6" />
          </div>
          <div className="space-y-1 text-sm">
            <h4 className="font-bold text-[#801800]">Entity Operational Clarification</h4>
            <p className="text-slate-700">
              <strong>ANUBHAVV Abhyasika</strong> is operated by <strong>ANUBHAVV Impact Labs</strong> (for-profit entity). Jhanvit Foundation (Section 8 NGO) provides mentorship, guidance & sponsorship programs. Seat fees are credited directly to ANUBHAVV Impact Labs account.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get - Facilities Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">What You Get at ANUBHAVV</h2>
          <p className="text-slate-600">Designed to give you the perfect environment to study 12+ hours daily.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#801800] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Individual Dedicated Desk</h3>
            <p className="text-xs text-slate-600">Personal study seat with privacy partition so you can focus completely without distraction.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#801800] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">24 Hours, 7 Days Access</h3>
            <p className="text-xs text-slate-600">Open round the clock. Study early morning or late night according to your routine.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#801800] flex items-center justify-center">
              <Wifi className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">High-Speed WiFi</h3>
            <p className="text-xs text-slate-600">Uninterrupted high speed commercial internet for watching online lectures and downloading test series.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#801800] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">9 HD CCTV Cameras</h3>
            <p className="text-xs text-slate-600">Complete 24x7 security monitoring ensuring safety for women and personal belongings.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#801800] flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Charging Points at Every Desk</h3>
            <p className="text-xs text-slate-600">Dedicated power outlet at every single desk for laptops, tablets, and phones.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#801800] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Serious Aspirant Community</h3>
            <p className="text-xs text-slate-600">Surround yourself with dedicated peers preparing for UPSC & MPSC to maintain high discipline.</p>
          </div>
        </div>
      </section>

      {/* Pricing & Deposit Card */}
      <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl border border-slate-700 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#f5b82e]">Monthly Seat Fee</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white">₹2,000</span>
              <span className="text-slate-400 text-sm">/ month</span>
            </div>
            <p className="text-xs text-slate-300">+ ₹200 one-time refundable security deposit</p>
            <p className="text-[11px] text-amber-300">Payment credited to: ANUBHAVV Impact Labs account</p>
          </div>

          <button
            onClick={() => {
              setSelectedSeat(1);
              setShowModal(true);
            }}
            className="w-full md:w-auto bg-[#801800] hover:bg-red-700 text-white font-extrabold px-8 py-4 rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Book Your Seat Now
          </button>
        </div>
      </section>

      {/* Interactive Seat Layout Visualiser */}
      <section id="seat-map" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">Interactive Seat Layout</h3>
              <p className="text-xs text-slate-500 mt-1">Select an available green seat to book your slot immediately.</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block"></span> Green = Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-slate-300 inline-block"></span> Grey = Occupied
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-[#801800] inline-block"></span> Maroon = Selected
              </span>
            </div>
          </div>

          {/* Seat Grid */}
          <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2.5 max-h-[480px] overflow-y-auto p-2">
            {Array.from({ length: 120 }).map((_, index) => {
              const seatNum = index + 1;
              const isOccupied = occupiedSeats.includes(seatNum);
              const isSelected = selectedSeat === seatNum;

              return (
                <button
                  key={seatNum}
                  onClick={() => handleSeatClick(seatNum)}
                  disabled={isOccupied}
                  className={`h-11 rounded-lg text-xs font-bold flex flex-col items-center justify-center transition-all ${
                    isOccupied
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-200'
                      : isSelected
                      ? 'bg-[#801800] text-white shadow-md scale-105 ring-2 ring-amber-400'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm hover:scale-105'
                  }`}
                >
                  <span>S-{seatNum}</span>
                </button>
              );
            })}
          </div>

          {selectedSeat && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-900">
                Selected Seat: <span className="text-base font-extrabold">Seat S-{selectedSeat}</span>
              </span>
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#801800] hover:bg-red-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow transition"
              >
                Proceed to Book S-{selectedSeat}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Google Maps Location & Hours */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#801800]">Study Hall Address</span>
            <h3 className="text-3xl font-extrabold text-slate-900">Visit Us in Sadashiv Peth, Pune</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Conveniently located in the hub of UPSC and MPSC prep in Pune.
            </p>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-[#801800] flex-shrink-0" />
                <span className="text-slate-800 font-medium">2nd Floor, Above ICICI Bank, Gogate Chambers, Nagnath Par, Sadashiv Peth, Pune – 411030</span>
              </div>
              <div className="flex gap-2">
                <Clock className="w-4 h-4 text-[#801800] flex-shrink-0" />
                <span className="text-slate-800 font-medium">Timing: 24 Hours Open, 7 Days a Week</span>
              </div>
            </div>
          </div>

          <div className="w-full h-80 rounded-3xl overflow-hidden shadow-md border border-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.251239563454!2d73.8471243!3d18.5175463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06e30000001%3A0x123456789abcdef!2sSadashiv%20Peth%2C%20Pune!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ANUBHAVV Study Hall Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Seat Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-fadeIn space-y-6">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg font-bold"
            >
              ✕
            </button>

            {!bookingSuccess ? (
              <>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#801800] uppercase tracking-wider">ANUBHAVV Seat Booking</span>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Book Seat {selectedSeat ? `S-${selectedSeat}` : ''}
                  </h3>
                  <p className="text-xs text-slate-500">First month fee: ₹2,000 + ₹200 deposit = ₹2,200</p>
                </div>

                <form onSubmit={handleSubmitBooking} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#801800] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#801800] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#801800] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Exam Target *</label>
                    <select
                      value={formData.exam}
                      onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#801800] focus:outline-none bg-white"
                    >
                      <option value="UPSC">UPSC Civil Services</option>
                      <option value="MPSC">MPSC Rajyaseva / Combined</option>
                      <option value="Banking">Banking (IBPS / SBI)</option>
                      <option value="SSC">SSC CGL / CHSL</option>
                      <option value="Other">Other Competitive Exam</option>
                    </select>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Seat Monthly Fee:</span>
                      <span className="font-bold">₹2,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Refundable Deposit:</span>
                      <span className="font-bold">₹200</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-1 font-bold text-slate-900">
                      <span>Total Payable via Razorpay:</span>
                      <span className="text-[#801800]">₹2,200</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#801800] hover:bg-red-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition text-xs flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      'Processing Razorpay Payment...'
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" /> Pay ₹2,200 & Confirm Seat S-{selectedSeat}
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">Seat Booking Confirmed!</h3>
                <p className="text-xs text-slate-600">
                  Congratulations {formData.fullName}! Seat <strong>S-{selectedSeat}</strong> has been allocated to you. Digital Student ID and QR Code sent to WhatsApp <strong>{formData.phone}</strong>.
                </p>
                <div className="bg-slate-100 p-4 rounded-2xl inline-block">
                  <QrCode className="w-24 h-24 mx-auto text-slate-800" />
                  <span className="text-[10px] font-mono text-slate-500 block mt-1">ID: ANUBHAVV-2026-S{selectedSeat}</span>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setBookingSuccess(false);
                  }}
                  className="w-full bg-slate-900 text-white text-xs font-bold py-3 rounded-xl"
                >
                  Close & Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
