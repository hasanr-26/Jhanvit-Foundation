'use client';

import React from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { usePageContent } from '@/lib/pageContent';
import CountUp from './CountUp';

/**
 * Aspirant quotes, with the running count of consultations delivered so far.
 * Both the quotes and the number are edited from the admin panel.
 */
export default function Testimonials({ className = '' }: { className?: string }) {
  const { anubhavv } = usePageContent();
  const { testimonials, testimonialsHeading, consultationsDone, consultationsLabel } = anubhavv;

  if (!testimonials.length && !consultationsDone) return null;

  return (
    <section
      className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-200 ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {testimonialsHeading}
        </h2>

        {consultationsDone && (
          <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm shrink-0">
            <CountUp
              value={consultationsDone}
              className="text-3xl sm:text-4xl font-black text-[#007085] tabular-nums"
            />
            <span className="text-sm font-semibold text-slate-600 max-w-[11rem] leading-snug">
              {consultationsLabel}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <figure
            key={t.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between gap-5"
          >
            <Quote className="w-7 h-7 text-[#007085]/30" />
            <blockquote className="text-sm sm:text-base text-slate-700 leading-relaxed flex-1">
              {t.quote}
            </blockquote>
            <figcaption className="flex items-center gap-3 pt-4 border-t border-slate-100">
              {t.avatarUrl ? (
                <Image
                  src={t.avatarUrl}
                  alt={t.name}
                  width={40}
                  height={40}
                  unoptimized
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="w-10 h-10 rounded-full bg-[#007085] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {t.name.charAt(0)}
                </span>
              )}
              <span className="leading-tight">
                <span className="block font-bold text-slate-900 text-sm">{t.name}</span>
                <span className="block text-xs text-slate-500">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
