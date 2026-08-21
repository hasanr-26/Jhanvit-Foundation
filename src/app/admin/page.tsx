'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteContentEditor from './SiteContentEditor';
import BlogEditor from './BlogEditor';
import { getBlogPosts } from '@/lib/blogData';
import {
  Lock,
  Eye,
  EyeOff,
  Download,
  BookOpen,
  Building2,
  HeartHandshake,
  MessageSquare,
  LogOut,
  PencilRuler,
  LayoutDashboard,
  ChevronRight,
  ArrowUpRight,
  FileText,
} from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────────
type Tab = 'consultations' | 'seats' | 'sponsorships' | 'contacts' | 'blog' | 'site-content';

// ─── Sample Data ────────────────────────────────────────────────────────────────
const CONSULTATIONS = [
  { id: 'CON-101', name: 'Rahul Deshmukh', phone: '9876543210', email: 'rahul@gmail.com', exam: 'UPSC', stage: 'Prelims prep', date: '2026-08-05', slot: '10:00 AM', status: 'Paid (₹199)' },
  { id: 'CON-102', name: 'Sneha Patil', phone: '9123456789', email: 'sneha@gmail.com', exam: 'MPSC', stage: 'Mains prep', date: '2026-08-06', slot: '02:00 PM', status: 'Paid (₹199)' },
  { id: 'CON-103', name: 'Amit Kulkarni', phone: '9988776655', email: 'amit@gmail.com', exam: 'Banking', stage: 'Just starting', date: '2026-08-07', slot: '05:00 PM', status: 'Pending' },
];
const SEATS = [
  { id: 'SEAT-1001', name: 'Vikram Joshi', phone: '9765432109', email: 'vikram@gmail.com', exam: 'UPSC', seatNo: 'S-14', amount: '₹2,200', date: '2026-07-27', status: 'Confirmed & Paid' },
  { id: 'SEAT-1002', name: 'Pooja Shinde', phone: '9890123456', email: 'pooja@gmail.com', exam: 'MPSC', seatNo: 'S-22', amount: '₹2,200', date: '2026-07-26', status: 'Confirmed & Paid' },
];
const SPONSORSHIPS = [
  { id: 'SPON-501', name: 'Ganesh More', phone: '9654321098', email: 'ganesh@gmail.com', exam: 'MPSC', income: 'Below ₹1.5L', age: '22', date: '2026-07-25', status: 'Under Review' },
  { id: 'SPON-502', name: 'Swati Pawar', phone: '9543210987', email: 'swati@gmail.com', exam: 'UPSC', income: '₹1.5L - ₹3.0L', age: '24', date: '2026-07-24', status: 'Approved' },
];
const MESSAGES = [
  { id: 'MSG-301', name: 'Anand Kumar', phone: '9432109876', email: 'anand@gmail.com', role: 'Donor', message: 'I want to donate ₹24,000 for a student annual seat.', date: '2026-07-27' },
  { id: 'MSG-302', name: 'Kavita Jadhav', phone: '9321098765', email: 'kavita@gmail.com', role: 'Aspirant', message: 'Is study hall open on Sundays?', date: '2026-07-26' },
];

