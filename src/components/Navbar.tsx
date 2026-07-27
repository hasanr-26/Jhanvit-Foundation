'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, MapPin, HeartHandshake, BookmarkCheck, Sparkles } from 'lucide-react';

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
      <div className="bg-[#00667e] text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="bg-[#f5b82e] text-[#0f172a] text-[10px] font-bold px-1.5 py-0.5 rounded">
                SECTION 8 NON-PROFIT
              </span>
              CIN: U85499PN2026NPL255094
            </span>
            <span className="flex items-center gap-1 opacity-90">
              <MapPin className="w-3.5 h-3.5 text-[#f5b82e]" />
              Sadashiv Peth, Pune – 411030
            </span>
          </div>
          <div className="flex items-center space-x-5">
            <a href="tel:7066422555" className="hover:text-[#f5b82e] transition flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> 7066422555
            </a>
            <a href="mailto:anubhavveducation@gmail.com" className="hover:text-[#f5b82e] transition flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> anubhavveducation@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-2.5' : 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 flex-shrink-0 transition-transform group-hover:scale-105">
                <Image
                  src="/images/jhanvit_logo.png"
                  alt="Jhanvit Foundation Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[#0090b0] leading-none">
                  JHANVIT <span className="text-[#0f172a] font-normal">FOUNDATION</span>
                </span>
                <span className="text-[10px] tracking-wider text-slate-500 uppercase mt-0.5 font-semibold">
                  Guiding Aspirants • Building Futures
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#e6f7fa] text-[#0090b0] font-semibold'
                        : 'text-slate-700 hover:text-[#0090b0] hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Quick Action CTAs */}
            <div className="hidden md:flex items-center gap-2.5">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-1.5 bg-[#0090b0] hover:bg-[#00667e] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all"
              >
                <BookmarkCheck className="w-4 h-4 text-[#f5b82e]" />
                Book Consultation
              </Link>
              <Link
                href="/anubhavv"
                className="inline-flex items-center gap-1.5 bg-[#801800] hover:bg-[#571000] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Book a Seat
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                href="/donate"
                className="bg-[#f5b82e] text-[#0f172a] text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                Donate
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-slate-700 hover:text-[#0090b0] hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 mt-2 shadow-xl animate-fadeIn">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-base font-medium transition ${
                    isActive
                      ? 'bg-[#e6f7fa] text-[#0090b0] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/consultation"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-[#0090b0] text-white font-semibold py-2.5 rounded-lg text-sm"
              >
                Book Consultation (Jhanvit)
              </Link>
              <Link
                href="/anubhavv"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-[#801800] text-white font-semibold py-2.5 rounded-lg text-sm"
              >
                Book a Study Seat (ANUBHAVV)
              </Link>
              <Link
                href="/donate"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-[#f5b82e] text-[#0f172a] font-bold py-2.5 rounded-lg text-sm flex items-center justify-center gap-1.5"
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
