'use client';

import React, { useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteContentEditor from './SiteContentEditor';
import PageContentEditor from './PageContentEditor';
import BlogEditor from './BlogEditor';
import SubmissionsTable from './SubmissionsTable';
import Overview from './Overview';
import { useBlogPosts } from '@/lib/blogData';
import { useSubmissions, countByKind, SUBMISSION_LABELS, type SubmissionKind } from '@/lib/submissions';
import {
  Lock,
  Eye,
  EyeOff,
  BookOpen,
  Building2,
  HeartHandshake,
  MessageSquare,
  Presentation,
  GraduationCap,
  LogOut,
  PencilRuler,
  LayoutDashboard,
  LayoutGrid,
  ChevronRight,
  ArrowUpRight,
  FileText,
  Menu,
  X,
} from 'lucide-react';

type Tab = SubmissionKind | 'overview' | 'blog' | 'site-content' | 'page-content';

const SESSION_KEY = 'jhanvit_admin_session';
// Client-side gate only — see BACKEND_ROADMAP.md for the real auth plan.
const PASSWORDS = ['jhanvit2026', 'admin'];

// Keeps the admin signed in across page reloads, and out again when the tab closes.
const sessionListeners = new Set<() => void>();
const session = {
  subscribe(listener: () => void) {
    sessionListeners.add(listener);
    return () => {
      sessionListeners.delete(listener);
    };
  },
  isActive: () => sessionStorage.getItem(SESSION_KEY) === 'active',
  serverValue: () => false,
  set(active: boolean) {
    if (active) sessionStorage.setItem(SESSION_KEY, 'active');
    else sessionStorage.removeItem(SESSION_KEY);
    sessionListeners.forEach((listener) => listener());
  },
};

// ─── Login Screen ────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (PASSWORDS.includes(password)) {
      onLogin();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0f1a]">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[55%] flex-col justify-between p-12 bg-[#0b1320] border-r border-white/5">
        <Image
          src="/images/jhanvit_logo_transparent.png"
          alt="Jhanvit Foundation"
          width={240}
          height={80}
          className="object-contain h-20 w-auto"
        />

        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-white leading-tight">
            Manage Jhanvit
            <br />
            <span className="text-[#0090b0]">Foundation</span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Submissions, bookings, sponsorship applications and every word of website content, in
            one place.
          </p>
        </div>

        <div className="text-xs text-slate-600">CIN: U85499PN2026NPL255094</div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-16">
        <div className="mb-8 lg:hidden">
          <Image
            src="/images/jhanvit_logo_transparent.png"
            alt="Jhanvit Foundation"
            width={180}
            height={60}
            className="h-14 w-auto object-contain"
          />
        </div>

        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-white">Welcome back</h2>
            <p className="text-slate-500 text-sm">Sign in to the admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="text-xs font-semibold text-slate-400">
                Admin Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPass ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 px-4 py-3 pr-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0090b0] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && <p className="text-xs text-red-400 pt-1">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={!password}
              className="w-full bg-[#0090b0] hover:bg-[#007894] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm"
            >
              <Lock className="w-4 h-4" />
              Sign In
            </button>
          </form>

          <Link
            href="/"
            className="flex items-center justify-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar Nav Item ────────────────────────────────────────────────────────────

