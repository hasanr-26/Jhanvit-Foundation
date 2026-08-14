import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import WhatsAppButton from '@/components/WhatsAppButton';
import StatsBar from '@/components/StatsBar';
import {
  CheckCircle2,
  ArrowRight,
  Quote,
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
      <StatsBar />

      {/* What We Do - Asymmetric Editorial Bento Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-50 text-[#007085] text-xs sm:text-sm font-bold border border-cyan-200">
            OUR CORE INITIATIVES
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            How Jhanvit Foundation Supports Aspirants
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Targeted interventions addressing the critical requirements of competitive exam preparation in Pune.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Spotlight Card: ANUBHAVV Study Space (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col justify-between group">
            {/* Top Photo Header */}
            <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-slate-900">
              <Image
                src="/images/facility/facility_cubicles.jpg"
                alt="ANUBHAVV Study Hall Facility in Pune"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#007085] text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-lg shadow-md flex items-center gap-1">
                  PHYSICAL FACILITY • 24x7
                </span>
              </div>
            </div>

            {/* Content & Specs */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#007085]">
                  <MapPin className="w-4 h-4 text-[#007085]" />
                  Sadashiv Peth, Pune
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  ANUBHAVV Abhyasika & Study Space
                </h3>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                  A dedicated, distraction-free study environment tailored for serious UPSC, MPSC, and state competitive examination aspirants undergoing 10–14 hour daily preparation schedules.
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900">125</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">Dedicated Desks</div>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900">Dual ISP</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">Failover WiFi</div>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900">9 HD</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">CCTV Cameras</div>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900">24x7</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">Biometric Access</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <Link
                  href="/anubhavv"
                  className="inline-flex items-center justify-center gap-2 bg-[#007085] hover:bg-[#005c6d] text-white text-sm sm:text-base font-bold px-6 py-3.5 rounded-xl shadow transition"
                >
                  Explore Hall & Seats <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs sm:text-sm font-medium text-slate-500 text-center sm:text-right">
                  Sadashiv Peth Facility
                </span>
              </div>
            </div>
          </div>

          {/* Side Stacked Cards: Consultation & Sponsorship (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Top Side Card: 1-on-1 Consultation */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col justify-between group">
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                <Image
                  src="/images/slide2.jpg"
                  alt="Exam Consultation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#007085] text-white text-xs font-bold px-3 py-1 rounded-lg shadow">
                    MENTORSHIP
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#007085] transition">
                    1-on-1 Diagnostic Consultation
                  </h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    Exam-specific strategy, syllabus audit, booklist refinement, and personalized timetable planning for UPSC and MPSC aspirants at a nominal fee.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#007085] hover:text-[#005c6d] transition group-hover:translate-x-1"
                  >
                    Book Consultation <ArrowRight className="w-4 h-4" />
                  </Link>
                  <span className="text-xs sm:text-sm text-slate-500 font-semibold">UPSC / MPSC</span>
                </div>
              </div>
            </div>

            {/* Bottom Side Card: Student Sponsorship */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col justify-between group">
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                <Image
                  src="/images/slide4.jpg"
                  alt="Student Sponsorship Certificate"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-lg shadow">
                    FINANCIAL AID
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#007085] transition">
                    Student Seat Sponsorship
                  </h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    Transparent pass-through sponsorship funding study seats for hardworking aspirants from economically weaker backgrounds.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/sponsorship"
                    className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#007085] hover:text-[#005c6d] transition group-hover:translate-x-1"
                  >
                    Apply or Sponsor a Seat <ArrowRight className="w-4 h-4" />
                  </Link>
                  <span className="text-xs sm:text-sm text-slate-500 font-semibold">100% Direct Aid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Mission Statement Quote */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <Quote className="w-16 h-16 text-[#0090b0] opacity-40 mx-auto" />
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif italic text-slate-100 leading-relaxed">
            &ldquo;Every youth who fails not because of lack of merit, but because of lack of a structured environment — is a failure of the system. Jhanvit Foundation exists to fix that.&rdquo;
          </blockquote>
          <div className="pt-4 border-t border-slate-800 inline-block space-y-1">
            <div className="font-bold text-lg sm:text-xl text-white">Ganesh Zanjad</div>
            <div className="text-xs sm:text-sm text-slate-300">Founder & Director, Jhanvit Foundation • Ex-Teach For India (Cohort 2023)</div>
          </div>
        </div>
      </section>

      {/* Operational Transparency Banner: Jhanvit vs ANUBHAVV */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-cyan-50/80 border border-cyan-200/80 rounded-3xl p-6 sm:p-10 space-y-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#007085]">
            <CheckCircle2 className="w-4 h-4 text-[#007085]" />
            ORGANISATIONAL GOVERNANCE & FINANCIAL CLARITY
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Understanding Jhanvit Foundation & ANUBHAVV Impact Labs
          </h3>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-4xl">
            To ensure complete compliance and financial transparency, our non-profit programs and physical facility operations maintain strict separation:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-white p-5 rounded-2xl border border-cyan-100 shadow-sm space-y-1.5">
              <div className="font-bold text-slate-900 text-base">Jhanvit Foundation (Section 8 NGO)</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Manages public donations, student guidance sessions, and 100% verified student seat sponsorships. All donations go directly to Jhanvit&apos;s registered non-profit bank account.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-cyan-100 shadow-sm space-y-1.5">
              <div className="font-bold text-slate-900 text-base">ANUBHAVV Impact Labs (Study Facility)</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Operates and maintains the physical 24x7 study hall facility in Sadashiv Peth, covering lease, power, dual-ISP internet, CCTV security, and infrastructure upkeep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="bg-[#007085] border-t-2 border-[#006072] text-white py-16 sm:py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Ready to Take Control of Your Preparation?
          </h2>
          <p className="text-slate-100 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Visit our study hall in Sadashiv Peth, Pune or book a consultation session today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/consultation"
              className="bg-white hover:bg-slate-100 text-[#007085] font-extrabold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow transition"
            >
              Book Guidance Session
            </Link>
            <Link
              href="/anubhavv"
              className="bg-[#005c6d] hover:bg-[#004857] text-white font-extrabold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow transition border border-white/20"
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
