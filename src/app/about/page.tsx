'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
  MapPin,
  FileCheck2,
  ArrowRight,
} from 'lucide-react';
import { getSiteConfig, SiteConfig, DEFAULT_SITE_CONFIG } from '@/lib/siteConfig';

export default function AboutPage() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);

  useEffect(() => {
    setConfig(getSiteConfig());
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Page Header Banner */}
      <section className="bg-[#007085] text-white pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 border-b-4 border-[#005e70]">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-cyan-100 text-xs sm:text-sm font-semibold border border-white/20">
            SECTION 8 NON-PROFIT • PUNE, MAHARASHTRA
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Built by an Aspirant, for Aspirants
          </h1>
          <p className="max-w-3xl mx-auto text-cyan-50 text-base sm:text-lg leading-relaxed">
            Jhanvit Foundation exists to ensure that lack of a quiet study space, strategic guidance, or financial means never stops a hardworking student from clearing competitive exams.
          </p>
        </div>
      </section>

      {/* The Context & Mission Narrative */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-bold text-[#007085] uppercase tracking-wider">
                Our Ground Reality & Purpose
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Addressing the Core Bottlenecks in Pune&apos;s Exam Preparation Hub
              </h2>
            </div>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              Every year, tens of thousands of young aspirants move to Sadashiv Peth, Navi Peth, and surrounding areas in Pune to prepare for UPSC, MPSC, and state civil services.
            </p>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              The biggest challenge they face is rarely a lack of intelligence or discipline. It is the absence of an affordable, quiet, 24x7 study environment, personalized diagnostic direction, and financial security during multi-year preparation cycles.
            </p>

            <div className="p-5 rounded-2xl bg-cyan-50/80 border border-cyan-200/80 space-y-2">
              <div className="font-bold text-[#007085] text-base sm:text-lg">
                Jhanvit Foundation&apos;s Dual Approach:
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                We combine physical study hall infrastructure (<strong>ANUBHAVV Abhyasika</strong> in Sadashiv Peth) with <strong>1-on-1 exam mentorship</strong> and <strong>100% verified student seat sponsorships</strong> for candidates from lower-income backgrounds.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-900">
              <Image
                src="/images/facility/facility_wide.png"
                alt="ANUBHAVV Study Hall in Sadashiv Peth, Pune"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs text-cyan-200 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Sadashiv Peth, Pune
                </span>
                <p className="text-sm font-bold text-white mt-0.5">
                  125 Desks • 24x7 Silent Study Environment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story & Background */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full border-t border-slate-200">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden shadow-md bg-slate-900">
            <Image
              src="/images/ganesh_zanjad.png"
              alt="Ganesh Zanjad, Founder and Director of Jhanvit Foundation"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="font-bold text-lg text-white">Ganesh Zanjad</div>
              <div className="text-xs text-cyan-200">Founder & Director • Ex-Teach For India</div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-[#007085] text-xs font-bold border border-cyan-200">
              FOUNDER JOURNEY
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              Understanding the Preparation Journey from Within
            </h3>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Ganesh prepared for UPSC Civil Services for 4 years at <strong>Jnana Prabodhini, Pune</strong>. Having lived through the isolation, uncertainty, and daily discipline required for civil service examinations, he recognized that hundreds of talented youth drop out simply due to lack of a structured space and proper mentorship.
            </p>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              After serving as a Fellow and Program Manager with <strong>Teach For India (Cohort 2023)</strong>—managing educational initiatives across 500+ government schools in Maharashtra—he founded Jhanvit Foundation to institutionalize affordable, high-quality preparation infrastructure for grassroots youth.
            </p>

            <div className="pt-3">
              <blockquote className="border-l-4 border-[#007085] pl-4 italic text-slate-800 text-sm sm:text-base">
                &ldquo;If a candidate works hard for 12 hours a day, the system should not fail them because of a lack of a quiet desk or genuine guidance.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Mission & Direct Commitments */}
      <section className="bg-slate-100/80 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our 3 Operational Commitments
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Measurable actions we execute daily to support aspirants on the ground.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 sm:p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="inline-block bg-[#007085] text-white text-xs font-bold px-3 py-1 rounded-md">
                  INFRASTRUCTURE
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Disciplined 24x7 Study Space
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Operating ANUBHAVV Abhyasika with 125 individual desks, surge-protected power ports, dual-ISP 300 Mbps failover fiber, and sound-damped study rooms.
                </p>
              </div>
              <Link
                href="/anubhavv"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#007085] hover:text-[#005c6d] pt-4 border-t border-slate-100"
              >
                View Study Space <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white p-7 sm:p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="inline-block bg-[#007085] text-white text-xs font-bold px-3 py-1 rounded-md">
                  MENTORSHIP
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Honest Diagnostic Guidance
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Providing individualized syllabus audits and attempt history reviews with zero commercial upselling, test-series promotion, or coaching tie-ins.
                </p>
              </div>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#007085] hover:text-[#005c6d] pt-4 border-t border-slate-100"
              >
                Book Guidance <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white p-7 sm:p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="inline-block bg-[#007085] text-white text-xs font-bold px-3 py-1 rounded-md">
                  DIRECT AID
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  100% Pass-Through Sponsorship
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Connecting donors directly to verified, hardworking students who cannot afford library fees. 100% of donor funding goes directly toward seat grants.
                </p>
              </div>
              <Link
                href="/sponsorship"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#007085] hover:text-[#005c6d] pt-4 border-t border-slate-100"
              >
                Apply or Sponsor <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles (Clean 4-column layout) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">Our Guiding Principles</h2>
          <p className="text-slate-600 text-base sm:text-lg">The core operating rules that govern every initiative.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-lg sm:text-xl">Equal Access</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Quality study environments and expert guidance should not be a privilege limited to those who can afford ₹3,000+/mo private commercial cubicles.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-lg sm:text-xl">100% Aid Transparency</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Every donor contribution is mapped directly to a verified student beneficiary, with full attendance and progress milestone tracking.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-lg sm:text-xl">Zero Commercial Bias</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Guidance consultations are strictly diagnostic. We do not sell proprietary study materials, test series, or third-party coaching courses.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-lg sm:text-xl">Dignity & Peer Culture</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Every student is supported with respect, equal facilities, and a peer community that fosters long-term consistency.
            </p>
          </div>
        </div>
      </section>

      {/* Legal & Registration Credentials */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-cyan-300 text-xs font-bold">
            <FileCheck2 className="w-3.5 h-3.5" /> STATUTORY COMPLIANCE
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">Legal Credentials & Details</h2>
          <p className="text-slate-600 text-base">Full regulatory compliance details registered under the Ministry of Corporate Affairs, Govt. of India.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100 text-sm sm:text-base">
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50">
              <span className="font-bold text-slate-700">Organisation Name</span>
              <span className="sm:col-span-2 font-semibold text-[#007085]">{config.orgName}</span>
            </div>
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-bold text-slate-700">Legal Entity Type</span>
              <span className="sm:col-span-2 text-slate-800">{config.legalEntityType}</span>
            </div>
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50">
              <span className="font-bold text-slate-700">Corporate Identification Number (CIN)</span>
              <span className="sm:col-span-2 font-mono font-bold text-cyan-300 bg-slate-900 px-3 py-1 rounded-lg inline-block w-fit text-sm">
                {config.cin}
              </span>
            </div>
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-bold text-slate-700">PAN Number</span>
              <span className="sm:col-span-2 font-mono font-bold text-slate-800">{config.pan}</span>
            </div>
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50">
              <span className="font-bold text-slate-700">Date of Incorporation</span>
              <span className="sm:col-span-2 text-slate-800">{config.dateOfIncorporation}</span>
            </div>
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-bold text-slate-700">Registered Office Address</span>
              <span className="sm:col-span-2 text-slate-800">{config.registeredAddress}</span>
            </div>
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50">
              <span className="font-bold text-slate-700">Operational Study Center</span>
              <span className="sm:col-span-2 text-slate-800">{config.operationalAddress}</span>
            </div>
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-bold text-slate-700">80G Tax Exemption Status</span>
              <span className="sm:col-span-2 text-amber-800 font-semibold bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg inline-block w-fit text-sm">
                {config.taxExemptionStatus}
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
