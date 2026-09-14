'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PartnersRow from '@/components/PartnersRow';
import { MapPin, ArrowRight } from 'lucide-react';
import { useSiteConfig } from '@/lib/siteConfig';
import { usePageContent } from '@/lib/pageContent';
import { ContentIcon } from '@/lib/iconMap';

export default function AboutPage() {
  const config = useSiteConfig();
  const { about, home } = usePageContent();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Page Header Banner */}
      <section className="bg-[#007085] text-white pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 border-b-4 border-[#005e70]">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Built by an Aspirant, for Aspirants
          </h1>
          <p className="max-w-3xl mx-auto text-cyan-50 text-base sm:text-lg leading-relaxed">
            Jhanvit Foundation exists to ensure that lack of a quiet study space, strategic
            guidance, or financial means never stops a hardworking student from clearing competitive
            exams.
          </p>
        </div>
      </section>

      {/* Context & mission narrative — text comes from the admin content editor */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-bold text-[#007085] uppercase tracking-wider">
                {about.intro.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                {about.intro.heading}
              </h2>
            </div>

            {about.intro.paragraphs.map((para, i) => (
              <p key={i} className="text-slate-700 text-base sm:text-lg leading-relaxed">
                {para}
              </p>
            ))}

            <div className="p-5 rounded-2xl bg-cyan-50/80 border border-cyan-200/80 space-y-2">
              <div className="font-bold text-[#007085] text-base sm:text-lg">
                Jhanvit Foundation&apos;s Dual Approach:
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                We combine physical study hall infrastructure (<strong>ANUBHAVV Abhyasika</strong> in
                Sadashiv Peth) with <strong>1-on-1 exam mentorship</strong> and{' '}
                <strong>verified student seat sponsorships</strong> for candidates from lower-income
                backgrounds.
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

      {/* Founder story */}
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
              <div className="text-xs text-cyan-200">
                Founder &amp; Director • Ex-Teach For India
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs sm:text-sm font-bold text-[#007085] uppercase tracking-wider">
              {about.founder.eyebrow}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {about.founder.heading}
            </h3>

            {about.founder.paragraphs.map((para, i) => (
              <p key={i} className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {para}
              </p>
            ))}

            <div className="pt-3">
              <blockquote className="border-l-4 border-[#007085] pl-4 italic text-slate-800 text-sm sm:text-base">
                &ldquo;If a candidate works hard for 12 hours a day, the system should not fail them
                because of a lack of a quiet desk or genuine guidance.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* What we actually run — driven by the same list as the homepage */}
      <section className="bg-slate-100/80 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              What We Run
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Three programmes, each aimed at one thing that stops aspirants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {home.initiatives.map((item) => (
              <div
                key={item.id}
                className="bg-white p-7 sm:p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-[#007085] flex items-center justify-center">
                    <ContentIcon name={item.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#007085] hover:text-[#005c6d] pt-4 border-t border-slate-100"
                >
                  {item.ctaText} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guiding principles */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Our Guiding Principles
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            The rules we hold ourselves to on every initiative.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {about.principles.map((principle) => (
            <div
              key={principle.id}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3"
            >
              <div className="w-11 h-11 rounded-xl bg-cyan-50 text-[#007085] flex items-center justify-center">
                <ContentIcon name={principle.icon} className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-lg">{principle.title}</h4>
              <p className="text-sm text-slate-700 leading-relaxed">{principle.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Legal & registration credentials */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Legal Credentials &amp; Details
          </h2>
          <p className="text-slate-600 text-base">
            Registration details filed with the Ministry of Corporate Affairs, Govt. of India.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100 text-sm sm:text-base">
            {[
              ['Organisation Name', config.orgName],
              ['Legal Entity Type', config.legalEntityType],
              ['Corporate Identification Number (CIN)', config.cin],
              ['PAN Number', config.pan],
              ['Date of Incorporation', config.dateOfIncorporation],
              ['Registered Office Address', config.registeredAddress],
              ['Operational Study Center', config.operationalAddress],
              ['80G Tax Exemption Status', config.taxExemptionStatus],
            ].map(([label, value], i) => (
              <div
                key={label}
                className={`p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2 ${
                  i % 2 === 0 ? 'bg-slate-50' : ''
                }`}
              >
                <span className="font-bold text-slate-700">{label}</span>
                <span className="sm:col-span-2 text-slate-800">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner & donor logos */}
      <PartnersRow />

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
