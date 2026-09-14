'use client';

import React from 'react';
import { CheckCircle2, Save, Info, Trash2, Plus } from 'lucide-react';
import { ContentIcon, ICON_KEYS } from '@/lib/iconMap';
import type { IconKey } from '@/lib/pageContent';

// Shared form controls for the admin editors. Both SiteContentEditor and
// PageContentEditor render against the same dark panel styling.

export function FieldLabel({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="mb-1">
      <label className="block text-xs font-semibold text-slate-400">{label}</label>
      {hint && <p className="text-xs text-slate-600 mt-0.5">{hint}</p>}
    </div>
  );
}

export function TextInput({
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
      className={`w-full px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-xs placeholder-slate-600 focus:ring-2 focus:ring-[#0090b0] focus:outline-none transition ${
        mono ? 'font-mono' : ''
      }`}
    />
  );
}

export function TextAreaInput({
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
      className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-xs placeholder-slate-600 focus:ring-2 focus:ring-[#0090b0] focus:outline-none transition resize-y"
    />
  );
}

/** Picks one of the icons the public pages know how to render. */
export function IconPicker({
  value,
  onChange,
}: {
  value: IconKey;
  onChange: (v: IconKey) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-9 h-9 rounded-lg bg-[#0090b0]/15 text-[#0090b0] flex items-center justify-center flex-shrink-0">
        <ContentIcon name={value} className="w-4 h-4" />
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as IconKey)}
        className="w-full px-2 py-2.5 rounded-xl border border-white/10 bg-[#0d1420] text-white text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
      >
        {ICON_KEYS.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SectionCard({
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
              isSaved ? 'bg-emerald-500 text-white' : 'bg-[#0090b0] hover:bg-[#007894] text-white'
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

/** Header row for one item inside a repeatable list, with a remove button. */
export function ListItemHeader({
  label,
  onRemove,
}: {
  label: string;
  onRemove?: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wide">{label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-red-400 transition"
        >
          <Trash2 className="w-3.5 h-3.5" /> Remove
        </button>
      )}
    </div>
  );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-xs font-bold text-[#0090b0] hover:text-white border border-dashed border-[#0090b0]/40 hover:border-[#0090b0] hover:bg-[#0090b0]/10 px-4 py-2.5 rounded-xl transition w-full justify-center"
    >
      <Plus className="w-3.5 h-3.5" /> {label}
    </button>
  );
}

/** Edits a newline-separated list of short strings as one textarea. */
export function BulletEditor({
  value,
  onChange,
  hint,
  rows = 4,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  hint?: string;
  rows?: number;
}) {
  return (
    <div>
      <FieldLabel label="Bullet points" hint={hint ?? 'One per line'} />
      <TextAreaInput
        value={value.join('\n')}
        onChange={(v) => onChange(v.split('\n').map((line) => line.trim()).filter(Boolean))}
        rows={rows}
      />
    </div>
  );
}
