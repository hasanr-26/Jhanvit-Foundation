'use client';

import React, { useMemo, useState } from 'react';
import { Download, Search, Trash2, Inbox, StickyNote } from 'lucide-react';
import {
  useSubmissions,
  updateSubmission,
  deleteSubmission,
  exportSubmissionsCSV,
  STATUS_OPTIONS,
  SUBMISSION_LABELS,
  type SubmissionKind,
} from '@/lib/submissions';

function statusTone(status: string) {
  const s = status.toLowerCase();
  if (['paid', 'confirmed', 'approved', 'selected', 'attended', 'completed', 'replied'].some((k) => s.includes(k)))
    return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
  if (['review', 'awaiting', 'shortlisted', 'interviewed', 'scheduled', 'waitlist'].some((k) => s.includes(k)))
    return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
  if (['rejected', 'cancelled', 'closed'].some((k) => s.includes(k)))
    return 'bg-red-500/15 text-red-300 border-red-500/30';
  return 'bg-[#0090b0]/15 text-[#4cc7e0] border-[#0090b0]/30';
}

export default function SubmissionsTable({ kind }: { kind: SubmissionKind }) {
  const rows = useSubmissions(kind);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [noteFor, setNoteFor] = useState<string | null>(null);

  const detailKeys = useMemo(
    () => Array.from(new Set(rows.flatMap((r) => Object.keys(r.details)))),
    [rows]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (statusFilter !== 'All' && row.status !== statusFilter) return false;
      if (!q) return true;
      return [row.id, row.name, row.phone, row.email, row.status, ...Object.values(row.details)]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [rows, query, statusFilter]);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, phone, email…"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-[#0d1420] border border-white/10 text-white text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
          >
            <option value="All">All statuses</option>
            {STATUS_OPTIONS[kind].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            {filtered.length} of {rows.length}
          </span>
          <button
            onClick={() => exportSubmissionsCSV(filtered, `Jhanvit_${SUBMISSION_LABELS[kind]}`)}
            disabled={!filtered.length}
            className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 disabled:opacity-40 border border-white/10 text-slate-300 text-xs font-semibold px-3 py-2.5 rounded-xl transition"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0d1420] rounded-2xl border border-white/5 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <Inbox className="w-8 h-8 text-slate-700 mx-auto" />
            <p className="text-sm font-semibold text-slate-400">
              {rows.length ? 'Nothing matches this filter' : 'No submissions yet'}
            </p>
            <p className="text-xs text-slate-600">
              {rows.length
                ? 'Try clearing the search or the status filter.'
                : `New ${SUBMISSION_LABELS[kind].toLowerCase()} from the website will appear here.`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-white/5">
                <tr>
                  {['ID', 'Received', 'Name', 'Phone / Email', ...detailKeys, 'Status', ''].map(
                    (h, i) => (
                      <th
                        key={`${h}-${i}`}
                        className="px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((row) => (
                  <React.Fragment key={row.id}>
                    <tr className="hover:bg-white/[0.02] transition align-top">
                      <td className="px-4 py-4 font-mono text-xs text-[#0090b0] font-bold whitespace-nowrap">
                        {row.id}
                      </td>
                      <td className="px-4 py-4 text-slate-400 text-xs whitespace-nowrap">
                        {new Date(row.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                        <br />
                        <span className="text-slate-600">
                          {new Date(row.createdAt).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-semibold text-white">{row.name}</td>
                      <td className="px-4 py-4 text-slate-400 text-xs">
                        <a href={`tel:${row.phone}`} className="hover:text-[#0090b0]">
                          {row.phone}
                        </a>
                        <br />
                        <a href={`mailto:${row.email}`} className="hover:text-[#0090b0]">
                          {row.email}
                        </a>
                      </td>
                      {detailKeys.map((key) => (
                        <td key={key} className="px-4 py-4 text-slate-300 text-xs max-w-[15rem]">
                          <span className="line-clamp-3" title={row.details[key] ?? ''}>
                            {row.details[key] ?? '—'}
                          </span>
                        </td>
                      ))}
                      <td className="px-4 py-4">
                        <select
                          value={row.status}
                          onChange={(e) => updateSubmission(row.id, { status: e.target.value })}
                          className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border bg-[#0d1420] focus:outline-none focus:ring-2 focus:ring-[#0090b0] ${statusTone(
                            row.status
                          )}`}
                        >
                          {STATUS_OPTIONS[kind].map((status) => (
                            <option key={status} value={status} className="bg-[#0d1420] text-white">
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setNoteFor(noteFor === row.id ? null : row.id)}
                            title="Internal note"
                            className={`p-1.5 rounded-lg transition ${
                              row.notes
                                ? 'text-amber-400 hover:bg-amber-500/10'
                                : 'text-slate-600 hover:text-slate-300 hover:bg-white/5'
                            }`}
                          >
                            <StickyNote className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete submission ${row.id}? This cannot be undone.`)) {
                                deleteSubmission(row.id);
                              }
                            }}
                            title="Delete"
                            className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-950/30 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {noteFor === row.id && (
                      <tr className="bg-white/[0.02]">
                        <td colSpan={5 + detailKeys.length + 1} className="px-4 pb-4">
                          <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                            Internal note (not visible to the applicant)
                          </label>
                          <textarea
                            rows={2}
                            value={row.notes ?? ''}
                            onChange={(e) => updateSubmission(row.id, { notes: e.target.value })}
                            placeholder="e.g. Called on 12 Aug, asked to resend income proof"
                            className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-600 focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                          />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
