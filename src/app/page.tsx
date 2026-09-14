import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import WhatsAppButton from '@/components/WhatsAppButton';
import StatsBar from '@/components/StatsBar';
import HomePillars from '@/components/HomePillars';
import InitiativesGrid from '@/components/InitiativesGrid';
import NewsGrid from '@/components/NewsGrid';
import { Quote } from 'lucide-react';

export const metadata = {
  title: "Jhanvit Foundation | Exam Guidance & Study Space for Aspirants in Pune",
  description:
    "Jhanvit Foundation provides UPSC/MPSC consultation, structured study space access at ANUBHAVV Abhyasika, and student seat sponsorship in Sadashiv Peth, Pune.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <HeroSlider />

      <StatsBar />

      {/* Problem / Solution / Vision / Mission */}
      <HomePillars />

      {/* What we do */}
      <InitiativesGrid />

      {/* News & updates from the blog */}
      <NewsGrid />

      {/* Founder Mission Statement Quote */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Quote className="w-12 h-12 text-[#0090b0] opacity-40 mx-auto" />
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif italic text-slate-100 leading-relaxed">
            &ldquo;Every youth who fails not because of lack of merit, but because of lack of a
            structured environment — is a failure of the system. Jhanvit Foundation exists to fix
            that.&rdquo;
          </blockquote>
          <div className="pt-4 border-t border-slate-800 inline-block space-y-1">
            <div className="font-bold text-lg sm:text-xl text-white">Ganesh Zanjad</div>
            <div className="text-xs sm:text-sm text-slate-300">
              Founder &amp; Director, Jhanvit Foundation • Ex-Teach For India (Cohort 2023)
            </div>
          </div>
        </div>
      </section>

      {/* Who runs what: Jhanvit vs ANUBHAVV */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-cyan-50/80 border border-cyan-200/80 rounded-3xl p-6 sm:p-10 space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Who Runs What, and Where Your Money Goes
          </h3>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-4xl">
            The non-profit programmes and the study hall are run as separate entities, with separate
            accounts:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-white p-5 rounded-2xl border border-cyan-100 shadow-sm space-y-1.5">
              <div className="font-bold text-slate-900 text-base">Jhanvit Foundation</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Handles public donations, student guidance sessions and verified seat sponsorships.
                Donations go straight into Jhanvit&apos;s registered non-profit bank account.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-cyan-100 shadow-sm space-y-1.5">
              <div className="font-bold text-slate-900 text-base">ANUBHAVV Impact Labs</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Runs the physical 24x7 study hall in Sadashiv Peth, covering lease, power, internet,
                CCTV security and upkeep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="bg-[#007085] border-t-2 border-[#006072] text-white py-16 sm:py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-slate-100 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Visit the study hall in Sadashiv Peth, Pune, or book a consultation session.
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
