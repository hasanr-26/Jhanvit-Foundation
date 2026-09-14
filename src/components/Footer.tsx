'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, HeartHandshake, ArrowUpRight } from 'lucide-react';
import { useSiteConfig } from '@/lib/siteConfig';
import { usePublicBlogPosts } from '@/lib/blogData';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const config = useSiteConfig();
  // Latest four published articles, so these links never go stale.
  const recentPosts = [...usePublicBlogPosts()]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, 4);

  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-16 pb-12 border-t-4 border-[#0090b0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & NGO info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex flex-col gap-2">
              <Image
                src="/images/jhanvit_logo_transparent.png"
                alt="Jhanvit Foundation"
                width={280}
                height={90}
                className="object-contain h-20 md:h-24 w-auto"
              />
              <p className="text-xs text-cyan-300 font-bold">Registered under MCA, Govt. of India</p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
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

          {/* Col 2: Quick Navigation + Knowledge Hub & Blog (Stacked) (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Navigation */}
            <div className="space-y-3.5">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#0090b0] pl-2.5">
                Quick Navigation
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/about" className="hover:text-[#0090b0] text-slate-300 transition flex items-center gap-1.5">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0090b0]" /> About Us
                  </Link>
                </li>
                <li>
                  <Link href="/anubhavv" className="hover:text-[#0090b0] text-slate-300 transition flex items-center gap-1.5">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0090b0]" /> ANUBHAVV Study Hall
                  </Link>
                </li>
                <li>
                  <Link href="/consultation" className="hover:text-[#0090b0] text-slate-300 transition flex items-center gap-1.5">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0090b0]" /> Book Consultation
                  </Link>
                </li>
                <li>
                  <Link href="/sponsorship" className="hover:text-[#0090b0] text-slate-300 transition flex items-center gap-1.5">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0090b0]" /> Student Section
                  </Link>
                </li>
                <li>
                  <Link href="/donate" className="hover:text-[#0090b0] text-slate-300 transition flex items-center gap-1.5">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0090b0]" /> Donate / Support
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#0090b0] text-slate-300 transition flex items-center gap-1.5">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0090b0]" /> Contact &amp; Directions
                  </Link>
                </li>
                <li>
                  <Link href="/contact#careers" className="hover:text-[#0090b0] text-slate-300 transition flex items-center gap-1.5">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0090b0]" /> Careers at Jhanvit
                  </Link>
                </li>
              </ul>
            </div>

            {/* Knowledge Hub & Blog */}
            <div className="space-y-3.5">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#0090b0] pl-2.5">
                News &amp; Updates
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/blog" className="hover:text-[#0090b0] transition flex items-center gap-1.5 font-semibold text-cyan-300">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0090b0]" /> All articles
                  </Link>
                </li>
                {recentPosts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-[#0090b0] text-slate-300 transition flex items-start gap-1.5"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#0090b0] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{post.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 3: Contact & Location (Closer to middle column) (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#0090b0] pl-2.5">
              Contact & Location
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-[#0090b0] flex-shrink-0 mt-0.5" />
                <div className="text-slate-300 leading-relaxed">
                  <span className="font-semibold text-white block">Operational Center:</span>
                  {config.operationalAddress}
                </div>
              </div>
              <div className="flex gap-2">
                <Phone className="w-4 h-4 text-[#0090b0] flex-shrink-0 mt-0.5" />
                <div className="text-slate-300">
                  <span className="font-semibold text-white block">Phone:</span>
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

            <div className="pt-3">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 w-full max-w-sm bg-[#0090b0] hover:bg-[#007894] text-white text-xs font-bold py-2.5 rounded-xl transition shadow"
              >
                <HeartHandshake className="w-4 h-4" />
                Sponsor A Student Seat
              </Link>
            </div>
          </div>
        </div>

        {/* Follow us */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-8">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Follow Jhanvit Foundation
          </span>
          <SocialLinks size="md" tone="dark" />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 {config.orgName}. All rights reserved. Registered under MCA, Govt of India.</p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <Link href="/blog" className="hover:text-cyan-300 transition">
              News &amp; Updates
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-cyan-300 transition">
              Contact Us
            </Link>
            <span>•</span>
            <p className="flex items-center gap-1.5 text-slate-500">
              Director: <span className="text-slate-300 font-semibold">Ganesh Zanjad</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
