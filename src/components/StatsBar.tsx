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
    <section className="bg-white border-b border-slate-200/80 py-10 sm:py-14 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="flex items-center gap-5 justify-start md:justify-center pt-4 md:pt-0">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[#007085] flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                {config.aspirantsSupported}
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-700 mt-1">Aspirants Supported</div>
              <div className="text-xs text-slate-400 font-medium">UPSC, MPSC & State Exams</div>
            </div>
          </div>

          <div className="flex items-center gap-5 justify-start md:justify-center pt-6 md:pt-0 md:pl-8">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[#007085] flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                {config.studySeatsAvailable}
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-700 mt-1">Study Seats Available</div>
              <div className="text-xs text-slate-400 font-medium">Sadashiv Peth, Pune (24x7)</div>
            </div>
          </div>

          <div className="flex items-center gap-5 justify-start md:justify-center pt-6 md:pt-0 md:pl-8">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[#007085] flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                {config.yearFounded}
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-700 mt-1">Year Founded</div>
              <div className="text-xs text-slate-400 font-medium">Section 8 Non-Profit NGO</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
