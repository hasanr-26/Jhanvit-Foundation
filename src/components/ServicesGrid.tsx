'use client';

import React from 'react';
import { usePageContent } from '@/lib/pageContent';
import { ContentIcon } from '@/lib/iconMap';

/** "What you get with a seat" — icon cards, all editable from the admin panel. */
export default function ServicesGrid() {
  const { anubhavv } = usePageContent();
  if (!anubhavv.services.length) return null;

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-200">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {anubhavv.servicesHeading}
        </h2>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          {anubhavv.servicesIntro}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {anubhavv.services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3"
          >
            <div className="w-11 h-11 rounded-xl bg-cyan-50 text-[#007085] flex items-center justify-center">
              <ContentIcon name={service.icon} className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">{service.title}</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
