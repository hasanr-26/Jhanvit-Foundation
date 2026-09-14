'use client';

import React from 'react';
import { usePageContent, type SocialLink } from '@/lib/pageContent';

// lucide-react v1 dropped brand marks, so the logos live here as paths.
const PATHS: Record<SocialLink['platform'], { label: string; d: string }> = {
  instagram: {
    label: 'Instagram',
    d: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 5.68a4.16 4.16 0 1 0 0 8.32 4.16 4.16 0 0 0 0-8.32zm0 6.86a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4zm5.3-7.02a.97.97 0 1 1-1.95 0 .97.97 0 0 1 1.95 0z',
  },
  facebook: {
    label: 'Facebook',
    d: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.89 3.77-3.89 1.1 0 2.24.19 2.24.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12z',
  },
  youtube: {
    label: 'YouTube',
    d: 'M21.58 7.19a2.51 2.51 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42a2.51 2.51 0 0 0-1.77 1.77A26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .42 4.81 2.51 2.51 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.51 2.51 0 0 0 1.77-1.77A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.42-4.81zM10 15.02V8.98L15.2 12 10 15.02z',
  },
  linkedin: {
    label: 'LinkedIn',
    d: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45z',
  },
  twitter: {
    label: 'X',
    d: 'M17.53 3h3.04l-6.64 7.59L21.75 21h-6.11l-4.79-6.26L5.37 21H2.33l7.1-8.12L2.25 3h6.27l4.33 5.72L17.53 3zm-1.07 16.17h1.68L7.6 4.73H5.8l10.66 14.44z',
  },
  telegram: {
    label: 'Telegram',
    d: 'M21.94 4.6 18.9 19.2c-.23 1.02-.84 1.27-1.7.79l-4.7-3.46-2.27 2.18c-.25.25-.46.46-.95.46l.34-4.8 8.74-7.9c.38-.34-.08-.52-.59-.19l-10.8 6.8-4.65-1.46c-1.01-.32-1.03-1.01.21-1.5l18.18-7c.84-.31 1.58.2 1.3 1.48z',
  },
};

export default function SocialLinks({
  className = '',
  size = 'sm',
  tone = 'light',
}: {
  className?: string;
  size?: 'sm' | 'md';
  tone?: 'light' | 'dark';
}) {
  const { socials } = usePageContent();
  const links = socials.filter((s) => s.url.trim());
  if (!links.length) return null;

  const box = size === 'md' ? 'w-9 h-9' : 'w-7 h-7';
  const glyph = size === 'md' ? 'w-[18px] h-[18px]' : 'w-4 h-4';
  const colors =
    tone === 'dark'
      ? 'bg-slate-800 text-slate-300 hover:bg-[#0090b0] hover:text-white border-slate-700'
      : 'bg-white/15 text-white hover:bg-white hover:text-[#007085] border-white/20';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {links.map((social) => {
        const mark = PATHS[social.platform];
        if (!mark) return null;
        return (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={mark.label}
            title={mark.label}
            className={`${box} rounded-lg border flex items-center justify-center transition ${colors}`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className={glyph} aria-hidden="true">
              <path d={mark.d} />
            </svg>
          </a>
        );
      })}
    </div>
  );
}
