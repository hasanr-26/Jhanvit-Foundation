'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { usePageContent } from '@/lib/pageContent';
import type { Initiative } from '@/lib/pageContent';

function FeaturedCard({ item }: { item: Initiative }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col justify-between group">
      <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-slate-900">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {item.badge && (
          <span className="absolute top-4 left-4 bg-[#007085] text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-lg shadow-md">
            {item.badge}
          </span>
        )}
      </div>

      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          {item.location && (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#007085]">
              <MapPin className="w-4 h-4" />
              {item.location}
            </div>
          )}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{item.title}</h3>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed">{item.description}</p>
        </div>

        {item.highlights.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {item.highlights.map((h, i) => (
              <div
                key={i}
                className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-center"
              >
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900">{h.value}</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
                  {h.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <Link
            href={item.href}
            className="inline-flex items-center justify-center gap-2 bg-[#007085] hover:bg-[#005c6d] text-white text-sm sm:text-base font-bold px-6 py-3.5 rounded-xl shadow transition"
          >
            {item.ctaText} <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-xs sm:text-sm font-medium text-slate-500 text-center sm:text-right">
            {item.meta}
          </span>
        </div>
      </div>
    </div>
  );
}

function SideCard({ item }: { item: Initiative }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col justify-between group">
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {item.badge && (
          <span className="absolute top-4 left-4 bg-[#007085] text-white text-xs font-bold px-3 py-1 rounded-lg shadow">
            {item.badge}
          </span>
        )}
      </div>

      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#007085] transition">
            {item.title}
          </h3>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{item.description}</p>
        </div>
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <Link
            href={item.href}
            className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#007085] hover:text-[#005c6d] transition"
          >
            {item.ctaText} <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-xs sm:text-sm text-slate-500 font-semibold shrink-0">
            {item.meta}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function InitiativesGrid() {
  const content = usePageContent();
  const { initiativesHeading, initiativesIntro, initiatives } = content.home;

  const featured = initiatives.find((i) => i.featured);
  const rest = initiatives.filter((i) => i !== featured);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          {initiativesHeading}
        </h2>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">{initiativesIntro}</p>
      </div>

      {featured ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <FeaturedCard item={featured} />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6">
            {rest.map((item) => (
              <SideCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {rest.map((item) => (
            <SideCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
