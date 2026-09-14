'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AUTOPLAY_MS = 7000;

const slides = [
  {
    id: 1,
    image: '/images/facility/facility_wide.png',
    badge: 'Structured Study Hall',
    title: "Building the Environment India's Aspirants Deserve",
    subtitle:
      'ANUBHAVV Abhyasika is a dedicated 24x7 study hall in Sadashiv Peth, Pune with individual seats, WiFi, CCTV & a serious peer community.',
    cta: { text: 'Book a Study Seat', href: '/anubhavv' },
  },
  {
    id: 2,
    image: '/images/slide2.jpg',
    badge: 'One-on-One Guidance',
    title: 'Personalised UPSC & MPSC Exam Consultation',
    subtitle:
      'Get exam-specific strategy, personalized study plan & honest feedback from experienced mentors at a nominal fee.',
    cta: { text: 'Book Consultation', href: '/consultation' },
  },
  {
    id: 3,
    image: '/images/facility/facility_cubicles.jpg',
    badge: '24x7 Access in Pune',
    title: 'Quiet, Distraction-Free Study Space for Serious Aspirants',
    subtitle:
      'Located in Sadashiv Peth, Pune — charging points at every desk, 9 HD CCTV cameras & daily timetables for UPSC / MPSC prep.',
    cta: { text: 'View Seat Layout', href: '/anubhavv' },
  },
  {
    id: 4,
    image: '/images/slide4.jpg',
    badge: 'Student Sponsorship',
    title: 'No Deserving Aspirant Should Fail Because of Money',
    subtitle:
      'Jhanvit Foundation uses donor contributions to sponsor study hall seat fees for low-income candidates.',
    cta: { text: 'Support an Aspirant', href: '/donate' },
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  // Autoplay. Restarts whenever the index changes, so a manual click always
  // gets the full interval before the next auto-advance.
  useEffect(() => {
    if (paused) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    const timer = setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, paused, goTo]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goTo(index - 1);
    if (e.key === 'ArrowRight') goTo(index + 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) goTo(delta < 0 ? index + 1 : index - 1);
    touchStartX.current = null;
  };

  const slide = slides[index];

  return (
    <section
      className="relative w-full h-[560px] sm:h-[620px] lg:h-[680px] bg-slate-950 overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Jhanvit Foundation highlights"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background image. No `mode="wait"` so slides cross-fade instead of
          flashing the empty background between them. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slide.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-slate-950/72" />
        </motion.div>
      </AnimatePresence>

      {/* Copy */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-24 sm:pt-28 lg:pt-32">
        <motion.div
          key={slide.id}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="max-w-3xl space-y-5"
        >
          <span className="inline-block text-cyan-200 text-xs sm:text-sm font-semibold tracking-wide border-l-2 border-[#0090b0] pl-2.5">
            {slide.badge}
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            {slide.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
            {slide.subtitle}
          </p>

          <div className="pt-1">
            <Link
              href={slide.cta.href}
              className="inline-flex items-center gap-2 bg-[#007085] hover:bg-[#005c6d] text-white text-sm sm:text-base font-bold px-6 py-3.5 rounded-xl shadow-lg transition"
            >
              {slide.cta.text}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={() => goTo(index - 1)}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/50 hover:bg-[#0090b0] text-white p-2.5 sm:p-3 rounded-full border border-slate-700/50 transition"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={() => goTo(index + 1)}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/50 hover:bg-[#0090b0] text-white p-2.5 sm:p-3 rounded-full border border-slate-700/50 transition"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-[#0090b0]' : 'w-2.5 bg-white/40 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