function NavItem({
  icon,
  label,
  count,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all ${
        active ? 'bg-[#0090b0] text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
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

// ─── Dashboard ───────────────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const submissions = useSubmissions();
  const posts = useBlogPosts();
  const counts = countByKind(submissions);

  const submissionTabs: { id: SubmissionKind; icon: React.ReactNode }[] = [
    { id: 'consultation', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'seat', icon: <Building2 className="w-4 h-4" /> },
    { id: 'sponsorship', icon: <HeartHandshake className="w-4 h-4" /> },
    { id: 'workshop', icon: <Presentation className="w-4 h-4" /> },
    { id: 'fellowship', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'contact', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const titles: Record<Tab, string> = {
    overview: 'Dashboard',
    blog: 'Blog & Articles',
    'site-content': 'Site Settings',
    'page-content': 'Page Content',
    consultation: SUBMISSION_LABELS.consultation,
    seat: SUBMISSION_LABELS.seat,
    sponsorship: SUBMISSION_LABELS.sponsorship,
    workshop: SUBMISSION_LABELS.workshop,
    fellowship: SUBMISSION_LABELS.fellowship,
    contact: SUBMISSION_LABELS.contact,
  };

  const open = (tab: Tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  const sidebar = (
    <>
      <div className="px-5 py-5 border-b border-white/5 flex items-center justify-between">
        <div>
          <Image
            src="/images/jhanvit_logo_transparent.png"
            alt="Jhanvit Foundation"
            width={180}
            height={60}
            className="object-contain h-12 w-auto"
          />
          <p className="text-xs text-slate-600 mt-1 font-semibold">Admin Panel</p>
        </div>
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          className="lg:hidden text-slate-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <NavItem
          icon={<LayoutGrid className="w-4 h-4" />}
          label="Dashboard"
          active={activeTab === 'overview'}
          onClick={() => open('overview')}
        />

        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest px-3 pt-4 pb-2">
          Submissions
        </p>
        {submissionTabs.map((tab) => (
          <NavItem
            key={tab.id}
            icon={tab.icon}
            label={SUBMISSION_LABELS[tab.id]}
            count={counts[tab.id]}
            active={activeTab === tab.id}
            onClick={() => open(tab.id)}
          />
        ))}

        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest px-3 pt-4 pb-2">
          Content
        </p>
        <NavItem
          icon={<FileText className="w-4 h-4" />}
          label="Blog & Articles"
          count={posts.length}
          active={activeTab === 'blog'}
          onClick={() => open('blog')}
        />
        <NavItem
          icon={<LayoutDashboard className="w-4 h-4" />}
          label="Page Content"
          active={activeTab === 'page-content'}
          onClick={() => open('page-content')}
        />
        <NavItem
          icon={<PencilRuler className="w-4 h-4" />}
          label="Site Settings"
          active={activeTab === 'site-content'}
          onClick={() => open('site-content')}
        />
      </nav>

      <div className="p-3 border-t border-white/5 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-slate-300 hover:bg-white/5 transition"
        >
          <ArrowUpRight className="w-4 h-4" />
          View Website
        </Link>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-[#0a0f1a] text-white">
      {/* Sidebar — off-canvas below lg */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 flex-col border-r border-white/5 bg-[#0d1420]">
        {sidebar}
      </aside>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative w-72 max-w-[85vw] flex flex-col border-r border-white/5 bg-[#0d1420]">
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 overflow-auto">
        <header className="flex items-center justify-between gap-3 px-4 sm:px-8 py-4 border-b border-white/5 bg-[#0d1420]/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm text-slate-400 min-w-0">
              <span className="text-slate-600 hidden sm:inline">Jhanvit Foundation</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-700 hidden sm:inline" />
              <span className="text-white font-semibold truncate">{titles[activeTab]}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-8">
          {activeTab === 'overview' && <Overview onOpen={(kind) => setActiveTab(kind)} />}
          {activeTab === 'site-content' && <SiteContentEditor />}
          {activeTab === 'page-content' && <PageContentEditor />}
          {activeTab === 'blog' && <BlogEditor />}
          {submissionTabs.some((t) => t.id === activeTab) && (
            <SubmissionsTable kind={activeTab as SubmissionKind} />
          )}
        </div>
      </main>
    </div>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const isAuthenticated = useSyncExternalStore(
    session.subscribe,
    session.isActive,
    session.serverValue
  );

  return isAuthenticated ? (
    <Dashboard onLogout={() => session.set(false)} />
  ) : (
    <LoginScreen onLogin={() => session.set(true)} />
  );
}
