'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, MapPin, HeartHandshake, BookOpen } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'ANUBHAVV Study Hall', href: '/anubhavv' },
    { name: 'Consultation', href: '/consultation' },
    { name: 'Sponsorship', href: '/sponsorship' },
    { name: 'Donate', href: '/donate' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar - Credentials & Announcement */}
      <div className="bg-[#007085] text-white text-xs py-1 px-4 hidden md:block border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-5">
            <span className="flex items-center gap-1.5 font-semibold text-xs">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/20">
                SECTION 8 NON-PROFIT
              </span>
              CIN: U85499PN2026NPL255094
            </span>
            <span className="flex items-center gap-1.5 opacity-95 text-cyan-50 text-xs font-medium">
              <MapPin className="w-3.5 h-3.5 text-cyan-200" />
              Sadashiv Peth, Pune – 411030
            </span>
          </div>
          <div className="flex items-center space-x-5 text-cyan-50 text-xs font-medium">
            <a href="tel:7066422555" className="hover:text-cyan-200 transition flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-cyan-200" /> 7066422555
            </a>
            <a href="mailto:anubhavveducation@gmail.com" className="hover:text-cyan-200 transition flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-200" /> anubhavveducation@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${scrolled
          ? 'bg-[#0097b2] shadow-lg py-1.5 sm:py-2 border-b border-[#007f96]'
          : 'bg-[#0097b2] py-2 sm:py-2.5 border-b border-[#007f96]'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-3 lg:gap-6">
            {/* Brand Logo with Complete Pentagon Emblem & Clean Typography */}
            <Link href="/" className="flex items-center gap-3 sm:gap-3.5 group shrink-0 my-auto py-0.5">
              <Image
                src="/images/jhanvit_emblem_clean.png"
                alt="Jhanvit Foundation Logo"
                width={80}
                height={80}
                className="h-11 sm:h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
                priority
              />
              <div className="flex flex-col justify-center">
                <span className="text-white font-extrabold text-xl sm:text-2xl md:text-[26px] tracking-[0.12em] leading-none uppercase drop-shadow-sm">
                  JHANVIT
                </span>
                <span className="text-cyan-100 font-bold text-[10px] sm:text-xs md:text-[13px] tracking-[0.24em] leading-none uppercase mt-1">
                  FOUNDATION
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center space-x-1 shrink-0">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${isActive
                      ? 'bg-white text-[#007086] shadow-sm'
                      : 'text-white/95 hover:text-white hover:bg-white/15'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Quick Action CTAs */}
            <div className="hidden md:flex items-center gap-2.5 shrink-0">
              <Link
                href="/anubhavv"
                className="hidden 2xl:inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-sm font-bold px-3.5 py-2 rounded-xl border border-white/25 transition-all whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 text-white" />
                Book a Seat
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-[#007085] text-sm font-extrabold px-4 py-2 rounded-xl shadow-sm transition-all whitespace-nowrap"
              >
                <HeartHandshake className="w-4 h-4 text-[#007085]" />
                Donate
              </Link>
            </div>

            {/* Mobile / Tablet Menu Button (< xl) */}
            <div className="xl:hidden flex items-center gap-2">
              <Link
                href="/donate"
                className="bg-white text-[#007085] text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm md:hidden"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                Donate
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-white hover:bg-white/15 focus:outline-none transition"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="xl:hidden bg-[#008198] border-t border-cyan-700/50 px-4 pt-3 pb-6 space-y-2 mt-2 shadow-2xl animate-fadeIn">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-lg font-bold transition ${isActive
                    ? 'bg-white text-[#007086]'
                    : 'text-white/95 hover:bg-white/15'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-white/20 flex flex-col gap-2.5">
              <Link
                href="/consultation"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-[#005c6d] hover:bg-[#004957] text-white font-bold py-3 rounded-xl text-base border border-white/20"
              >
                Book Consultation (Jhanvit)
              </Link>
              <Link
                href="/anubhavv"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-white text-[#007085] font-bold py-3 rounded-xl text-base shadow"
              >
                Book a Study Seat (ANUBHAVV)
              </Link>
              <Link
                href="/donate"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-[#005c6d] hover:bg-[#004957] text-white font-extrabold py-3 rounded-xl text-base flex items-center justify-center gap-2 shadow border border-white/20"
              >
                <HeartHandshake className="w-5 h-5" /> Support an Aspirant (Donate)
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
