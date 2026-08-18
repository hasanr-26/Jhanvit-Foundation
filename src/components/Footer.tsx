'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ShieldCheck, HeartHandshake, ArrowUpRight } from 'lucide-react';
import { getSiteConfig, SiteConfig, DEFAULT_SITE_CONFIG } from '@/lib/siteConfig';

export default function Footer() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);

  useEffect(() => {
    setConfig(getSiteConfig());
  }, []);

  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-16 pb-12 border-t-4 border-[#0090b0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & NGO info */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Image
                src="/images/jhanvit_logo_transparent.png"
                alt="Jhanvit Foundation"
                width={280}
                height={90}
                className="object-contain h-24 md:h-28 w-auto"
              />
              <p className="text-xs text-center text-cyan-300 font-bold">Section 8 Non-Profit Organisation</p>
            </div>
            <p className="text-xs text-center text-slate-400 leading-relaxed">
              Empowering competitive exam aspirants in Pune through structured study spaces, expert guidance, and financial sponsorship.
            </p>
            <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">CIN:</span>
                <span className="font-mono text-cyan-300 font-bold">{config.cin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">PAN:</span>
                <span className="font-mono text-white font-semibold">{config.pan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Incorporation:</span>
                <span className="text-white font-medium">{config.dateOfIncorporation}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#0090b0] pl-2.5">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-[#0090b0] text-slate-300 transition flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0090b0]" /> About Jhanvit Foundation
                </Link>
              </li>
              <li>
                <Link href="/anubhavv" className="hover:text-[#0090b0] text-slate-300 transition flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0090b0]" /> ANUBHAVV Abhyasika Study Hall
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-[#0090b0] text-slate-300 transition flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0090b0]" /> Book Consultation (UPSC/MPSC)
                </Link>
              </li>
              <li>
                <Link href="/sponsorship" className="hover:text-[#0090b0] text-slate-300 transition flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0090b0]" /> Apply for Sponsored Seat
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-[#0090b0] text-slate-300 transition flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0090b0]" /> Support an Aspirant (Donate)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0090b0] text-slate-300 transition flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0090b0]" /> Contact & Directions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Operational & Reg Addresses */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#0090b0] pl-2.5">
              Contact & Location
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-[#0090b0] flex-shrink-0 mt-0.5" />
                <div className="text-slate-300">
                  <span className="font-semibold text-white block">Operational Center:</span>
                  {config.operationalAddress}
                </div>
              </div>
              <div className="flex gap-2">
                <Phone className="w-4 h-4 text-[#0090b0] flex-shrink-0 mt-0.5" />
                <div className="text-slate-300">
                  <span className="font-semibold text-white block">Phone Numbers:</span>
                  <a href={`tel:${config.phone1}`} className="hover:underline hover:text-[#0090b0]">{config.phone1}</a>
                  {config.phone2 && (
                    <> / <a href={`tel:${config.phone2}`} className="hover:underline hover:text-[#0090b0]">{config.phone2}</a></>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Mail className="w-4 h-4 text-[#0090b0] flex-shrink-0 mt-0.5" />
                <div className="text-slate-300">
                  <span className="font-semibold text-white block">Email:</span>
                  <a href={`mailto:${config.email}`} className="hover:underline hover:text-[#0090b0]">{config.email}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Partner Entity Notice & CTA */}
          <div className="space-y-4 bg-slate-800/80 p-4.5 rounded-xl border border-slate-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0090b0]" />
              <h4 className="text-sm font-bold text-white">Transparency Notice</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Jhanvit Foundation (Section 8 Non-Profit) provides guidance and sponsors seats. ANUBHAVV Impact Labs (For-Profit) operates the study hall. Bank details for donations and seat fees are strictly separated.
            </p>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#0090b0] hover:bg-[#007894] text-white text-xs font-bold py-2.5 rounded-xl transition shadow"
            >
              <HeartHandshake className="w-4 h-4" />
              Sponsor A Student Seat
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 {config.orgName}. All rights reserved. Registered under MCA, Govt of India.</p>
          <p className="flex items-center gap-2">
            Founder & Director: <span className="text-slate-300 font-semibold">Ganesh Zanjad</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
