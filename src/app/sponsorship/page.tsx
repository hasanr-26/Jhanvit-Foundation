'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { CheckCircle2, ShieldCheck, GraduationCap, HeartHandshake, Presentation } from 'lucide-react';
import { usePageContent } from '@/lib/pageContent';
import { addSubmission } from '@/lib/submissions';

type Tab = 'sponsorship' | 'workshops' | 'fellowship';

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#007085] focus:outline-none';

function Done({ name, message, onReset }: { name: string; message: string; onReset: () => void }) {
  return (
    <div className="text-center py-10 space-y-4">
      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <h3 className="text-2xl font-extrabold text-slate-900">Application received</h3>
      <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
        Thank you {name}. {message}
      </p>
      <button
        onClick={onReset}
        className="bg-slate-900 text-white text-sm font-bold px-6 py-3 rounded-xl"
      >
        Submit another application
      </button>
    </div>
  );
}

// ─── Sponsorship ──────────────────────────────────────────────────────────────

function SponsorshipTab() {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    age: '',
    exam: 'UPSC',
    prepDuration: '',
    income: 'Below ₹1.5 Lakhs',
    reason: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    addSubmission('sponsorship', {
      name: form.fullName,
      phone: form.phone,
      email: form.email,
      details: {
        Age: form.age,
        Exam: form.exam,
        Income: form.income,
        Preparation: form.prepDuration,
        Reason: form.reason,
      },
    });
    setSubmitting(false);
    setDone(true);
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            Zero Cost Access to ANUBHAVV Study Hall
          </h2>
          <p className="text-slate-700 text-base leading-relaxed">
            Jhanvit Foundation collects donations from well-wishers and uses that money to sponsor
            study hall seats for aspirants who genuinely cannot afford the monthly fee.
          </p>
          <p className="text-slate-700 text-base leading-relaxed">
            If selected, <strong>Jhanvit Foundation pays your fee directly to ANUBHAVV Impact
            Labs</strong> on your behalf. You get full 24x7 study hall access at no cost to you.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-lg space-y-4">
          <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-600" /> Eligibility Criteria
          </h3>
          <ul className="space-y-3 text-sm text-slate-700">
            {[
              'Annual family income below ₹3.0 Lakhs per annum.',
              'Actively preparing for UPSC, MPSC, or an equivalent competitive exam.',
              'A clear preparation timeline and commitment to study regularly.',
              'Not already holding a sponsored seat from another NGO for the same purpose.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 max-w-4xl mx-auto w-full">
        {done ? (
          <Done
            name={form.fullName}
            message="Our team reviews sponsorship applications within 7 working days and will reach out on the number you gave us."
            onReset={() => setDone(false)}
          />
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-2xl font-bold text-slate-900">Apply for Sponsorship</h3>
              <p className="text-sm text-slate-500 mt-1">
                Free to apply. Applications are reviewed within 7 working days.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pooja Deshmukh"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Age *</label>
                <input
                  type="number"
                  required
                  min={16}
                  max={60}
                  placeholder="e.g. 23"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  title="10 digit mobile number"
                  placeholder="e.g. 9876543210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="pooja@gmail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Exam Target *</label>
                <select
                  value={form.exam}
                  onChange={(e) => setForm({ ...form, exam: e.target.value })}
                  className={`${inputClass} bg-white`}
                >
                  <option value="UPSC">UPSC Civil Services</option>
                  <option value="MPSC">MPSC Rajyaseva / Combined</option>
                  <option value="Banking">Banking (IBPS / SBI)</option>
                  <option value="SSC">SSC CGL / CHSL</option>
                  <option value="Other">Other Competitive Exam</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Annual Family Income *
                </label>
                <select
                  value={form.income}
                  onChange={(e) => setForm({ ...form, income: e.target.value })}
                  className={`${inputClass} bg-white`}
                >
                  <option value="Below ₹1.5 Lakhs">Below ₹1.5 Lakhs</option>
                  <option value="₹1.5 Lakhs - ₹3.0 Lakhs">₹1.5 Lakhs - ₹3.0 Lakhs</option>
                  <option value="Above ₹3.0 Lakhs">Above ₹3.0 Lakhs</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preparation Duration
              </label>
              <input
                type="text"
                placeholder="e.g. 1 year of self study in Pune"
                value={form.prepDuration}
                onChange={(e) => setForm({ ...form, prepDuration: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Why do you need a sponsorship? *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe your family background, financial constraints, and commitment to studies..."
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Upload Income Proof (PDF/JPG, max 5MB)
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#f5b82e] hover:bg-amber-400 disabled:opacity-60 text-[#0f172a] font-extrabold py-4 rounded-xl shadow-lg transition text-sm"
            >
              {submitting ? 'Submitting…' : 'Submit Application (Free)'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Workshops ────────────────────────────────────────────────────────────────

function WorkshopsTab() {
  const { student } = usePageContent();
  const workshops = student.workshops.filter((w) => w.active);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    workshop: workshops[0]?.title ?? '',
    exam: 'UPSC',
  });
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addSubmission('workshop', {
      name: form.fullName,
      phone: form.phone,
      email: form.email,
      details: { Workshop: form.workshop, Exam: form.exam },
    });
    setDone(true);
  };

  return (
    <div className="space-y-10">
      <div className="max-w-3xl space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {student.workshopsHeading}
        </h2>
        <p className="text-slate-700 text-base leading-relaxed">{student.workshopsIntro}</p>
      </div>

      {workshops.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workshops.map((workshop) => (
            <div
              key={workshop.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-4"
            >
              <div className="w-11 h-11 rounded-xl bg-cyan-50 text-[#007085] flex items-center justify-center">
                <Presentation className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 leading-snug">{workshop.title}</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{workshop.summary}</p>
              <dl className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-sm">
                <div>
                  <dt className="text-xs text-slate-500 font-semibold">Duration</dt>
                  <dd className="text-slate-800 font-medium">{workshop.duration}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500 font-semibold">Fee</dt>
                  <dd className="text-slate-800 font-medium">{workshop.fee}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 max-w-3xl mx-auto w-full">
        {done ? (
          <Done
            name={form.fullName}
            message="We will confirm your seat on WhatsApp once the next batch date is fixed."
            onReset={() => setDone(false)}
          />
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-2xl font-bold text-slate-900">Apply for a Workshop</h3>
              <p className="text-sm text-slate-500 mt-1">
                Seats are limited. We confirm by WhatsApp before each batch.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Workshop *</label>
              <select
                required
                value={form.workshop}
                onChange={(e) => setForm({ ...form, workshop: e.target.value })}
                className={`${inputClass} bg-white`}
              >
                {workshops.map((w) => (
                  <option key={w.id} value={w.title}>
                    {w.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Sagar Jadhav"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  title="10 digit mobile number"
                  placeholder="e.g. 9876543210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="sagar@gmail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Exam you are preparing for *
              </label>
              <select
                value={form.exam}
                onChange={(e) => setForm({ ...form, exam: e.target.value })}
                className={`${inputClass} bg-white`}
              >
                <option value="UPSC">UPSC Civil Services</option>
                <option value="MPSC">MPSC Rajyaseva / Combined</option>
                <option value="Banking">Banking (IBPS / SBI)</option>
                <option value="SSC">SSC CGL / CHSL</option>
                <option value="Other">Other Competitive Exam</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#007085] hover:bg-[#005c6d] text-white font-bold py-4 rounded-xl shadow-lg transition text-sm"
            >
              Apply for this Workshop
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Fellowship ───────────────────────────────────────────────────────────────

function FellowshipTab() {
  const { student } = usePageContent();
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    exam: 'UPSC',
    attempts: '',
    why: '',
  });
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addSubmission('fellowship', {
      name: form.fullName,
      phone: form.phone,
      email: form.email,
      details: { Exam: form.exam, Attempts: form.attempts, Motivation: form.why },
    });
    setDone(true);
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-[#007085] flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {student.fellowshipHeading}
          </h2>
          <p className="text-slate-700 text-base leading-relaxed">{student.fellowshipIntro}</p>
        </div>

        <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-lg space-y-4">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            What the fellowship includes
          </h3>
          <ul className="space-y-3 text-sm text-slate-700">
            {student.fellowshipPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 max-w-3xl mx-auto w-full">
        {done ? (
          <Done
            name={form.fullName}
            message="Fellowship applications are reviewed at the end of every month. We will contact shortlisted candidates for an interview."
            onReset={() => setDone(false)}
          />
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-2xl font-bold text-slate-900">Apply for the Fellowship</h3>
              <p className="text-sm text-slate-500 mt-1">
                Reviewed monthly. Shortlisted applicants are called for an interview.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Nikhil Sawant"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  title="10 digit mobile number"
                  placeholder="e.g. 9876543210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="nikhil@gmail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Exam *</label>
                <select
                  value={form.exam}
                  onChange={(e) => setForm({ ...form, exam: e.target.value })}
                  className={`${inputClass} bg-white`}
                >
                  <option value="UPSC">UPSC Civil Services</option>
                  <option value="MPSC">MPSC Rajyaseva / Combined</option>
                  <option value="Other">Other Competitive Exam</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Attempts so far *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1 prelims attempt in 2025"
                  value={form.attempts}
                  onChange={(e) => setForm({ ...form, attempts: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Why do you want this fellowship? *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tell us how you would use the year and what you can contribute..."
                value={form.why}
                onChange={(e) => setForm({ ...form, why: e.target.value })}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#007085] hover:bg-[#005c6d] text-white font-bold py-4 rounded-xl shadow-lg transition text-sm"
            >
              Submit Fellowship Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'sponsorship', label: 'Sponsorship', icon: <HeartHandshake className="w-4 h-4" /> },
  { id: 'workshops', label: 'Workshops', icon: <Presentation className="w-4 h-4" /> },
  { id: 'fellowship', label: 'Fellowship', icon: <GraduationCap className="w-4 h-4" /> },
];

export default function StudentSectionPage() {
  const [tab, setTab] = useState<Tab>('sponsorship');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <section className="bg-[#007085] text-white pt-28 sm:pt-32 pb-16 px-4 sm:px-6 border-b-4 border-[#005e70]">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Student Section</h1>
          <p className="max-w-2xl mx-auto text-cyan-50 text-base">
            Sponsorship, workshops and the Jhanvit fellowship — everything an aspirant can apply for,
            in one place.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-16 sm:top-[72px] z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 overflow-x-auto no-scrollbar">
          {TABS.map((item) => {
            const isActive = tab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                aria-current={isActive}
                className={`flex items-center gap-2 px-5 sm:px-7 py-4 text-sm sm:text-base font-bold whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? 'border-[#007085] text-[#007085]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {tab === 'sponsorship' && <SponsorshipTab />}
        {tab === 'workshops' && <WorkshopsTab />}
        {tab === 'fellowship' && <FellowshipTab />}
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
