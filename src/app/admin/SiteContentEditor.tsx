'use client';

import React, { useState, useEffect } from 'react';
import {
  getSiteConfig,
  saveSiteConfig,
  SiteConfig,
  DEFAULT_SITE_CONFIG,
} from '@/lib/siteConfig';
import {
  BarChart3,
  Phone,
  Building2,
  Heart,
  Landmark,
  CheckCircle2,
  RefreshCw,
  Save,
  Info,
  Clock,
  Mail,
  MapPin,
  Hash,
  FileText,
  CalendarDays,
  ShieldCheck,
  IndianRupee,
  CreditCard,
  AlertTriangle,
} from 'lucide-react';

// ─── Reusable field components ────────────────────────────────────────────────

function FieldLabel({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="mb-1">
      <label className="block text-xs font-semibold text-slate-400">{label}</label>
      {hint && <p className="text-xs text-slate-600 mt-0.5">{hint}</p>}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  mono,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  mono?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-xs placeholder-slate-600 focus:ring-2 focus:ring-[#0090b0] focus:outline-none focus:bg-white/8 transition ${mono ? 'font-mono' : ''}`}
    />
  );
}

function TextAreaInput({
  value,
  onChange,
  placeholder,
  rows = 2,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-xs placeholder-slate-600 focus:ring-2 focus:ring-[#0090b0] focus:outline-none focus:bg-white/8 transition resize-none"
    />
  );
}

function SectionCard({
  icon,
  title,
  color,
  children,
  onSave,
  savedSection,
  sectionKey,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  children: React.ReactNode;
  onSave: () => void;
  savedSection: string | null;
  sectionKey: string;
}) {
  const isSaved = savedSection === sectionKey;
  return (
    <div className="bg-[#0d1420] rounded-2xl border border-white/5 overflow-hidden">
      <div className={`px-5 py-3.5 flex items-center gap-3 border-b border-white/5 ${color}`}>
        <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <h3 className="font-bold text-sm text-white">{title}</h3>
      </div>
      <div className="p-5 space-y-4">
        {children}
        <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/5">
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <Info className="w-3 h-3" /> Changes go live immediately on the website.
          </p>
          <button
            onClick={onSave}
            className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl shadow transition ${
              isSaved
                ? 'bg-emerald-500 text-white'
                : 'bg-[#0090b0] hover:bg-[#007894] text-white'
            }`}
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SiteContentEditor() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [savedSection, setSavedSection] = useState<string | null>(null);

  useEffect(() => {
    setConfig(getSiteConfig());
  }, []);

  const update = (fields: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...fields }));
  };

  const handleSave = (sectionKey: string) => {
    saveSiteConfig(config);
    setSavedSection(sectionKey);
    setTimeout(() => setSavedSection(null), 2500);
  };

  const handleReset = () => {
    if (
      window.confirm(
        'This will reset ALL site content to the original defaults. Are you sure?'
      )
    ) {
      setConfig(DEFAULT_SITE_CONFIG);
      saveSiteConfig(DEFAULT_SITE_CONFIG);
      setSavedSection('reset');
      setTimeout(() => setSavedSection(null), 2500);
    }
  };

  const updatePreset = (index: number, field: string, value: string | number | boolean) => {
    const presets = [...config.donationPresets];
    presets[index] = { ...presets[index], [field]: value };
    update({ donationPresets: presets });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#0d1420] border border-white/5 text-white p-5 rounded-2xl">
        <div>
          <h2 className="text-lg font-extrabold text-white">Edit Website Content</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Changes are saved to this browser and go live immediately across all pages.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 bg-white/5 hover:bg-red-900/30 border border-white/10 hover:border-red-800 text-slate-400 hover:text-red-400 text-xs font-semibold px-3 py-2 rounded-xl transition"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset All to Defaults
        </button>
      </div>

      {/* ── Section 1: Homepage Stats ── */}
      <SectionCard
        sectionKey="stats"
        icon={<BarChart3 className="w-4 h-4 text-[#0090b0]" />}
        title="Homepage Stats (Impact Numbers)"
        color="bg-[#0090b0]/10"
        onSave={() => handleSave('stats')}
        savedSection={savedSection}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <FieldLabel label="Aspirants Supported" hint='Shown as "120+" on the homepage banner' />
            <TextInput
              value={config.aspirantsSupported}
              onChange={(v) => update({ aspirantsSupported: v })}
              placeholder="e.g. 120+"
            />
          </div>
          <div>
            <FieldLabel label="Study Seats Available" hint="Total seat count shown on homepage" />
            <TextInput
              value={config.studySeatsAvailable}
              onChange={(v) => update({ studySeatsAvailable: v })}
              placeholder="e.g. 125"
            />
          </div>
          <div>
            <FieldLabel label="Year Founded" hint="Year shown in the homepage stat bar" />
            <TextInput
              value={config.yearFounded}
              onChange={(v) => update({ yearFounded: v })}
              placeholder="e.g. 2026"
            />
          </div>
        </div>
      </SectionCard>

      {/* ── Section 2: Contact Info ── */}
      <SectionCard
        sectionKey="contact"
        icon={<Phone className="w-4 h-4 text-emerald-400" />}
        title="Contact Information"
        color="bg-emerald-900/20"
        onSave={() => handleSave('contact')}
        savedSection={savedSection}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel label="Primary Phone Number" hint="Shown in Footer & Contact page" />
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <TextInput
                value={config.phone1}
                onChange={(v) => update({ phone1: v })}
                placeholder="e.g. 7066422555"
                mono
              />
            </div>
          </div>
          <div>
            <FieldLabel label="Secondary Phone Number" hint="Optional second number" />
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <TextInput
                value={config.phone2}
                onChange={(v) => update({ phone2: v })}
                placeholder="e.g. 9637502333"
                mono
              />
            </div>
          </div>
          <div>
            <FieldLabel label="Email Address" hint="Main contact email" />
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <TextInput
                value={config.email}
                onChange={(v) => update({ email: v })}
                placeholder="e.g. anubhavveducation@gmail.com"
              />
            </div>
          </div>
          <div>
            <FieldLabel label="Working Hours" hint="Shown in the Contact page info box" />
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-slate-400 flex-shrink-0 mt-2.5" />
              <TextAreaInput
                value={config.workingHours}
                onChange={(v) => update({ workingHours: v })}
                placeholder="e.g. Study Hall: Open 24x7. Office 9 AM – 8 PM."
              />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ── Section 3: Organisation Details ── */}
      <SectionCard
        sectionKey="org"
        icon={<Building2 className="w-4 h-4 text-violet-400" />}
        title="Organisation & Legal Details"
        color="bg-violet-900/20"
        onSave={() => handleSave('org')}
        savedSection={savedSection}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel label="Organisation Name" />
            <TextInput
              value={config.orgName}
              onChange={(v) => update({ orgName: v })}
              placeholder="Jhanvit Foundation"
            />
          </div>
          <div>
            <FieldLabel label="Legal Entity Type" />
            <TextInput
              value={config.legalEntityType}
              onChange={(v) => update({ legalEntityType: v })}
              placeholder="Section 8 Non-Profit..."
            />
          </div>
          <div>
            <FieldLabel label="Corporate Identification Number (CIN)" hint="21-character code from MCA" />
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <TextInput
                value={config.cin}
                onChange={(v) => update({ cin: v.toUpperCase() })}
                placeholder="U85499PN2026NPL255094"
                mono
              />
            </div>
          </div>
          <div>
            <FieldLabel label="PAN Number" hint="10-character Permanent Account Number" />
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <TextInput
                value={config.pan}
                onChange={(v) => update({ pan: v.toUpperCase() })}
                placeholder="AAHCJ3974C"
                mono
              />
            </div>
          </div>
          <div>
            <FieldLabel label="Date of Incorporation" />
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <TextInput
                value={config.dateOfIncorporation}
                onChange={(v) => update({ dateOfIncorporation: v })}
                placeholder="28 April 2026"
              />
            </div>
          </div>
          <div>
            <FieldLabel label="80G Tax Exemption Status" hint="Update once approved by IT dept." />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <TextInput
                value={config.taxExemptionStatus}
                onChange={(v) => update({ taxExemptionStatus: v })}
                placeholder="Registration in Process..."
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <FieldLabel label="Registered Office Address" hint="Legal address (Bibvewadi)" />
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-2.5" />
              <TextAreaInput
                value={config.registeredAddress}
                onChange={(v) => update({ registeredAddress: v })}
                placeholder="Chawl No. B-32/19, Upper Indira Nagar..."
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <FieldLabel label="Operational Study Center Address" hint="Where students physically visit (Sadashiv Peth)" />
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-2.5" />
              <TextAreaInput
                value={config.operationalAddress}
                onChange={(v) => update({ operationalAddress: v })}
                placeholder="2nd Floor, Above ICICI Bank..."
              />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ── Section 4: Donation Presets ── */}
      <SectionCard
        sectionKey="presets"
        icon={<Heart className="w-4 h-4 text-rose-400" />}
        title="Donation Preset Tiers"
        color="bg-rose-900/20"
        onSave={() => handleSave('presets')}
        savedSection={savedSection}
      >
        <p className="text-xs text-slate-400 bg-amber-900/20 border border-amber-800/40 rounded-xl px-3 py-2 flex gap-2 items-start">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
          These 4 tiers appear as clickable cards on the Donate page. The "Popular" badge is shown on the tier you mark as popular.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {config.donationPresets.map((preset, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wide">
                  Tier {i + 1}
                </span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preset.popular || false}
                    onChange={(e) => updatePreset(i, 'popular', e.target.checked)}
                    className="w-3.5 h-3.5 accent-[#0090b0]"
                  />
                  <span className="text-xs font-semibold text-slate-400">Most Popular Badge</span>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel label="Amount (₹)" />
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <input
                      type="number"
                      value={preset.amount}
                      onChange={(e) => updatePreset(i, 'amount', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-xs font-bold focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <FieldLabel label="Label" hint='e.g. "1 Full Month"' />
                  <TextInput
                    value={preset.label}
                    onChange={(v) => updatePreset(i, 'label', v)}
                    placeholder="1 Full Month Seat"
                  />
                </div>
              </div>
              <div>
                <FieldLabel label="Description" hint="Short impact description (1–2 lines)" />
                <TextAreaInput
                  value={preset.description}
                  onChange={(v) => updatePreset(i, 'description', v)}
                  placeholder="Sponsors 1 full month of study seat..."
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ── Section 5: Bank Details ── */}
      <SectionCard
        sectionKey="bank"
        icon={<Landmark className="w-4 h-4 text-amber-400" />}
        title="Bank Transfer Details"
        color="bg-amber-900/20"
        onSave={() => handleSave('bank')}
        savedSection={savedSection}
      >
        <p className="text-xs text-slate-400 bg-[#0090b0]/10 border border-[#0090b0]/20 rounded-xl px-3 py-2">
          These appear on the Donate page under &quot;Direct Bank Transfer&quot;. Keep these accurate and up to date.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel label="Account Name" />
            <TextInput
              value={config.bankAccountName}
              onChange={(v) => update({ bankAccountName: v })}
              placeholder="Jhanvit Foundation"
            />
          </div>
          <div>
            <FieldLabel label="Bank Name" />
            <TextInput
              value={config.bankName}
              onChange={(v) => update({ bankName: v })}
              placeholder="e.g. Bank of Maharashtra"
            />
          </div>
          <div>
            <FieldLabel label="Account Number" />
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <TextInput
                value={config.bankAccountNumber}
                onChange={(v) => update({ bankAccountNumber: v })}
                placeholder="e.g. 123456789012"
                mono
              />
            </div>
          </div>
          <div>
            <FieldLabel label="IFSC Code" />
            <TextInput
              value={config.bankIfscCode}
              onChange={(v) => update({ bankIfscCode: v.toUpperCase() })}
              placeholder="e.g. MAHB0001234"
              mono
            />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel label="UPI ID" hint="For GPay, PhonePe, Paytm QR scan" />
            <TextInput
              value={config.upiId}
              onChange={(v) => update({ upiId: v })}
              placeholder="e.g. jhanvitfoundation@ybl"
              mono
            />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
