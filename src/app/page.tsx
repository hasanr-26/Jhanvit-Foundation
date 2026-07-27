import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
  BookOpen,
  Building2,
  HeartHandshake,
  Users,
  Award,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Quote,
  ShieldAlert,
  Sparkles,
  MapPin,
} from 'lucide-react';

export const metadata = {
  title: "Jhanvit Foundation | Section 8 NGO for Competitive Exam Aspirants in Pune",
  description:
    "Jhanvit Foundation provides UPSC/MPSC consultation, structured study space access at ANUBHAVV Abhyasika, and student seat sponsorship in Sadashiv Peth, Pune.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Section Carousel */}
      <HeroSlider />

      {/* Impact Numbers Counter Section */}
      <section className="relative z-20 -mt-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="flex items-center gap-4 pt-4 md:pt-0 justify-center text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#e6f7fa] text-[#0090b0] flex items-center justify-center flex-shrink-0">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#0f172a]">120+</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Aspirants Supported</div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 md:pt-0 justify-center text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#801800] flex items-center justify-center flex-shrink-0">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#0f172a]">125</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Study Seats Available</div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 md:pt-0 justify-center text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#f5b82e] flex items-center justify-center flex-shrink-0">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#0f172a]">2026</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Year Founded</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - 3 Key Pillars Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#0090b0] bg-[#e6f7fa] px-3 py-1 rounded-full">
            Our Core Initiatives
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Jhanvit Foundation Empowers Aspirants
          </h2>
          <p className="text-slate-600 text-base">
            We bridge the gap between hard work and success by providing guidance, environment, and financial backing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 — Consultation */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#e6f7fa] text-[#0090b0] flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0090b0] transition">
                One-on-One Consultation
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We offer expert guidance sessions for UPSC, MPSC, and other competitive exams. Book a session with experienced mentors at a nominal fee to chart your personal roadmap.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0090b0] hover:text-[#00667e] transition group-hover:translate-x-1"
              >
                Book a Guidance Session <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2 — Study Space */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#801800] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#801800] transition">
                ANUBHAVV Study Space
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                ANUBHAVV Abhyasika is a dedicated 24x7 study hall located in Sadashiv Peth, Pune. Features individual seats, high-speed WiFi, HD CCTV security, and a disciplined peer community.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6">
              <Link
                href="/anubhavv"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#801800] hover:text-[#571000] transition group-hover:translate-x-1"
              >
                Explore Study Hall & Seats <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3 — Sponsorship */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#f5b82e] flex items-center justify-center group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition">
                Student Seat Sponsorship
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We sponsor eligible, hardworking aspirants who cannot afford study hall fees through transparent donor contributions. No deserving student should be stopped by money.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6">
              <Link
                href="/sponsorship"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition group-hover:translate-x-1"
              >
                Apply or Sponsor a Seat <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Mission Statement Quote */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <Quote className="w-16 h-16 text-[#0090b0] opacity-40 mx-auto" />
          <blockquote className="text-2xl sm:text-3xl font-serif italic text-slate-100 leading-relaxed">
            &ldquo;Every youth who fails not because of lack of merit, but because of lack of a structured environment — is a failure of the system. Jhanvit Foundation exists to fix that.&rdquo;
          </blockquote>
          <div className="pt-4 border-t border-slate-800 inline-block">
            <div className="font-bold text-lg text-[#f5b82e]">Ganesh Zanjad</div>
            <div className="text-xs text-slate-400">Founder & Director, Jhanvit Foundation • Ex-Teach For India (Cohort 2023)</div>
          </div>
        </div>
      </section>

      {/* Operational Transparency Banner: Jhanvit vs ANUBHAVV */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-amber-500/10 border border-amber-200 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              Important Entity Distinction
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Understanding Jhanvit Foundation & ANUBHAVV Impact Labs
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              <strong>Jhanvit Foundation</strong> is a Section 8 Non-Profit organization managing donations, guidance, and student sponsorships. <strong>ANUBHAVV Impact Labs</strong> operates the physical study hall facilities. All donations go directly to Jhanvit&apos;s bank account, and seat fees go to ANUBHAVV&apos;s bank account.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/donate"
              className="bg-[#0090b0] hover:bg-[#00667e] text-white font-bold text-xs px-5 py-3 rounded-xl text-center shadow transition"
            >
              Donate to Jhanvit
            </Link>
            <Link
              href="/anubhavv"
              className="bg-[#801800] hover:bg-[#571000] text-white font-bold text-xs px-5 py-3 rounded-xl text-center shadow transition"
            >
              Book ANUBHAVV Seat
            </Link>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="bg-gradient-to-r from-[#0090b0] to-[#00667e] text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Ready to Take Control of Your Preparation?
          </h2>
          <p className="text-slate-100 text-base">
            Visit our study hall in Sadashiv Peth, Pune or book a consultation session today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/consultation"
              className="bg-[#f5b82e] hover:bg-amber-400 text-[#0f172a] font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg transition"
            >
              Book Guidance Session
            </Link>
            <Link
              href="/anubhavv"
              className="bg-white hover:bg-slate-100 text-[#0090b0] font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg transition"
            >
              Book ANUBHAVV Study Seat
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
