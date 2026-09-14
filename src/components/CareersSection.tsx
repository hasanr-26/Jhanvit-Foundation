'use client';

import React from 'react';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import { usePageContent } from '@/lib/pageContent';
import { useSiteConfig } from '@/lib/siteConfig';

/** Openings at Jhanvit. Falls back to a short note when nothing is listed. */
export default function CareersSection() {
  const { careers } = usePageContent();
  const config = useSiteConfig();
  const openings = careers.openings.filter((o) => o.active);

  return (
    <section
      id="careers"
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-28"
    >
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-[#007085] flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{careers.heading}</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
              {careers.intro}
            </p>
          </div>
        </div>

        {openings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {openings.map((opening) => (
              <div
                key={opening.id}
                className="border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-3 hover:border-[#007085]/40 transition"
              >
                <h3 className="text-lg font-bold text-slate-900">{opening.title}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#007085]" /> {opening.type}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#007085]" /> {opening.location}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{opening.description}</p>
                <a
                  href={`mailto:${config.email}?subject=${encodeURIComponent(
                    `Application: ${opening.title}`
                  )}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#007085] hover:text-[#005c6d] pt-2"
                >
                  Apply by email
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 border border-slate-200 rounded-2xl p-5">
            {careers.noOpeningsNote}
          </p>
        )}
      </div>
    </section>
  );
}
