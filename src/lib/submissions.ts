// submissions.ts — Every form on the public site writes here, and /admin reads
// from here. Same localStorage pattern as siteConfig / blogData; when the
// backend in BACKEND_ROADMAP.md lands, only the read/write helpers change.

import { useMemo } from 'react';
import { createClientStore } from './clientStore';

export type SubmissionKind =
  | 'consultation'
  | 'seat'
  | 'sponsorship'
  | 'workshop'
  | 'fellowship'
  | 'contact';

export interface Submission {
  id: string;
  kind: SubmissionKind;
  createdAt: string;
  status: string;
  name: string;
  phone: string;
  email: string;
  /** Everything specific to the form, rendered as extra columns in the admin. */
  details: Record<string, string>;
  notes?: string;
}

export const SUBMISSION_LABELS: Record<SubmissionKind, string> = {
  consultation: 'Consultations',
  seat: 'Seat Bookings',
  sponsorship: 'Sponsorships',
  workshop: 'Workshop Applications',
  fellowship: 'Fellowship Applications',
  contact: 'Messages',
};

/** Statuses the admin can move a row through, per kind. */
export const STATUS_OPTIONS: Record<SubmissionKind, string[]> = {
  consultation: ['New', 'Paid', 'Scheduled', 'Completed', 'Cancelled'],
  seat: ['New', 'Confirmed & Paid', 'Awaiting Payment', 'Cancelled'],
  sponsorship: ['New', 'Under Review', 'Approved', 'Rejected', 'Waitlisted'],
  workshop: ['New', 'Confirmed', 'Attended', 'Cancelled'],
  fellowship: ['New', 'Shortlisted', 'Interviewed', 'Selected', 'Rejected'],
  contact: ['New', 'Replied', 'Closed'],
};

const STORAGE_KEY = 'jhanvit_submissions';

/** A few rows so the dashboard is not blank on a fresh install. */
const SEED: Submission[] = [
  {
    id: 'CON-101',
    kind: 'consultation',
    createdAt: '2026-08-05T10:00:00.000Z',
    status: 'Paid',
    name: 'Rahul Deshmukh',
    phone: '9876543210',
    email: 'rahul@gmail.com',
    details: { Exam: 'UPSC', Stage: 'Prelims prep', Slot: '2026-08-05 · 10:00 AM', Fee: '₹199' },
  },
  {
    id: 'CON-102',
    kind: 'consultation',
    createdAt: '2026-08-06T14:00:00.000Z',
    status: 'Scheduled',
    name: 'Sneha Patil',
    phone: '9123456789',
    email: 'sneha@gmail.com',
    details: { Exam: 'MPSC', Stage: 'Mains prep', Slot: '2026-08-06 · 02:00 PM', Fee: '₹199' },
  },
  {
    id: 'SEAT-1001',
    kind: 'seat',
    createdAt: '2026-07-27T09:00:00.000Z',
    status: 'Confirmed & Paid',
    name: 'Vikram Joshi',
    phone: '9765432109',
    email: 'vikram@gmail.com',
    details: { Seat: 'S-14', Exam: 'UPSC', Amount: '₹2,200' },
  },
  {
    id: 'SPON-501',
    kind: 'sponsorship',
    createdAt: '2026-07-25T09:00:00.000Z',
    status: 'Under Review',
    name: 'Ganesh More',
    phone: '9654321098',
    email: 'ganesh@gmail.com',
    details: { Exam: 'MPSC', Income: 'Below ₹1.5L', Age: '22' },
  },
  {
    id: 'MSG-301',
    kind: 'contact',
    createdAt: '2026-07-27T11:30:00.000Z',
    status: 'New',
    name: 'Anand Kumar',
    phone: '9432109876',
    email: 'anand@gmail.com',
    details: {
      Role: 'Donor',
      Message: 'I want to donate ₹24,000 for a student annual seat.',
    },
  },
];

const PREFIX: Record<SubmissionKind, string> = {
  consultation: 'CON',
  seat: 'SEAT',
  sponsorship: 'SPON',
  workshop: 'WSH',
  fellowship: 'FEL',
  contact: 'MSG',
};

function read(): Submission[] {
  if (typeof window === 'undefined') return SEED;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return SEED;
    const rows: Submission[] = JSON.parse(stored);
    return Array.isArray(rows) ? rows : SEED;
  } catch {
    return SEED;
  }
}

const store = createClientStore(STORAGE_KEY, read, SEED);

function write(rows: Submission[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
    store.notify();
  } catch (err) {
    console.error('Error saving submissions:', err);
  }
}

export function getSubmissions(): Submission[] {
  return read();
}

/** Live list, newest first. */
export function useSubmissions(kind?: SubmissionKind): Submission[] {
  const rows = store.useValue();
  return useMemo(() => {
    const filtered = kind ? rows.filter((r) => r.kind === kind) : rows;
    return [...filtered].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }, [rows, kind]);
}

export function countByKind(rows: Submission[]): Record<SubmissionKind, number> {
  const counts = {
    consultation: 0,
    seat: 0,
    sponsorship: 0,
    workshop: 0,
    fellowship: 0,
    contact: 0,
  } as Record<SubmissionKind, number>;
  rows.forEach((row) => {
    if (counts[row.kind] !== undefined) counts[row.kind] += 1;
  });
  return counts;
}

export function addSubmission(
  kind: SubmissionKind,
  entry: { name: string; phone: string; email: string; details: Record<string, string> }
): Submission | null {
  if (typeof window === 'undefined') return null;
  const rows = read();
  const serial = rows.filter((r) => r.kind === kind).length + 101;
  const submission: Submission = {
    id: `${PREFIX[kind]}-${serial}-${Date.now().toString(36).slice(-4)}`,
    kind,
    createdAt: new Date().toISOString(),
    status: 'New',
    ...entry,
  };
  write([submission, ...rows]);
  return submission;
}

export function updateSubmission(id: string, patch: Partial<Submission>): void {
  if (typeof window === 'undefined') return;
  write(read().map((row) => (row.id === id ? { ...row, ...patch } : row)));
}

export function deleteSubmission(id: string): void {
  if (typeof window === 'undefined') return;
  write(read().filter((row) => row.id !== id));
}

export function exportSubmissionsCSV(rows: Submission[], filename: string): void {
  if (typeof window === 'undefined' || !rows.length) return;

  const detailKeys = Array.from(new Set(rows.flatMap((r) => Object.keys(r.details))));
  const headers = ['ID', 'Received', 'Name', 'Phone', 'Email', 'Status', ...detailKeys, 'Notes'];
  const escape = (v: string) => `"${String(v ?? '').replace(/"/g, '""')}"`;

  const lines = rows.map((row) =>
    [
      row.id,
      new Date(row.createdAt).toLocaleString('en-IN'),
      row.name,
      row.phone,
      row.email,
      row.status,
      ...detailKeys.map((key) => row.details[key] ?? ''),
      row.notes ?? '',
    ]
      .map(escape)
      .join(',')
  );

  const csv = [headers.map(escape).join(','), ...lines].join('\n');
  const link = document.createElement('a');
  link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
