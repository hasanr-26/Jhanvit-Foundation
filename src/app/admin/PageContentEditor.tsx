'use client';

import React, { useState } from 'react';
import {
  usePageContent,
  savePageContent,
  resetPageContent,
  exportPageContent,
  newId,
  DEFAULT_PAGE_CONTENT,
  type PageContent,
  type Pillar,
  type Initiative,
  type ServiceItem,
  type Testimonial,
  type Partner,
  type Principle,
  type CareerOpening,
  type Workshop,
  type SocialLink,
  type ProseBlock,
} from '@/lib/pageContent';
import {
  FieldLabel,
  TextInput,
  TextAreaInput,
  IconPicker,
  SectionCard,
  ListItemHeader,
  AddButton,
  BulletEditor,
} from './fields';
import {
  Layers,
  LayoutGrid,
  Newspaper,
  Info,
  Building2,
  Star,
  Presentation,
  GraduationCap,
  Briefcase,
  Share2,
  Handshake,
  RefreshCw,
  Download,
} from 'lucide-react';

/** Edits one Problem/Solution/Vision/Mission entry. */
function PillarEditor({
  pillar,
  onChange,
  onRemove,
}: {
  pillar: Pillar;
  onChange: (p: Pillar) => void;
  onRemove?: () => void;
}) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3">
      <ListItemHeader label={pillar.label || 'Tab'} onRemove={onRemove} />
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-3">
          <FieldLabel label="Icon" />
          <IconPicker value={pillar.icon} onChange={(icon) => onChange({ ...pillar, icon })} />
        </div>
        <div className="sm:col-span-3">
          <FieldLabel label="Tab label" />
          <TextInput
            value={pillar.label}
            onChange={(label) => onChange({ ...pillar, label })}
            placeholder="e.g. Problem"
          />
        </div>
        <div className="sm:col-span-6">
          <FieldLabel label="Headline" />
          <TextInput
            value={pillar.title}
            onChange={(title) => onChange({ ...pillar, title })}
            placeholder="Short sentence"
          />
        </div>
      </div>
      <div>
        <FieldLabel label="Paragraph" />
        <TextAreaInput
          value={pillar.body}
          onChange={(body) => onChange({ ...pillar, body })}
          rows={3}
        />
      </div>
      <BulletEditor
        value={pillar.points}
        onChange={(points) => onChange({ ...pillar, points })}
        hint="One per line, shown as a checklist beside the paragraph"
      />
    </div>
  );
}

function ProseEditor({ block, onChange }: { block: ProseBlock; onChange: (b: ProseBlock) => void }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <FieldLabel label="Small label above" />
          <TextInput
            value={block.eyebrow}
            onChange={(eyebrow) => onChange({ ...block, eyebrow })}
          />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel label="Heading" />
          <TextInput
            value={block.heading}
            onChange={(heading) => onChange({ ...block, heading })}
          />
        </div>
      </div>
      <div>
        <FieldLabel label="Paragraphs" hint="Leave a blank line between paragraphs" />
        <TextAreaInput
          value={block.paragraphs.join('\n\n')}
          onChange={(v) =>
            onChange({
              ...block,
              paragraphs: v
                .split(/\n\s*\n/)
                .map((p) => p.trim())
                .filter(Boolean),
            })
          }
          rows={7}
        />
      </div>
    </div>
  );
}

