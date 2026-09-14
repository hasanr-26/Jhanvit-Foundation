'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { ContentIcon } from '@/lib/iconMap';
import type { Pillar } from '@/lib/pageContent';

/**
 * Problem / Solution / Vision / Mission as four switchable panels.
 * Tabs on desktop, a scrollable row on mobile.
 */
export default function PillarTabs({
  pillars,
  heading,
  intro,
}: {
  pillars: Pillar[];
  heading?: string;
  intro?: string;
}) {
  const [active, setActive] = useState(0);

  if (!pillars.length) return null;
  const current = pillars[Math.min(active, pillars.length - 1)];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') setActive((i) => (i + 1) % pillars.length);
    if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + pillars.length) % pillars.length);
  };

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {(heading || intro) && (
        <div className="max-w-3xl mb-8 sm:mb-10 space-y-2.5">
          {heading && (
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {heading}
            </h2>
          )}
          {intro && <p className="text-slate-600 text-base sm:text-lg leading-relaxed">{intro}</p>}
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Problem, solution, vision and mission"
          onKeyDown={onKeyDown}
          className="flex overflow-x-auto no-scrollbar border-b border-slate-200 bg-slate-50/80"
        >
          {pillars.map((pillar, i) => {
            const isActive = i === active;
            return (
              <button
                key={pillar.id}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2.5 px-5 sm:px-7 py-4 text-sm sm:text-base font-bold whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? 'border-[#007085] text-[#007085] bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/60'
                }`}
              >
                <ContentIcon name={pillar.icon} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                {pillar.label}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          role="tabpanel"
          className="p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
        >
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {current.title}
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{current.body}</p>
          </div>

          {current.points.length > 0 && (
            <ul className="lg:col-span-5 space-y-3 lg:border-l lg:border-slate-100 lg:pl-8">
              {current.points.map((point, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-slate-700 leading-relaxed">
                  <Check className="w-4 h-4 text-[#007085] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
