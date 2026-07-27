'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, MapPin, HeartHandshake, GraduationCap, BookOpen } from 'lucide-react';

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
      <div className="bg-[#007085] text-white text-[11px] py-1 px-4 hidden md:block border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-5">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="bg-white/20 text-white text-[9px] font-bold px-1.5 py-0.5 rounded border border-white/20">
                SECTION 8 NON-PROFIT
              </span>
              CIN: U85499PN2026NPL255094
            </span>
            <span className="flex items-center gap-1 opacity-95 text-cyan-50">
              <MapPin className="w-3 h-3 text-cyan-200" />
              Sadashiv Peth, Pune – 411030
            </span>
          </div>
          <div className="flex items-center space-x-4 text-cyan-50">
            <a href="tel:7066422555" className="hover:text-cyan-200 transition flex items-center gap-1">
              <Phone className="w-3 h-3 text-cyan-200" /> 7066422555
            </a>
            <a href="mailto:anubhavveducation@gmail.com" className="hover:text-cyan-200 transition flex items-center gap-1">
              <Mail className="w-3 h-3 text-cyan-200" /> anubhavveducation@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${scrolled
          ? 'bg-[#0097b2] shadow-lg py-1.5 border-b border-[#007f96]'
          : 'bg-[#0097b2] py-2 border-b border-[#007f96]'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Horizontal Logo Graphic Variant */}
            <Link href="/" className="flex items-center group flex-shrink-0 py-0.5">
              <Image
                src="/images/jhanvit_logo_transparent2.png"
                alt="Jhanvit Foundation Logo"
                width={340}
                height={80}
                className="object-contain h-12 sm:h-14 md:h-16 w-auto transition-transform group-hover:scale-105"
                priority
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${isActive
                      ? 'bg-white text-[#007086] font-bold shadow-sm'
                      : 'text-white/90 hover:text-white hover:bg-white/15'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Quick Action CTAs */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/25 transition-all whitespace-nowrap"
              >
                <GraduationCap className="w-3.5 h-3.5 text-white" />
                Book Consultation
              </Link>
              <Link
                href="/anubhavv"
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/25 transition-all whitespace-nowrap"
              >
                <BookOpen className="w-3.5 h-3.5 text-white" />
                Book a Seat
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-[#007085] text-xs font-extrabold px-3 py-1.5 rounded-lg shadow-sm transition-all whitespace-nowrap"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-[#007085]" />
                Donate
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                href="/donate"
                className="bg-white text-[#007085] text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm"
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
          <div className="lg:hidden bg-[#008198] border-t border-cyan-700/50 px-4 pt-3 pb-6 space-y-2 mt-2 shadow-2xl animate-fadeIn">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-base font-medium transition ${isActive
                    ? 'bg-white text-[#007086] font-bold'
                    : 'text-white/90 hover:bg-white/15'
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
                className="w-full text-center bg-[#005c6d] hover:bg-[#004957] text-white font-bold py-2.5 rounded-xl text-sm border border-white/20"
              >
                Book Consultation (Jhanvit)
              </Link>
              <Link
                href="/anubhavv"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-white text-[#007085] font-bold py-2.5 rounded-xl text-sm shadow"
              >
                Book a Study Seat (ANUBHAVV)
              </Link>
              <Link
                href="/donate"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-[#005c6d] hover:bg-[#004957] text-white font-extrabold py-2.5 rounded-xl text-sm flex items-center justify-center gap-1.5 shadow border border-white/20"
              >
                <HeartHandshake className="w-4 h-4" /> Support an Aspirant (Donate)
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