export default function PageContentEditor() {
  // Local draft, seeded from the live store and written back on Save.
  const stored = usePageContent();
  const [content, setContent] = useState<PageContent>(stored);
  const [savedSection, setSavedSection] = useState<string | null>(null);

  const save = (section: string) => {
    savePageContent(content);
    setSavedSection(section);
    setTimeout(() => setSavedSection(null), 2500);
  };

  const setHome = (fields: Partial<PageContent['home']>) =>
    setContent((c) => ({ ...c, home: { ...c.home, ...fields } }));
  const setAbout = (fields: Partial<PageContent['about']>) =>
    setContent((c) => ({ ...c, about: { ...c.about, ...fields } }));
  const setAnubhavv = (fields: Partial<PageContent['anubhavv']>) =>
    setContent((c) => ({ ...c, anubhavv: { ...c.anubhavv, ...fields } }));
  const setStudent = (fields: Partial<PageContent['student']>) =>
    setContent((c) => ({ ...c, student: { ...c.student, ...fields } }));
  const setCareers = (fields: Partial<PageContent['careers']>) =>
    setContent((c) => ({ ...c, careers: { ...c.careers, ...fields } }));

  /** Replace item `i` of a list with `next`, or drop it when `next` is null. */
  function replaceAt<T>(list: T[], i: number, next: T | null): T[] {
    if (next === null) return list.filter((_, idx) => idx !== i);
    return list.map((item, idx) => (idx === i ? next : item));
  }

  const handleReset = () => {
    if (
      window.confirm(
        'Reset ALL page text, services, testimonials, partners and openings back to the originals?'
      )
    ) {
      resetPageContent();
      setContent(DEFAULT_PAGE_CONTENT);
      setSavedSection('reset');
      setTimeout(() => setSavedSection(null), 2500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#0d1420] border border-white/5 text-white p-5 rounded-2xl">
        <div>
          <h2 className="text-lg font-extrabold text-white">Page Content</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            The words, icons and lists on the public pages. Save a section to publish it.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportPageContent}
            className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold px-3 py-2 rounded-xl transition"
          >
            <Download className="w-3.5 h-3.5" /> Backup JSON
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 bg-white/5 hover:bg-red-900/30 border border-white/10 hover:border-red-800 text-slate-400 hover:text-red-400 text-xs font-semibold px-3 py-2 rounded-xl transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* ── Homepage: pillars ── */}
      <SectionCard
        sectionKey="home-pillars"
        icon={<Layers className="w-4 h-4 text-[#0090b0]" />}
        title="Homepage — Problem / Solution / Vision / Mission"
        color="bg-[#0090b0]/10"
        onSave={() => save('home-pillars')}
        savedSection={savedSection}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <FieldLabel label="Section heading" />
            <TextInput
              value={content.home.pillarsHeading}
              onChange={(pillarsHeading) => setHome({ pillarsHeading })}
            />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel label="Section intro" />
            <TextInput
              value={content.home.pillarsIntro}
              onChange={(pillarsIntro) => setHome({ pillarsIntro })}
            />
          </div>
        </div>

        {content.home.pillars.map((pillar, i) => (
          <PillarEditor
            key={pillar.id}
            pillar={pillar}
            onChange={(next) => setHome({ pillars: replaceAt(content.home.pillars, i, next) })}
            onRemove={
              content.home.pillars.length > 1
                ? () => setHome({ pillars: replaceAt(content.home.pillars, i, null) })
                : undefined
            }
          />
        ))}
        <AddButton
          label="Add a tab"
          onClick={() =>
            setHome({
              pillars: [
                ...content.home.pillars,
                {
                  id: newId('pillar'),
                  icon: 'lightbulb',
                  label: 'New tab',
                  title: '',
                  body: '',
                  points: [],
                },
              ],
            })
          }
        />
      </SectionCard>

      {/* ── Homepage: initiatives ── */}
      <SectionCard
        sectionKey="home-initiatives"
        icon={<LayoutGrid className="w-4 h-4 text-emerald-400" />}
        title="Homepage — What We Do"
        color="bg-emerald-900/20"
        onSave={() => save('home-initiatives')}
        savedSection={savedSection}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <FieldLabel label="Section heading" />
            <TextInput
              value={content.home.initiativesHeading}
              onChange={(initiativesHeading) => setHome({ initiativesHeading })}
            />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel label="Section intro" />
            <TextInput
              value={content.home.initiativesIntro}
              onChange={(initiativesIntro) => setHome({ initiativesIntro })}
            />
          </div>
        </div>

        <p className="text-xs text-slate-500">
          The card marked &quot;featured&quot; is shown large on the left; the rest stack beside it.
          Add as many as you like.
        </p>

        {content.home.initiatives.map((item, i) => {
          const set = (fields: Partial<Initiative>) =>
            setHome({ initiatives: replaceAt(content.home.initiatives, i, { ...item, ...fields }) });
          return (
            <div key={item.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3">
              <ListItemHeader
                label={item.title || 'Initiative'}
                onRemove={() =>
                  setHome({ initiatives: replaceAt(content.home.initiatives, i, null) })
                }
              />
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-3">
                  <FieldLabel label="Icon" />
                  <IconPicker value={item.icon} onChange={(icon) => set({ icon })} />
                </div>
                <div className="sm:col-span-4">
                  <FieldLabel label="Badge" />
                  <TextInput value={item.badge} onChange={(badge) => set({ badge })} />
                </div>
                <div className="sm:col-span-5">
                  <FieldLabel label="Title" />
                  <TextInput value={item.title} onChange={(title) => set({ title })} />
                </div>
              </div>
              <div>
                <FieldLabel label="Description" />
                <TextAreaInput
                  value={item.description}
                  onChange={(description) => set({ description })}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-5">
                  <FieldLabel label="Image path" hint="A file in /public/images" />
                  <TextInput value={item.image} onChange={(image) => set({ image })} />
                </div>
                <div className="sm:col-span-3">
                  <FieldLabel label="Links to" />
                  <TextInput value={item.href} onChange={(href) => set({ href })} />
                </div>
                <div className="sm:col-span-4">
                  <FieldLabel label="Button text" />
                  <TextInput value={item.ctaText} onChange={(ctaText) => set({ ctaText })} />
                </div>
                <div className="sm:col-span-4">
                  <FieldLabel label="Small note beside button" />
                  <TextInput value={item.meta} onChange={(meta) => set({ meta })} />
                </div>
                <div className="sm:col-span-4">
                  <FieldLabel label="Location line (optional)" />
                  <TextInput value={item.location ?? ''} onChange={(location) => set({ location })} />
                </div>
                <div className="sm:col-span-4 flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.featured}
                      onChange={(e) => set({ featured: e.target.checked })}
                      className="w-3.5 h-3.5 accent-[#0090b0]"
                    />
                    <span className="text-xs font-semibold text-slate-400">Featured (large card)</span>
                  </label>
                </div>
              </div>
              <div>
                <FieldLabel
                  label="Stat boxes"
                  hint="One per line as value | label — e.g. 125 | Dedicated Desks"
                />
                <TextAreaInput
                  rows={4}
                  value={item.highlights.map((h) => `${h.value} | ${h.label}`).join('\n')}
                  onChange={(v) =>
                    set({
                      highlights: v
                        .split('\n')
                        .map((line) => line.split('|'))
                        .filter((parts) => parts[0]?.trim())
                        .map((parts) => ({
                          value: parts[0].trim(),
                          label: (parts[1] ?? '').trim(),
                        })),
                    })
                  }
                />
              </div>
            </div>
          );
        })}
        <AddButton
          label="Add an initiative"
          onClick={() =>
            setHome({
              initiatives: [
                ...content.home.initiatives,
                {
                  id: newId('init'),
                  icon: 'lightbulb',
                  badge: '',
                  title: 'New initiative',
                  description: '',
                  image: '/images/slide2.jpg',
                  href: '/contact',
                  ctaText: 'Learn more',
                  meta: '',
                  featured: false,
                  highlights: [],
                },
              ],
            })
          }
        />
      </SectionCard>

      {/* ── Homepage: news ── */}
      <SectionCard
        sectionKey="home-news"
        icon={<Newspaper className="w-4 h-4 text-violet-400" />}
        title="Homepage — News &amp; Updates"
        color="bg-violet-900/20"
        onSave={() => save('home-news')}
        savedSection={savedSection}
      >
        <p className="text-xs text-slate-500">
          The three most recent published articles are pulled in automatically. Only the heading and
          intro are set here.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <FieldLabel label="Heading" />
            <TextInput
              value={content.home.newsHeading}
              onChange={(newsHeading) => setHome({ newsHeading })}
            />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel label="Intro" />
            <TextInput value={content.home.newsIntro} onChange={(newsIntro) => setHome({ newsIntro })} />
          </div>
        </div>
      </SectionCard>

      {/* ── About: prose ── */}
      <SectionCard
        sectionKey="about-prose"
        icon={<Info className="w-4 h-4 text-[#0090b0]" />}
        title="About — Purpose &amp; Founder Story"
        color="bg-[#0090b0]/10"
        onSave={() => save('about-prose')}
        savedSection={savedSection}
      >
        <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wide">
          Ground reality &amp; purpose
        </h4>
        <ProseEditor block={content.about.intro} onChange={(intro) => setAbout({ intro })} />

        <div className="pt-4 border-t border-white/5 space-y-3">
          <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wide">
            Founder journey
          </h4>
          <ProseEditor block={content.about.founder} onChange={(founder) => setAbout({ founder })} />
        </div>
      </SectionCard>

      {/* ── About: principles ── */}
      <SectionCard
        sectionKey="about-principles"
        icon={<Star className="w-4 h-4 text-amber-400" />}
        title="About — Guiding Principles"
        color="bg-amber-900/20"
        onSave={() => save('about-principles')}
        savedSection={savedSection}
      >
        {content.about.principles.map((principle, i) => {
          const set = (fields: Partial<Principle>) =>
            setAbout({
              principles: replaceAt(content.about.principles, i, { ...principle, ...fields }),
            });
          return (
            <div
              key={principle.id}
              className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3"
            >
              <ListItemHeader
                label={principle.title || 'Principle'}
                onRemove={() =>
                  setAbout({ principles: replaceAt(content.about.principles, i, null) })
                }
              />
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-3">
                  <FieldLabel label="Icon" />
                  <IconPicker value={principle.icon} onChange={(icon) => set({ icon })} />
                </div>
                <div className="sm:col-span-9">
                  <FieldLabel label="Title" />
                  <TextInput value={principle.title} onChange={(title) => set({ title })} />
                </div>
              </div>
              <div>
                <FieldLabel label="Text" />
                <TextAreaInput value={principle.body} onChange={(body) => set({ body })} rows={2} />
              </div>
            </div>
          );
        })}
        <AddButton
          label="Add a principle"
          onClick={() =>
            setAbout({
              principles: [
                ...content.about.principles,
                { id: newId('prin'), icon: 'shield', title: 'New principle', body: '' },
              ],
            })
          }
        />
      </SectionCard>

      {/* ── About: partners ── */}
      <SectionCard
        sectionKey="about-partners"
        icon={<Handshake className="w-4 h-4 text-emerald-400" />}
        title="About — Partners &amp; Donors"
        color="bg-emerald-900/20"
        onSave={() => save('about-partners')}
        savedSection={savedSection}
      >
        <p className="text-xs text-slate-500">
          The section stays hidden on the website until you add the first logo. Put logo files in
          <span className="font-mono text-slate-400"> /public/images/</span> and reference them like
          <span className="font-mono text-slate-400"> /images/partner-name.png</span>, or paste a
          full URL. Leave the logo blank to show the name as text.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <FieldLabel label="Section heading" />
            <TextInput
              value={content.about.partnersHeading}
              onChange={(partnersHeading) => setAbout({ partnersHeading })}
            />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel label="Section intro" />
            <TextInput
              value={content.about.partnersIntro}
              onChange={(partnersIntro) => setAbout({ partnersIntro })}
            />
          </div>
        </div>

        {content.about.partners.map((partner, i) => {
          const set = (fields: Partial<Partner>) =>
            setAbout({ partners: replaceAt(content.about.partners, i, { ...partner, ...fields }) });
          return (
            <div
              key={partner.id}
              className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3"
            >
              <ListItemHeader
                label={partner.name || 'Logo'}
                onRemove={() => setAbout({ partners: replaceAt(content.about.partners, i, null) })}
              />
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-4">
                  <FieldLabel label="Name" />
                  <TextInput value={partner.name} onChange={(name) => set({ name })} />
                </div>
                <div className="sm:col-span-5">
                  <FieldLabel label="Logo path or URL" />
                  <TextInput value={partner.logoUrl} onChange={(logoUrl) => set({ logoUrl })} />
                </div>
                <div className="sm:col-span-3">
                  <FieldLabel label="Shown under" />
                  <select
                    value={partner.kind}
                    onChange={(e) => set({ kind: e.target.value as Partner['kind'] })}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-[#0d1420] text-white text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                  >
                    <option value="partner">Partners</option>
                    <option value="donor">Donors &amp; Supporters</option>
                  </select>
                </div>
                <div className="sm:col-span-12">
                  <FieldLabel label="Website (optional)" />
                  <TextInput
                    value={partner.website ?? ''}
                    onChange={(website) => set({ website })}
                    placeholder="https://"
                  />
                </div>
              </div>
            </div>
          );
        })}
        <AddButton
          label="Add a partner or donor"
          onClick={() =>
            setAbout({
              partners: [
                ...content.about.partners,
                { id: newId('partner'), name: '', logoUrl: '', website: '', kind: 'partner' },
              ],
            })
          }
        />
      </SectionCard>

      {/* ── ANUBHAVV: pillars ── */}
      <SectionCard
        sectionKey="anubhavv-pillars"
        icon={<Layers className="w-4 h-4 text-rose-400" />}
        title="ANUBHAVV — Problem / Solution / Vision / Mission"
        color="bg-rose-900/20"
        onSave={() => save('anubhavv-pillars')}
        savedSection={savedSection}
      >
        {content.anubhavv.pillars.map((pillar, i) => (
          <PillarEditor
            key={pillar.id}
            pillar={pillar}
            onChange={(next) =>
              setAnubhavv({ pillars: replaceAt(content.anubhavv.pillars, i, next) })
            }
            onRemove={
              content.anubhavv.pillars.length > 1
                ? () => setAnubhavv({ pillars: replaceAt(content.anubhavv.pillars, i, null) })
                : undefined
            }
          />
        ))}
        <AddButton
          label="Add a tab"
          onClick={() =>
            setAnubhavv({
              pillars: [
                ...content.anubhavv.pillars,
                {
                  id: newId('pillar'),
                  icon: 'lightbulb',
                  label: 'New tab',
                  title: '',
                  body: '',
                  points: [],
                },
              ],
            })
          }
        />
      </SectionCard>

      {/* ── ANUBHAVV: services ── */}
      <SectionCard
        sectionKey="anubhavv-services"
        icon={<Building2 className="w-4 h-4 text-[#0090b0]" />}
        title="ANUBHAVV — Services Provided"
        color="bg-[#0090b0]/10"
        onSave={() => save('anubhavv-services')}
        savedSection={savedSection}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <FieldLabel label="Section heading" />
            <TextInput
              value={content.anubhavv.servicesHeading}
              onChange={(servicesHeading) => setAnubhavv({ servicesHeading })}
            />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel label="Section intro" />
            <TextInput
              value={content.anubhavv.servicesIntro}
              onChange={(servicesIntro) => setAnubhavv({ servicesIntro })}
            />
          </div>
        </div>

        {content.anubhavv.services.map((service, i) => {
          const set = (fields: Partial<ServiceItem>) =>
            setAnubhavv({
              services: replaceAt(content.anubhavv.services, i, { ...service, ...fields }),
            });
          return (
            <div
              key={service.id}
              className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3"
            >
              <ListItemHeader
                label={service.title || 'Service'}
                onRemove={() =>
                  setAnubhavv({ services: replaceAt(content.anubhavv.services, i, null) })
                }
              />
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-3">
                  <FieldLabel label="Icon" />
                  <IconPicker value={service.icon} onChange={(icon) => set({ icon })} />
                </div>
                <div className="sm:col-span-9">
                  <FieldLabel label="Title" />
                  <TextInput value={service.title} onChange={(title) => set({ title })} />
                </div>
              </div>
              <div>
                <FieldLabel label="Description" />
                <TextAreaInput
                  value={service.description}
                  onChange={(description) => set({ description })}
                  rows={2}
                />
              </div>
            </div>
          );
        })}
        <AddButton
          label="Add a service"
          onClick={() =>
            setAnubhavv({
              services: [
                ...content.anubhavv.services,
                { id: newId('svc'), icon: 'building', title: 'New service', description: '' },
              ],
            })
          }
        />
      </SectionCard>

      {/* ── Testimonials ── */}
      <SectionCard
        sectionKey="testimonials"
        icon={<Star className="w-4 h-4 text-amber-400" />}
        title="Testimonials &amp; Consultation Counter"
        color="bg-amber-900/20"
        onSave={() => save('testimonials')}
        savedSection={savedSection}
      >
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6">
            <FieldLabel label="Section heading" />
            <TextInput
              value={content.anubhavv.testimonialsHeading}
              onChange={(testimonialsHeading) => setAnubhavv({ testimonialsHeading })}
            />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel label="Number" hint="Rolls up on scroll" />
            <TextInput
              value={content.anubhavv.consultationsDone}
              onChange={(consultationsDone) => setAnubhavv({ consultationsDone })}
              placeholder="e.g. 340"
            />
          </div>
          <div className="sm:col-span-4">
            <FieldLabel label="Number caption" />
            <TextInput
              value={content.anubhavv.consultationsLabel}
              onChange={(consultationsLabel) => setAnubhavv({ consultationsLabel })}
            />
          </div>
        </div>

        {content.anubhavv.testimonials.map((t, i) => {
          const set = (fields: Partial<Testimonial>) =>
            setAnubhavv({
              testimonials: replaceAt(content.anubhavv.testimonials, i, { ...t, ...fields }),
            });
          return (
            <div key={t.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3">
              <ListItemHeader
                label={t.name || 'Testimonial'}
                onRemove={() =>
                  setAnubhavv({ testimonials: replaceAt(content.anubhavv.testimonials, i, null) })
                }
              />
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-4">
                  <FieldLabel label="Name" />
                  <TextInput value={t.name} onChange={(name) => set({ name })} />
                </div>
                <div className="sm:col-span-4">
                  <FieldLabel label="Role / exam" />
                  <TextInput value={t.role} onChange={(role) => set({ role })} />
                </div>
                <div className="sm:col-span-4">
                  <FieldLabel label="Photo (optional)" />
                  <TextInput value={t.avatarUrl ?? ''} onChange={(avatarUrl) => set({ avatarUrl })} />
                </div>
              </div>
              <div>
                <FieldLabel label="Quote" />
                <TextAreaInput value={t.quote} onChange={(quote) => set({ quote })} rows={3} />
              </div>
            </div>
          );
        })}
        <AddButton
          label="Add a testimonial"
          onClick={() =>
            setAnubhavv({
              testimonials: [
                ...content.anubhavv.testimonials,
                { id: newId('tst'), name: '', role: '', quote: '' },
              ],
            })
          }
        />
      </SectionCard>

      {/* ── Workshops ── */}
      <SectionCard
        sectionKey="workshops"
        icon={<Presentation className="w-4 h-4 text-violet-400" />}
        title="Student Section — Workshops"
        color="bg-violet-900/20"
        onSave={() => save('workshops')}
        savedSection={savedSection}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <FieldLabel label="Heading" />
            <TextInput
              value={content.student.workshopsHeading}
              onChange={(workshopsHeading) => setStudent({ workshopsHeading })}
            />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel label="Intro" />
            <TextInput
              value={content.student.workshopsIntro}
              onChange={(workshopsIntro) => setStudent({ workshopsIntro })}
            />
          </div>
        </div>

        {content.student.workshops.map((workshop, i) => {
          const set = (fields: Partial<Workshop>) =>
            setStudent({
              workshops: replaceAt(content.student.workshops, i, { ...workshop, ...fields }),
            });
          return (
            <div
              key={workshop.id}
              className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3"
            >
              <ListItemHeader
                label={workshop.title || 'Workshop'}
                onRemove={() =>
                  setStudent({ workshops: replaceAt(content.student.workshops, i, null) })
                }
              />
              <div>
                <FieldLabel label="Title" />
                <TextInput value={workshop.title} onChange={(title) => set({ title })} />
              </div>
              <div>
                <FieldLabel label="What it covers" />
                <TextAreaInput
                  value={workshop.summary}
                  onChange={(summary) => set({ summary })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-4">
                  <FieldLabel label="Duration" />
                  <TextInput value={workshop.duration} onChange={(duration) => set({ duration })} />
                </div>
                <div className="sm:col-span-5">
                  <FieldLabel label="Fee" />
                  <TextInput value={workshop.fee} onChange={(fee) => set({ fee })} />
                </div>
                <div className="sm:col-span-3 flex items-end pb-2.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={workshop.active}
                      onChange={(e) => set({ active: e.target.checked })}
                      className="w-3.5 h-3.5 accent-[#0090b0]"
                    />
                    <span className="text-xs font-semibold text-slate-400">Listed on site</span>
                  </label>
                </div>
              </div>
            </div>
          );
        })}
        <AddButton
          label="Add a workshop"
          onClick={() =>
            setStudent({
              workshops: [
                ...content.student.workshops,
                {
                  id: newId('wsh'),
                  title: 'New workshop',
                  summary: '',
                  duration: '',
                  fee: '',
                  active: true,
                },
              ],
            })
          }
        />
      </SectionCard>

      {/* ── Fellowship ── */}
      <SectionCard
        sectionKey="fellowship"
        icon={<GraduationCap className="w-4 h-4 text-emerald-400" />}
        title="Student Section — Fellowship"
        color="bg-emerald-900/20"
        onSave={() => save('fellowship')}
        savedSection={savedSection}
      >
        <div>
          <FieldLabel label="Heading" />
          <TextInput
            value={content.student.fellowshipHeading}
            onChange={(fellowshipHeading) => setStudent({ fellowshipHeading })}
          />
        </div>
        <div>
          <FieldLabel label="Intro" />
          <TextAreaInput
            value={content.student.fellowshipIntro}
            onChange={(fellowshipIntro) => setStudent({ fellowshipIntro })}
            rows={3}
          />
        </div>
        <BulletEditor
          value={content.student.fellowshipPoints}
          onChange={(fellowshipPoints) => setStudent({ fellowshipPoints })}
          hint="What the fellowship includes — one per line"
        />
      </SectionCard>

      {/* ── Careers ── */}
      <SectionCard
        sectionKey="careers"
        icon={<Briefcase className="w-4 h-4 text-[#0090b0]" />}
        title="Contact — Careers"
        color="bg-[#0090b0]/10"
        onSave={() => save('careers')}
        savedSection={savedSection}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <FieldLabel label="Heading" />
            <TextInput value={content.careers.heading} onChange={(heading) => setCareers({ heading })} />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel label="Intro" />
            <TextInput value={content.careers.intro} onChange={(intro) => setCareers({ intro })} />
          </div>
        </div>
        <div>
          <FieldLabel
            label="Text shown when there are no openings"
            hint="Displayed instead of the list when nothing is active"
          />
          <TextAreaInput
            value={content.careers.noOpeningsNote}
            onChange={(noOpeningsNote) => setCareers({ noOpeningsNote })}
            rows={2}
          />
        </div>

        {content.careers.openings.map((opening, i) => {
          const set = (fields: Partial<CareerOpening>) =>
            setCareers({
              openings: replaceAt(content.careers.openings, i, { ...opening, ...fields }),
            });
          return (
            <div
              key={opening.id}
              className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3"
            >
              <ListItemHeader
                label={opening.title || 'Opening'}
                onRemove={() =>
                  setCareers({ openings: replaceAt(content.careers.openings, i, null) })
                }
              />
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-5">
                  <FieldLabel label="Role title" />
                  <TextInput value={opening.title} onChange={(title) => set({ title })} />
                </div>
                <div className="sm:col-span-3">
                  <FieldLabel label="Type" hint="e.g. Full time" />
                  <TextInput value={opening.type} onChange={(type) => set({ type })} />
                </div>
                <div className="sm:col-span-3">
                  <FieldLabel label="Location" />
                  <TextInput value={opening.location} onChange={(location) => set({ location })} />
                </div>
                <div className="sm:col-span-1 flex items-end pb-2.5">
                  <label className="flex items-center gap-2 cursor-pointer" title="Listed on site">
                    <input
                      type="checkbox"
                      checked={opening.active}
                      onChange={(e) => set({ active: e.target.checked })}
                      className="w-3.5 h-3.5 accent-[#0090b0]"
                    />
                    <span className="text-xs font-semibold text-slate-400 sm:hidden">Live</span>
                  </label>
                </div>
              </div>
              <div>
                <FieldLabel label="Description" />
                <TextAreaInput
                  value={opening.description}
                  onChange={(description) => set({ description })}
                  rows={2}
                />
              </div>
            </div>
          );
        })}
        <AddButton
          label="Add an opening"
          onClick={() =>
            setCareers({
              openings: [
                ...content.careers.openings,
                {
                  id: newId('job'),
                  title: 'New role',
                  type: 'Full time',
                  location: 'Sadashiv Peth, Pune',
                  description: '',
                  active: true,
                },
              ],
            })
          }
        />
      </SectionCard>

      {/* ── Socials ── */}
      <SectionCard
        sectionKey="socials"
        icon={<Share2 className="w-4 h-4 text-rose-400" />}
        title="Social Media Handles"
        color="bg-rose-900/20"
        onSave={() => save('socials')}
        savedSection={savedSection}
      >
        <p className="text-xs text-slate-500">
          Shown in the top bar, the mobile menu and the footer. Clear the URL to hide one.
        </p>
        {content.socials.map((social, i) => {
          const set = (fields: Partial<SocialLink>) =>
            setContent((c) => ({ ...c, socials: replaceAt(c.socials, i, { ...social, ...fields }) }));
          return (
            <div key={social.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-3">
                <FieldLabel label="Platform" />
                <select
                  value={social.platform}
                  onChange={(e) => set({ platform: e.target.value as SocialLink['platform'] })}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-[#0d1420] text-white text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                >
                  {['instagram', 'facebook', 'youtube', 'linkedin', 'twitter', 'telegram'].map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-8">
                <FieldLabel label="Profile URL" />
                <TextInput
                  value={social.url}
                  onChange={(url) => set({ url })}
                  placeholder="https://instagram.com/jhanvitfoundation"
                />
              </div>
              <div className="sm:col-span-1 pb-1">
                <button
                  onClick={() =>
                    setContent((c) => ({ ...c, socials: replaceAt(c.socials, i, null) }))
                  }
                  className="text-xs font-semibold text-slate-500 hover:text-red-400 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
        <AddButton
          label="Add a handle"
          onClick={() =>
            setContent((c) => ({
              ...c,
              socials: [...c.socials, { id: newId('soc'), platform: 'instagram', url: '' }],
            }))
          }
        />
      </SectionCard>
    </div>
  );
}
