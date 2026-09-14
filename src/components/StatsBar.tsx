'use client';

import React from 'react';
import { useSiteConfig, DEFAULT_SITE_CONFIG } from '@/lib/siteConfig';
import { ContentIcon } from '@/lib/iconMap';
import CountUp from './CountUp';

export default function StatsBar() {
  const config = useSiteConfig();

  const stats = config.homeStats ?? DEFAULT_SITE_CONFIG.homeStats;

  return (
    <section className="bg-white border-b border-slate-200/80 py-10 sm:py-14 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {stats.map((stat, i) => (
            <div
              key={stat.id}
              className={`flex items-center gap-5 justify-start md:justify-center ${
                i === 0 ? 'pt-4 md:pt-0' : 'pt-6 md:pt-0 md:pl-8'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[#007085] flex items-center justify-center flex-shrink-0">
                <ContentIcon name={stat.icon} className="w-6 h-6" />
              </div>
              <div>
                <CountUp
                  value={stat.value}
                  className="block text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight tabular-nums"
                />
                <div className="text-sm sm:text-base font-bold text-slate-700 mt-1">{stat.label}</div>
                <div className="text-xs text-slate-400 font-medium">{stat.caption}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
