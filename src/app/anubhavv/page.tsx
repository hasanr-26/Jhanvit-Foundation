'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import InteractiveFloorPlan from '@/components/InteractiveFloorPlan';
import PillarTabs from '@/components/PillarTabs';
import ServicesGrid from '@/components/ServicesGrid';
import { usePageContent } from '@/lib/pageContent';
import { Clock, MapPin, Building } from 'lucide-react';

export default function AnubhavvPage() {
  const { anubhavv } = usePageContent();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-[#007085] text-white pt-28 sm:pt-32 pb-16 px-4 sm:px-6 border-b-4 border-[#005e70]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-lg shrink-0">
            <Image
              src="/images/anubhava_logo.png"
              alt="ANUBHAVV Abhyasika"
              width={220}
              height={220}
              priority
              className="h-24 sm:h-32 w-auto object-contain"
            />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">ANUBHAVV Abhyasika</h1>
            <p className="max-w-2xl text-cyan-50 text-base">
              Structured study hall for serious aspirants preparing for UPSC, MPSC, Banking &amp; Govt examinations in Sadashiv Peth, Pune.
            </p>
          </div>
        </div>
      </section>

      {/* Problem / Solution / Vision / Mission */}
      <PillarTabs pillars={anubhavv.pillars} />

      {/* Seat Selection & Floor Plan Section */}
      <section id="seat-map" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Pick Your Study Desk
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Choose a seat tier below for instant auto-selection, or click any seat directly on the 24x7 floor plan.
            </p>
          </div>

          <InteractiveFloorPlan />
        </div>
      </section>

      {/* Operational Partnership & Entity Disclosure */}
      <section className="py-6 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="bg-cyan-50/80 border border-cyan-200/80 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 text-slate-800">
          <div className="w-12 h-12 rounded-xl bg-[#0090b0] text-white flex items-center justify-center flex-shrink-0">
            <Building className="w-6 h-6" />
          </div>
          <div className="space-y-1 text-sm">
            <h4 className="font-bold text-[#0090b0]">Entity Operational Clarification</h4>
            <p className="text-slate-700">
              <strong>ANUBHAVV Abhyasika</strong> is operated by <strong>ANUBHAVV Impact Labs</strong> (for-profit entity). Jhanvit Foundation (Section 8 NGO) provides mentorship, guidance & sponsorship programs. Seat fees are credited directly to ANUBHAVV Impact Labs account.
            </p>
          </div>
        </div>
      </section>

      {/* What a seat includes */}
      <ServicesGrid />

      {/* Real Facility Photo Gallery */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
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

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