// ─── Sidebar Nav Item ────────────────────────────────────────────────────────────
function NavItem({
  icon,
  label,
  count,
  active,
  accent,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  count?: number;
  active: boolean;
  accent: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all group ${
        active
          ? `${accent} text-white shadow-md`
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <span className="w-5 h-5 flex-shrink-0">{icon}</span>
      <span className="flex-1">{label}</span>
      {count !== undefined && (
        <span
          className={`text-xs font-bold px-1.5 py-0.5 rounded-md min-w-[22px] text-center ${
            active ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-500'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

// ─── Status Badge ────────────────────────────────────────────────────────────────
function Badge({ text }: { text: string }) {
  const lower = text.toLowerCase();
  if (lower.includes('paid') || lower.includes('confirmed') || lower.includes('approved'))
    return <span className="bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-lg text-xs">{text}</span>;
  if (lower.includes('pending') || lower.includes('review'))
    return <span className="bg-amber-100 text-amber-800 font-semibold px-2.5 py-1 rounded-lg text-xs">{text}</span>;
  return <span className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-lg text-xs">{text}</span>;
}

// ─── Export Helper ───────────────────────────────────────────────────────────────
function exportToCSV(data: Record<string, unknown>[], filename: string) {
  if (!data.length) return;
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map((obj) => Object.values(obj).map((v) => `"${v}"`).join(','));
  const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(csvContent));
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ─── Login Screen ────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (password === 'jhanvit2026' || password === 'admin') {
        onLogin();
      } else {
        setError('Incorrect password. Please try again.');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex bg-[#0a0f1a]">
      {/* Left Panel — Brand */}
      <div className="hidden lg:flex lg:w-[55%] flex-col justify-between p-12 relative overflow-hidden bg-gradient-to-br from-[#0a0f1a] via-[#0d1829] to-[#091520]">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#0090b0 1px, transparent 1px), linear-gradient(90deg, #0090b0 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#0090b0] rounded-full opacity-5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#f5b82e] rounded-full opacity-5 blur-[80px] pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <Image
            src="/images/jhanvit_logo_transparent.png"
            alt="Jhanvit Foundation"
            width={240}
            height={80}
            className="object-contain h-20 w-auto"
          />
        </div>

        {/* Center content */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#0090b0]/10 border border-[#0090b0]/20 text-[#0090b0] text-xs font-bold px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0090b0] animate-pulse" />
              Admin Control Panel
            </div>
            <h1 className="text-4xl font-extrabold text-white leading-tight">
              Manage Jhanvit<br />
              <span className="text-[#0090b0]">Foundation</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              View all submissions, bookings, sponsorship applications, and edit website content — all in one place.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-slate-600">
          Section 8 Non-Profit · CIN: U85499PN2026NPL255094
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-16">
        {/* Mobile logo */}
        <div className="mb-8 lg:hidden">
          <Image src="/images/jhanvit_logo_transparent.png" alt="Jhanvit Foundation" width={180} height={60} className="h-14 w-auto object-contain" />
        </div>

        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-white">Welcome back</h2>
            <p className="text-slate-500 text-sm">Sign in to the admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Admin Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 px-4 py-3 pr-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0090b0] focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && (
                <p className="text-xs text-red-400 flex items-center gap-1.5 pt-1">
                  <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-[#0090b0] hover:bg-[#007894] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-lg shadow-[#0090b0]/20"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <Link href="/" className="flex items-center justify-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition">
            <ArrowUpRight className="w-3.5 h-3.5" />
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('consultations');
  const [blogCount, setBlogCount] = useState(0);

  useEffect(() => {
    setBlogCount(getBlogPosts().length);
  }, [activeTab]);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number; accent: string }[] = [
    { id: 'consultations', label: 'Consultations', icon: <BookOpen className="w-4 h-4" />, count: CONSULTATIONS.length, accent: 'bg-[#0090b0]' },
    { id: 'seats', label: 'Seat Bookings', icon: <Building2 className="w-4 h-4" />, count: SEATS.length, accent: 'bg-[#801800]' },
    { id: 'sponsorships', label: 'Sponsorships', icon: <HeartHandshake className="w-4 h-4" />, count: SPONSORSHIPS.length, accent: 'bg-amber-600' },
    { id: 'contacts', label: 'Messages', icon: <MessageSquare className="w-4 h-4" />, count: MESSAGES.length, accent: 'bg-slate-600' },
    { id: 'blog', label: 'Blog & Articles', icon: <FileText className="w-4 h-4" />, count: blogCount, accent: 'bg-[#007085]' },
    { id: 'site-content', label: 'Edit Site Content', icon: <PencilRuler className="w-4 h-4" />, accent: 'bg-[#f5b82e]' },
  ];

  const handleExport = () => {
    if (activeTab === 'consultations') exportToCSV(CONSULTATIONS, 'Jhanvit_Consultations');
    if (activeTab === 'seats') exportToCSV(SEATS, 'ANUBHAVV_Seats');
    if (activeTab === 'sponsorships') exportToCSV(SPONSORSHIPS, 'Jhanvit_Sponsorships');
    if (activeTab === 'contacts') exportToCSV(MESSAGES, 'Jhanvit_Messages');
  };

  const activeTabInfo = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen flex bg-[#0a0f1a] text-white">

      {/* ── Sidebar ── */}
      <aside className="w-64 flex-shrink-0 flex flex-col border-r border-white/5 bg-[#0d1420]">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/5">
          <Image
            src="/images/jhanvit_logo_transparent.png"
            alt="Jhanvit Foundation"
            width={180}
            height={60}
            className="object-contain h-12 w-auto"
          />
          <p className="text-xs text-slate-600 mt-1 font-semibold uppercase tracking-widest">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-widest px-3 py-2">Submissions</p>
          {tabs.slice(0, 4).map((tab) => (
            <NavItem
              key={tab.id}
              icon={tab.icon}
              label={tab.label}
              count={tab.count}
              active={activeTab === tab.id}
              accent={tab.accent}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}

          <div className="pt-3 mt-3 border-t border-white/5">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-widest px-3 py-2">Content & Media</p>
            <NavItem
              icon={<FileText className="w-4 h-4" />}
              label="Blog & Articles"
              count={blogCount}
              active={activeTab === 'blog'}
              accent="bg-[#007085] text-white shadow-md"
              onClick={() => setActiveTab('blog')}
            />
          </div>

          <div className="pt-3 mt-3 border-t border-white/5">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-widest px-3 py-2">Settings</p>
            <NavItem
              icon={<PencilRuler className="w-4 h-4" />}
              label="Edit Site Content"
              active={activeTab === 'site-content'}
              accent="bg-[#f5b82e] text-slate-900"
              onClick={() => setActiveTab('site-content')}
            />
          </div>
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/5 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-slate-300 hover:bg-white/5 transition"
          >
            <LayoutDashboard className="w-4 h-4" />
            View Website
            <ArrowUpRight className="w-3.5 h-3.5 ml-auto" />
          </Link>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-auto">

        {/* Topbar */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-white/5 bg-[#0d1420]/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="text-slate-600">Jhanvit Foundation</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
            <span className="text-white font-semibold">{activeTabInfo.label}</span>
          </div>

          {activeTab !== 'site-content' && activeTab !== 'blog' && (
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold px-3 py-2 rounded-lg transition"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          )}
        </header>

        {/* Content area */}
        <div className="flex-1 p-8">
          {activeTab === 'site-content' ? (
            <SiteContentEditor />
          ) : activeTab === 'blog' ? (
            <BlogEditor />
          ) : (
            <div className="bg-[#0d1420] rounded-2xl border border-white/5 overflow-hidden">
              {/* Table */}
              {activeTab === 'consultations' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-white/5">
                      <tr>
                        {['ID', 'Name', 'Phone / Email', 'Exam & Stage', 'Preferred Slot', 'Status'].map((h) => (
                          <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {CONSULTATIONS.map((row) => (
                        <tr key={row.id} className="hover:bg-white/[0.02] transition">
                          <td className="px-5 py-4 font-mono text-xs text-[#0090b0] font-bold">{row.id}</td>
                          <td className="px-5 py-4 font-semibold text-white">{row.name}</td>
                          <td className="px-5 py-4 text-slate-400 text-xs">{row.phone}<br />{row.email}</td>
                          <td className="px-5 py-4 text-slate-300">{row.exam} <span className="text-slate-600">—</span> {row.stage}</td>
                          <td className="px-5 py-4 text-slate-400">{row.date} @ {row.slot}</td>
                          <td className="px-5 py-4"><Badge text={row.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'seats' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-white/5">
                      <tr>
                        {['ID', 'Name', 'Phone / Email', 'Seat & Exam', 'Amount Paid', 'Status'].map((h) => (
                          <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {SEATS.map((row) => (
                        <tr key={row.id} className="hover:bg-white/[0.02] transition">
                          <td className="px-5 py-4 font-mono text-xs text-red-400 font-bold">{row.id}</td>
                          <td className="px-5 py-4 font-semibold text-white">{row.name}</td>
                          <td className="px-5 py-4 text-slate-400 text-xs">{row.phone}<br />{row.email}</td>
                          <td className="px-5 py-4 text-slate-300 font-bold">{row.seatNo} <span className="text-slate-600 font-normal">({row.exam})</span></td>
                          <td className="px-5 py-4 text-emerald-400 font-bold">{row.amount}</td>
                          <td className="px-5 py-4"><Badge text={row.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'sponsorships' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-white/5">
                      <tr>
                        {['ID', 'Applicant', 'Phone / Email', 'Exam & Income', 'Date', 'Status'].map((h) => (
                          <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {SPONSORSHIPS.map((row) => (
                        <tr key={row.id} className="hover:bg-white/[0.02] transition">
                          <td className="px-5 py-4 font-mono text-xs text-amber-400 font-bold">{row.id}</td>
                          <td className="px-5 py-4 font-semibold text-white">{row.name} <span className="text-slate-600 font-normal text-xs">Age {row.age}</span></td>
                          <td className="px-5 py-4 text-slate-400 text-xs">{row.phone}<br />{row.email}</td>
                          <td className="px-5 py-4 text-slate-300">{row.exam} <span className="text-slate-600">—</span> {row.income}</td>
                          <td className="px-5 py-4 text-slate-400">{row.date}</td>
                          <td className="px-5 py-4"><Badge text={row.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'contacts' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-white/5">
                      <tr>
                        {['ID', 'Name', 'Role', 'Phone / Email', 'Message', 'Date'].map((h) => (
                          <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {MESSAGES.map((row) => (
                        <tr key={row.id} className="hover:bg-white/[0.02] transition">
                          <td className="px-5 py-4 font-mono text-xs text-slate-500 font-bold">{row.id}</td>
                          <td className="px-5 py-4 font-semibold text-white">{row.name}</td>
                          <td className="px-5 py-4"><span className="text-xs font-bold text-slate-400 bg-white/5 px-2 py-1 rounded-lg">{row.role}</span></td>
                          <td className="px-5 py-4 text-slate-400 text-xs">{row.phone}<br />{row.email}</td>
                          <td className="px-5 py-4 text-slate-400 text-xs max-w-xs leading-relaxed">{row.message}</td>
                          <td className="px-5 py-4 text-slate-500">{row.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return isAuthenticated
    ? <Dashboard onLogout={() => setIsAuthenticated(false)} />
    : <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
}
