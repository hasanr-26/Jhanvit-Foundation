'use client';

import React, { useEffect, useState } from 'react';
import { Users, Building2, Calendar } from 'lucide-react';
import { getSiteConfig, SiteConfig, DEFAULT_SITE_CONFIG } from '@/lib/siteConfig';

export default function StatsBar() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);

  useEffect(() => {
    setConfig(getSiteConfig());
  }, []);

  return (
    <section className="relative z-20 -mt-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
        <div className="flex items-center gap-4 pt-4 md:pt-0 justify-center text-center md:text-left">
          <div className="w-14 h-14 rounded-2xl bg-[#e6f7fa] text-[#0090b0] flex items-center justify-center flex-shrink-0">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0f172a]">{config.aspirantsSupported}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Aspirants Supported</div>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 md:pt-0 justify-center text-center md:text-left">
          <div className="w-14 h-14 rounded-2xl bg-[#e6f7fa] text-[#0090b0] flex items-center justify-center flex-shrink-0">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0f172a]">{config.studySeatsAvailable}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Study Seats Available</div>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 md:pt-0 justify-center text-center md:text-left">
          <div className="w-14 h-14 rounded-2xl bg-[#e6f7fa] text-[#0090b0] flex items-center justify-center flex-shrink-0">
            <Calendar className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0f172a]">{config.yearFounded}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Year Founded</div>
          </div>
        </div>
      </div>
    </section>
  );
}
