'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Building2,
  HeartHandshake,
  MessageSquare,
  Presentation,
  GraduationCap,
  FileText,
  ArrowUpRight,
} from 'lucide-react';
import { useSubmissions, countByKind, type SubmissionKind } from '@/lib/submissions';
import { useBlogPosts } from '@/lib/blogData';

const CARDS: { kind: SubmissionKind; label: string; icon: React.ReactNode; accent: string }[] = [
  { kind: 'consultation', label: 'Consultations', icon: <BookOpen className="w-4 h-4" />, accent: 'text-[#0090b0]' },
  { kind: 'seat', label: 'Seat Bookings', icon: <Building2 className="w-4 h-4" />, accent: 'text-rose-400' },
  { kind: 'sponsorship', label: 'Sponsorships', icon: <HeartHandshake className="w-4 h-4" />, accent: 'text-amber-400' },
  { kind: 'workshop', label: 'Workshops', icon: <Presentation className="w-4 h-4" />, accent: 'text-violet-400' },
  { kind: 'fellowship', label: 'Fellowship', icon: <GraduationCap className="w-4 h-4" />, accent: 'text-emerald-400' },
  { kind: 'contact', label: 'Messages', icon: <MessageSquare className="w-4 h-4" />, accent: 'text-slate-300' },
];

export default function Overview({ onOpen }: { onOpen: (kind: SubmissionKind) => void }) {
  const all = useSubmissions();
  const posts = useBlogPosts();
  const counts = countByKind(all);

  const newCount = all.filter((r) => r.status === 'New').length;
  const recent = all.slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="bg-[#0d1420] border border-white/5 rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg font-extrabold text-white">Dashboard</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {newCount > 0
            ? `${newCount} submission${newCount === 1 ? '' : 's'} still marked New.`
            : 'Everything has been looked at. Nothing is sitting unread.'}
        </p>
      </div>

      {/* Counts */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {CARDS.map((card) => (
          <button
            key={card.kind}
            onClick={() => onOpen(card.kind)}
            className="bg-[#0d1420] border border-white/5 hover:border-[#0090b0]/40 rounded-2xl p-4 text-left transition group"
          >
            <span className={`flex items-center gap-2 text-xs font-semibold ${card.accent}`}>
              {card.icon}
              {card.label}
            </span>
            <span className="block text-3xl font-black text-white mt-2 tabular-nums">
              {counts[card.kind]}
            </span>
            <span className="text-xs text-slate-600 group-hover:text-slate-400 transition">
              View all
            </span>
          </button>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-[#0d1420] border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5">
            <h3 className="font-bold text-sm text-white">Latest submissions</h3>
          </div>
          {recent.length === 0 ? (
            <p className="px-5 py-10 text-center text-xs text-slate-600">
              Nothing has come in yet.
            </p>
          ) : (
            <ul className="divide-y divide-white/5">
              {recent.map((row) => (
                <li key={row.id} className="px-5 py-3.5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <span className="block text-sm font-semibold text-white truncate">
                      {row.name}
                    </span>
                    <span className="block text-xs text-slate-500 truncate">
                      {row.id} · {new Date(row.createdAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  <button
                    onClick={() => onOpen(row.kind)}
                    className="text-xs font-semibold text-[#0090b0] hover:text-white transition shrink-0"
                  >
                    {row.status}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-[#0d1420] border border-white/5 rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-sm text-white">Content</h3>
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[#007085]/15 text-[#0090b0] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <span className="block text-2xl font-black text-white tabular-nums">
                {posts.length}
              </span>
              <span className="text-xs text-slate-500">articles in the blog</span>
            </div>
          </div>
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs font-semibold text-slate-400 hover:text-white border border-white/10 rounded-xl px-3.5 py-2.5 transition"
          >
            Open the live website
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
