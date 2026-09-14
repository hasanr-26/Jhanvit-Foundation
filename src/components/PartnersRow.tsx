'use client';

import React from 'react';
import Image from 'next/image';
import { usePageContent, type Partner } from '@/lib/pageContent';

function LogoCard({ partner }: { partner: Partner }) {
  const inner = (
    <div className="bg-white border border-slate-200 rounded-2xl h-28 flex items-center justify-center p-5 hover:border-[#007085]/40 hover:shadow-sm transition">
      {partner.logoUrl ? (
        <Image
          src={partner.logoUrl}
          alt={partner.name}
          width={220}
          height={90}
          unoptimized
          className="max-h-16 w-auto object-contain"
        />
      ) : (
        <span className="text-sm font-bold text-slate-700 text-center leading-snug">
          {partner.name}
        </span>
      )}
    </div>
  );

  if (!partner.website) return inner;
  return (
    <a href={partner.website} target="_blank" rel="noopener noreferrer" title={partner.name}>
      {inner}
    </a>
  );
}

/**
 * Partner and donor logos. Hidden until the admin adds the first one, so the
 * page never shows an empty shelf while partnerships are still being signed.
 */
export default function PartnersRow() {
  const { about } = usePageContent();
  const partners = about.partners.filter((p) => p.kind === 'partner');
  const donors = about.partners.filter((p) => p.kind === 'donor');

  if (!about.partners.length) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full border-t border-slate-200">
      <div className="text-center space-y-3 mb-10">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          {about.partnersHeading}
        </h2>
        <p className="text-slate-600 text-base max-w-2xl mx-auto">{about.partnersIntro}</p>
      </div>

      {partners.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Partners</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {partners.map((p) => (
              <LogoCard key={p.id} partner={p} />
            ))}
          </div>
        </div>
      )}

      {donors.length > 0 && (
        <div className="space-y-4 mt-10">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
            Donors &amp; Supporters
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {donors.map((p) => (
              <LogoCard key={p.id} partner={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
