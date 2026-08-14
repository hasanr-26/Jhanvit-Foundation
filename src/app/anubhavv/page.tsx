'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
  Clock,
  MapPin,
  CheckCircle,
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
      <section className="bg-[#007085] text-white pt-28 sm:pt-32 pb-16 px-4 sm:px-6 relative overflow-hidden border-b-4 border-[#005e70]">
        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">ANUBHAVV Abhyasika</h1>
          <p className="max-w-2xl mx-auto text-cyan-50 text-base">
            Structured study hall for serious aspirants preparing for UPSC, MPSC, Banking & Govt examinations in Sadashiv Peth, Pune.
          </p>
        </div>
      </section>

      {/* Pricing & Deposit Card */}
      <section className="pt-12 sm:pt-16 pb-6 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-700 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Monthly Seat Fee</span>
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white">₹2,000</span>
              <span className="text-slate-400 text-base">/ month</span>
            </div>
            <p className="text-sm text-slate-300">+ ₹200 one-time refundable security deposit</p>
            <p className="text-xs text-amber-300 font-medium">Payment credited to: ANUBHAVV Impact Labs account</p>
          </div>

          <a
            href="#seat-map"
            className="w-full md:w-auto bg-[#007085] hover:bg-[#005c6d] text-white font-extrabold px-8 py-4 rounded-xl shadow-lg transition text-base flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-cyan-200" />
            Select Your Seat Below
          </a>
        </div>
      </section>

      {/* Interactive Seat Layout Visualiser */}
      <section id="seat-map" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Interactive Seat Layout</h3>
              <p className="text-sm text-slate-500 mt-1">Select an available green seat to book your slot immediately.</p>
            </div>
            <div className="flex items-center gap-4 text-xs sm:text-sm font-bold">
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block"></span> Green = Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-slate-300 inline-block"></span> Grey = Occupied
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-[#007085] inline-block"></span> Teal = Selected
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
                  className={`h-11 rounded-lg text-xs font-bold flex flex-col items-center justify-center transition-all ${isOccupied
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-200'
                      : isSelected
                        ? 'bg-[#007085] text-white shadow-md scale-105 ring-2 ring-cyan-300'
                        : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm hover:scale-105'
                    }`}
                >
                  <span>S-{seatNum}</span>
                </button>
              );
            })}
          </div>

          {selectedSeat && (
            <div className="bg-cyan-50 border border-cyan-200 p-4 rounded-xl flex justify-between items-center">
              <span className="text-sm font-bold text-[#007085]">
                Selected Seat: <span className="text-lg font-extrabold">Seat S-{selectedSeat}</span>
              </span>
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#007085] hover:bg-[#005c6d] text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow transition"
              >
                Proceed to Book S-{selectedSeat}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Operational Partnership & Entity Disclosure */}
      <section className="py-6 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="bg-cyan-50/80 border border-cyan-200/80 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 text-slate-800">
          <div className="w-12 h-12 rounded-xl bg-[#007085] text-white flex items-center justify-center flex-shrink-0">
            <Building className="w-6 h-6" />
          </div>
          <div className="space-y-1 text-sm">
            <h4 className="font-bold text-[#007085]">Entity Operational Clarification</h4>
            <p className="text-slate-700">
              <strong>ANUBHAVV Abhyasika</strong> is operated by <strong>ANUBHAVV Impact Labs</strong> (for-profit entity). Jhanvit Foundation (Section 8 NGO) provides mentorship, guidance & sponsorship programs. Seat fees are credited directly to ANUBHAVV Impact Labs account.
            </p>
          </div>
        </div>
      </section>

      {/* Direct Comparison Matrix: Typical Reading Room vs. ANUBHAVV */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-50 text-[#007085] text-xs sm:text-sm font-bold border border-cyan-200">
            SADASHIV PETH FACILITY BENCHMARK
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why ANUBHAVV is Different
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Most reading halls in Pune are congested and noisy. Here is a direct comparison of what you get at ANUBHAVV versus typical local study rooms.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-900 text-white p-4 sm:p-6 items-center gap-4 text-sm sm:text-base font-bold">
            <div className="md:col-span-4 text-slate-300 uppercase tracking-wider text-xs font-mono">
              Infrastructure Feature
            </div>
            <div className="md:col-span-4 text-slate-400 font-semibold hidden md:block">
              Typical Pune Reading Room
            </div>
            <div className="md:col-span-4 text-cyan-300 font-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              ANUBHAVV Abhyasika
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-slate-100 text-sm sm:text-base">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 gap-3 items-center hover:bg-slate-50/80 transition-colors">
              <div className="md:col-span-4 font-bold text-slate-900">
                Desk & Privacy
              </div>
              <div className="md:col-span-4 text-slate-500 text-sm flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                Shared crowded benches, narrow tables with side distractions.
              </div>
              <div className="md:col-span-4 font-semibold text-slate-900 flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Individual 2.5ft cubicle with <strong>3-sided wooden acoustic partitions</strong>.</span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 gap-3 items-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="md:col-span-4 font-bold text-slate-900">
                Internet Connectivity
              </div>
              <div className="md:col-span-4 text-slate-500 text-sm flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                Single consumer Wi-Fi, frequent buffering during mock tests.
              </div>
              <div className="md:col-span-4 font-semibold text-slate-900 flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>Dual-ISP 300 Mbps fiber</strong> with automatic instant failover.</span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 gap-3 items-center hover:bg-slate-50/80 transition-colors">
              <div className="md:col-span-4 font-bold text-slate-900">
                Charging & Power Matrix
              </div>
              <div className="md:col-span-4 text-slate-500 text-sm flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                Shared extension strips, trailing cables, power cut shutdowns.
              </div>
              <div className="md:col-span-4 font-semibold text-slate-900 flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>Dual surge-protected 5A sockets</strong> per desk + Inverter backup.</span>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 gap-3 items-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="md:col-span-4 font-bold text-slate-900">
                Operating Schedule
              </div>
              <div className="md:col-span-4 text-slate-500 text-sm flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                Rigid 10–12 hr shifts; locked outside standard hours.
              </div>
              <div className="md:col-span-4 font-semibold text-slate-900 flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>24x7 Round-the-Clock Biometric Access</strong> (Study anytime).</span>
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 gap-3 items-center hover:bg-slate-50/80 transition-colors">
              <div className="md:col-span-4 font-bold text-slate-900">
                Safety & Surveillance
              </div>
              <div className="md:col-span-4 text-slate-500 text-sm flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                Unattended entrance, blind spots, unsafe late-night storage.
              </div>
              <div className="md:col-span-4 font-semibold text-slate-900 flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>9 HD CCTV cameras</strong> + Keyless biometric security (Women-safe).</span>
              </div>
            </div>

            {/* Row 6 */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 gap-3 items-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="md:col-span-4 font-bold text-slate-900">
                Acoustic Discipline
              </div>
              <div className="md:col-span-4 text-slate-500 text-sm flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                Frequent phone calls, hallway chatter, loud disturbances.
              </div>
              <div className="md:col-span-4 font-semibold text-slate-900 flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>Strict &lt; 35 dB silent zone protocol</strong>; zero in-hall calls.</span>
              </div>
            </div>

            {/* Row 7 */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 gap-3 items-center hover:bg-slate-50/80 transition-colors">
              <div className="md:col-span-4 font-bold text-slate-900">
                Amenities & Hygiene
              </div>
              <div className="md:col-span-4 text-slate-500 text-sm flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                Unfiltered tap water, poorly maintained washrooms.
              </div>
              <div className="md:col-span-4 font-semibold text-slate-900 flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>Multi-stage RO purified water</strong> + Daily sanitized washrooms.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Facility Photo Gallery */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-50 text-[#007085] text-xs sm:text-sm font-bold border border-cyan-200">
            PUNE CAMPUS TOUR
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Inside ANUBHAVV Abhyasika
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Real photos from our 125-desk study facility at Sadashiv Peth, Pune. Designed specifically for long-hour UPSC & MPSC preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Photo 1: Wide Hall & Lighting */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200 flex flex-col group">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
              <Image
                src="/images/facility/facility_wide.png"
                alt="Individual study cubicles with built-in task lighting at ANUBHAVV Pune"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
              <h4 className="font-bold text-slate-900 text-base">
                Eye-Care Task Lighting
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Every cubicle features warm, non-glare LED illumination to prevent eye fatigue during 12+ hour study sessions.
              </p>
            </div>
          </div>

          {/* Photo 2: Dedicated Lockers */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200 flex flex-col group">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
              <Image
                src="/images/facility/facility_lockers.jpg"
                alt="Keyed overhead storage lockers for each student desk"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
              <h4 className="font-bold text-slate-900 text-base">
                Dedicated Keyed Lockers
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Secure overhead storage assigned to each desk. Keep your reference books and laptop safely overnight.
              </p>
            </div>
          </div>

          {/* Photo 3: Ergonomic Chairs & Partitions */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200 flex flex-col group">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
              <Image
                src="/images/facility/facility_cubicles.jpg"
                alt="Ergonomic mesh chairs with high neck rest and acoustic partitions"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
              <h4 className="font-bold text-slate-900 text-base">
                High-Back Ergonomic Chairs
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Full lumbar & headrest support engineered for marathon sitting, paired with private side partition walls.
              </p>
            </div>
          </div>

          {/* Photo 4: Spacious Aisles & AC */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200 flex flex-col group">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
              <Image
                src="/images/facility/facility_aisle.jpg"
                alt="Spacious air-conditioned study hall corridors"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
              <h4 className="font-bold text-slate-900 text-base">
                Spacious Climate Control
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Clean, uncrowded walkways with central air-conditioning, optimal ventilation, and spotless hygiene.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Location & Hours */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#007085]">Study Hall Address</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Visit Us in Sadashiv Peth, Pune</h3>
            <p className="text-slate-600 text-base leading-relaxed">
              Conveniently located in the hub of UPSC and MPSC prep in Pune.
            </p>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3.5 text-sm">
              <div className="flex gap-2.5">
                <MapPin className="w-5 h-5 text-[#007085] shrink-0" />
                <span className="text-slate-800 font-medium leading-snug">2nd Floor, Above ICICI Bank, Gogate Chambers, Nagnath Par, Sadashiv Peth, Pune – 411030</span>
              </div>
              <div className="flex gap-2.5">
                <Clock className="w-5 h-5 text-[#007085] shrink-0" />
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
                  <span className="text-xs font-bold text-[#007085] uppercase tracking-wider">ANUBHAVV Seat Booking</span>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Book Seat {selectedSeat ? `S-${selectedSeat}` : ''}
                  </h3>
                  <p className="text-sm text-slate-500">First month fee: ₹2,000 + ₹200 deposit = ₹2,200</p>
                </div>

                <form onSubmit={handleSubmitBooking} className="space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#007085] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#007085] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#007085] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">Exam Target *</label>
                    <select
                      value={formData.exam}
                      onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#007085] focus:outline-none bg-white"
                    >
                      <option value="UPSC">UPSC Civil Services</option>
                      <option value="MPSC">MPSC Rajyaseva / Combined</option>
                      <option value="Banking">Banking (IBPS / SBI)</option>
                      <option value="SSC">SSC CGL / CHSL</option>
                      <option value="Other">Other Competitive Exam</option>
                    </select>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-600 space-y-1.5">
                    <div className="flex justify-between">
                      <span>Seat Monthly Fee:</span>
                      <span className="font-bold text-slate-800">₹2,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Refundable Deposit:</span>
                      <span className="font-bold text-slate-800">₹200</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold text-slate-900 text-base">
                      <span>Total Payable:</span>
                      <span className="text-[#007085]">₹2,200</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#007085] hover:bg-[#005c6d] text-white font-bold py-3.5 rounded-xl shadow-lg transition text-sm sm:text-base flex items-center justify-center gap-2"
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
