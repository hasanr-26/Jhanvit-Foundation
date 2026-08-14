import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
  Home,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Phone,
  ArrowRight,
} from 'lucide-react';

export const metadata = {
  title: 'Page Not Found (404) | Jhanvit Foundation',
  description: 'The page you are looking for cannot be found. Explore ANUBHAVV Study Hall, 1-on-1 Consultation, or Student Sponsorships.',
};

export default function NotFound() {
  const quickLinks = [
    {
      title: 'ANUBHAVV Study Hall',
      desc: 'Explore 125 study seats in Sadashiv Peth, Pune.',
      href: '/anubhavv',
      icon: BookOpen,
    },
    {
      title: '1-on-1 Consultation',
      desc: 'Book personalized guidance for UPSC & MPSC prep.',
      href: '/consultation',
      icon: GraduationCap,
    },
    {
      title: 'Student Sponsorship',
      desc: 'Apply for funded seats or support a deserving aspirant.',
      href: '/sponsorship',
      icon: HeartHandshake,
    },
    {
      title: 'Contact & Directions',
      desc: 'Get in touch with our Sadashiv Peth operational center.',
      href: '/contact',
      icon: Phone,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full text-center space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 text-[#007085] text-xs sm:text-sm font-extrabold border border-cyan-200">
            ERROR 404 • PAGE NOT FOUND
          </div>

          {/* Large Editorial Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
              Looks Like You Wandered Off the Study Track
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              The page you are looking for does not exist, has moved, or the link may be broken. Let&apos;s get you back to where you need to be.
            </p>
          </div>

          {/* Primary Action Button */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#007085] hover:bg-[#005c6d] text-white font-extrabold text-base px-8 py-4 rounded-xl shadow-md transition hover:shadow-lg"
            >
              <Home className="w-5 h-5" />
              Return to Homepage
            </Link>
          </div>

          {/* Quick Help Navigation Links */}
          <div className="pt-8 border-t border-slate-200 space-y-4">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">
              Popular Pages You Might Be Looking For
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {quickLinks.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#007085] shadow-sm hover:shadow-md transition group flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-bold text-slate-900 text-base group-hover:text-[#007085] transition">
                        <IconComponent className="w-4 h-4 text-[#007085]" />
                        {item.title}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#007085] group-hover:translate-x-0.5 transition shrink-0 mt-1" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
