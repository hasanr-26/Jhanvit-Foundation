'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, BookmarkCheck, Sparkles, HeartHandshake, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    image: '/images/facility/facility_wide.png',
    badge: 'Structured Study Hall',
    title: "Building the Environment India's Aspirants Deserve",
    subtitle: 'ANUBHAVV Abhyasika is a dedicated 24x7 study hall in Sadashiv Peth, Pune with individual seats, WiFi, CCTV & a serious peer community.',
    ctaPrimary: { text: 'Book a Study Seat', href: '/anubhavv', color: 'bg-[#007085] hover:bg-[#005c6d] text-white' },
  },
  {
    id: 2,
    image: '/images/slide2.jpg',
    badge: 'One-on-One Guidance',
    title: 'Personalised UPSC & MPSC Exam Consultation',
    subtitle: 'Get exam-specific strategy, personalized study plan & honest feedback from experienced mentors at a nominal fee.',
    ctaPrimary: { text: 'Book Consultation', href: '/consultation', color: 'bg-[#007085] hover:bg-[#005c6d] text-white' },
  },
  {
    id: 3,
    image: '/images/facility/facility_cubicles.jpg',
    badge: '24x7 Access in Pune',
    title: 'Quiet, Distraction-Free Study Space for Serious Aspirants',
    subtitle: 'Located in Sadashiv Peth, Pune — charging points at every desk, 9 HD CCTV cameras & daily timetables for UPSC / MPSC prep.',
    ctaPrimary: { text: 'View Seat Layout', href: '/anubhavv', color: 'bg-[#007085] hover:bg-[#005c6d] text-white' },
  },
  {
    id: 4,
    image: '/images/slide4.jpg',
    badge: 'Section 8 Non-Profit',
    title: 'No Deserving Aspirant Should Fail Because of Money',
    subtitle: 'Jhanvit Foundation uses donor contributions to sponsor study hall seat fees for low-income candidates.',
    ctaPrimary: { text: 'Support an Aspirant', href: '/donate', color: 'bg-[#007085] hover:bg-[#005c6d] text-white' },
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[580px] sm:h-[640px] lg:h-[700px] bg-slate-950 overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* Background Image Carousel with Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            fill
            sizes="100vw"
            className="object-cover object-center brightness-[0.38] contrast-[1.05]"
            priority
          />
          {/* Solid Dark Overlay */}
          <div className="absolute inset-0 bg-slate-950/75" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-36 sm:pt-40 lg:pt-44 pb-16">
        <div className="max-w-3xl space-y-6">
          {/* Main Title */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${currentIndex}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
            >
              {slides[currentIndex].title}
            </motion.h1>
          </AnimatePresence>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`subtitle-${currentIndex}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl"
            >
              {slides[currentIndex].subtitle}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Prev / Next Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/50 hover:bg-[#0090b0] text-white p-3 rounded-full backdrop-blur-sm border border-slate-700/50 transition"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/50 hover:bg-[#0090b0] text-white p-3 rounded-full backdrop-blur-sm border border-slate-700/50 transition"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-[#0090b0]' : 'w-2.5 bg-white/40 hover:bg-white/80'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
