// pageContent.ts — Editable narrative content for the public pages.
// siteConfig.ts holds org/contact/donation facts; this file holds the writing:
// the problem/solution/vision/mission blocks, services, testimonials, partner
// logos, social handles and career openings. All of it is edited from /admin
// and persisted in localStorage, same pattern as siteConfig and blogData.

import { createClientStore } from './clientStore';

/** Icon keys resolved through ICON_MAP in components. Keep in sync with iconMap.ts */
export type IconKey =
  | 'alert'
  | 'target'
  | 'eye'
  | 'flag'
  | 'book'
  | 'building'
  | 'users'
  | 'heart'
  | 'shield'
  | 'clock'
  | 'wifi'
  | 'lock'
  | 'map'
  | 'award'
  | 'chart'
  | 'file'
  | 'coffee'
  | 'lightbulb';

export interface Pillar {
  id: string;
  icon: IconKey;
  label: string;
  title: string;
  body: string;
  points: string[];
}

/** One card in the "what we do" grid on the homepage. */
export interface Initiative {
  id: string;
  icon: IconKey;
  badge: string;
  title: string;
  description: string;
  image: string;
  href: string;
  ctaText: string;
  meta: string;
  location?: string;
  featured: boolean;
  highlights: { value: string; label: string }[];
}

export interface ServiceItem {
  id: string;
  icon: IconKey;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatarUrl?: string;
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  website?: string;
  kind: 'partner' | 'donor';
}

export interface SocialLink {
  id: string;
  platform: 'instagram' | 'facebook' | 'youtube' | 'linkedin' | 'twitter' | 'telegram';
  url: string;
}

export interface CareerOpening {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  active: boolean;
}

export interface Workshop {
  id: string;
  title: string;
  summary: string;
  duration: string;
  fee: string;
  active: boolean;
}

export interface Principle {
  id: string;
  icon: IconKey;
  title: string;
  body: string;
}

/** A block of prose the admin can rewrite without touching code. */
export interface ProseBlock {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
}

export interface PageContent {
  home: {
    pillarsHeading: string;
    pillarsIntro: string;
    pillars: Pillar[];
    initiativesHeading: string;
    initiativesIntro: string;
    initiatives: Initiative[];
    newsHeading: string;
    newsIntro: string;
  };
  about: {
    intro: ProseBlock;
    founder: ProseBlock;
    principles: Principle[];
    partnersHeading: string;
    partnersIntro: string;
    partners: Partner[];
  };
  anubhavv: {
    pillars: Pillar[];
    servicesHeading: string;
    servicesIntro: string;
    services: ServiceItem[];
    testimonialsHeading: string;
    consultationsDone: string;
    consultationsLabel: string;
    testimonials: Testimonial[];
  };
  student: {
    workshopsHeading: string;
    workshopsIntro: string;
    workshops: Workshop[];
    fellowshipHeading: string;
    fellowshipIntro: string;
    fellowshipPoints: string[];
  };
  careers: {
    heading: string;
    intro: string;
    openings: CareerOpening[];
    noOpeningsNote: string;
  };
  socials: SocialLink[];
}

export const DEFAULT_PAGE_CONTENT: PageContent = {
  home: {
    pillarsHeading: 'Why Jhanvit Exists',
    pillarsIntro:
      'The gap we saw on the ground, what we built to close it, and where we are headed.',
    pillars: [
      {
        id: 'problem',
        icon: 'alert',
        label: 'Problem',
        title: 'Hard work is not the missing piece',
        body: 'Thousands of students move to the city each year to prepare for UPSC and MPSC. Most of them do not fail for lack of effort. They fail because they have nowhere quiet to sit, no one honest to ask, and no money left after rent and coaching fees.',
        points: [
          'Reading rooms are crowded, noisy and shut by 10 PM',
          'Guidance usually comes bundled with something to sell',
          'A seat costs more than many families can spare each month',
        ],
      },
      {
        id: 'solution',
        icon: 'target',
        label: 'Solution',
        title: 'A desk, a mentor, and a way to pay for both',
        body: 'We run a 24x7 study hall with individual desks, offer one-on-one diagnostic guidance with nothing attached to it, and use donor money to pay the seat fees of students who cannot.',
        points: [
          'Individual desks with power, lighting and lockers, open round the clock',
          'One-on-one sessions that audit your syllabus and past attempts',
          'Sponsored seats funded entirely by donors, paid directly to the hall',
        ],
      },
      {
        id: 'vision',
        icon: 'eye',
        label: 'Vision',
        title: 'Preparation that does not depend on your bank balance',
        body: 'A student from a farming family should sit down to study with the same desk, the same light and the same advice as anyone else in the city.',
        points: [
          'Every serious aspirant within reach of a proper study seat',
          'Guidance judged on how honest it is, not what it sells',
          'A peer group that keeps people going through the long years',
        ],
      },
      {
        id: 'mission',
        icon: 'flag',
        label: 'Mission',
        title: 'What we are doing about it right now',
        body: 'Run the hall well, keep the guidance free of commercial interest, and account for every rupee a donor gives us.',
        points: [
          'Keep the study hall running 24x7 without cutting corners',
          'Sponsor more seats each year through verified applications',
          'Publish where donor money went and which student it reached',
        ],
      },
    ],
    initiativesHeading: 'How Jhanvit Foundation Supports Aspirants',
    initiativesIntro:
      'Three things we do, and the specific problem each one solves for a student preparing full time.',
    initiatives: [
      {
        id: 'init-hall',
        icon: 'building',
        badge: 'Physical Facility • 24x7',
        title: 'ANUBHAVV Abhyasika & Study Space',
        description:
          'A distraction-free study environment built for aspirants putting in 10 to 14 hours a day for UPSC, MPSC and state examinations.',
        image: '/images/facility/facility_cubicles.jpg',
        href: '/anubhavv',
        ctaText: 'Explore Hall & Seats',
        meta: 'Sadashiv Peth Facility',
        location: 'Sadashiv Peth, Pune',
        featured: true,
        highlights: [
          { value: '125', label: 'Dedicated Desks' },
          { value: 'Dual ISP', label: 'Failover WiFi' },
          { value: '9 HD', label: 'CCTV Cameras' },
          { value: '24x7', label: 'Biometric Access' },
        ],
      },
      {
        id: 'init-consult',
        icon: 'book',
        badge: 'Mentorship',
        title: '1-on-1 Diagnostic Consultation',
        description:
          'Exam-specific strategy, a syllabus audit, booklist corrections and a timetable built around the hours you actually have.',
        image: '/images/slide2.jpg',
        href: '/consultation',
        ctaText: 'Book Consultation',
        meta: 'UPSC / MPSC',
        featured: false,
        highlights: [],
      },
      {
        id: 'init-sponsor',
        icon: 'heart',
        badge: 'Financial Aid',
        title: 'Student Seat Sponsorship',
        description:
          'Donor money pays the study hall fee directly for aspirants from low-income families. Nothing is deducted along the way.',
        image: '/images/slide4.jpg',
        href: '/sponsorship',
        ctaText: 'Apply or Sponsor',
        meta: '100% Direct Aid',
        featured: false,
        highlights: [],
      },
    ],
    newsHeading: 'News & Updates',
    newsIntro:
      'Notes on exam strategy, what is happening at the study hall, and stories from students we work with.',
  },
  about: {
    intro: {
      eyebrow: 'Our Ground Reality & Purpose',
      heading: 'What Actually Stops Aspirants in Sadashiv Peth',
      paragraphs: [
        'Every year, tens of thousands of young aspirants move to Sadashiv Peth, Navi Peth and the surrounding areas to prepare for UPSC, MPSC and state civil services.',
        'The biggest challenge they face is rarely a lack of intelligence or discipline. It is the absence of an affordable, quiet, 24x7 study environment, personalised direction, and financial security through a preparation that runs for years.',
      ],
    },
    founder: {
      eyebrow: 'Founder Journey',
      heading: 'Understanding the Preparation Journey from Within',
      paragraphs: [
        'Ganesh prepared for UPSC Civil Services for 4 years at Jnana Prabodhini, Pune. Having lived through the isolation, uncertainty and daily discipline the exam demands, he saw how many capable students drop out simply for want of a structured space and proper mentorship.',
        'After serving as a Fellow and Program Manager with Teach For India (Cohort 2023), managing educational initiatives across 500+ government schools in Maharashtra, he founded Jhanvit Foundation to put affordable preparation infrastructure within reach of grassroots youth.',
      ],
    },
    principles: [
      {
        id: 'equal-access',
        icon: 'users',
        title: 'Equal Access',
        body: 'A quiet desk and honest guidance should not be limited to students who can afford ₹3,000+ a month for a private cubicle.',
      },
      {
        id: 'transparency',
        icon: 'chart',
        title: '100% Aid Transparency',
        body: 'Every donor contribution is mapped to a named student, with attendance and progress tracked and reported back.',
      },
      {
        id: 'no-bias',
        icon: 'shield',
        title: 'Zero Commercial Bias',
        body: 'Consultations are diagnostic only. We do not sell study material, test series or third-party coaching.',
      },
      {
        id: 'dignity',
        icon: 'heart',
        title: 'Dignity & Peer Culture',
        body: 'Sponsored students get the same desk and the same facilities as everyone else. Nobody is marked out.',
      },
    ],
    partnersHeading: 'Partners & Supporters',
    partnersIntro:
      'Organisations and individuals backing the work. Logos are added here as partnerships are confirmed.',
    partners: [],
  },
  anubhavv: {
    pillars: [
      {
        id: 'problem',
        icon: 'alert',
        label: 'Problem',
        title: 'Most reading halls are not built for 12-hour days',
        body: 'Shared benches, one overloaded Wi-Fi router, fans instead of ventilation, and a shutter that comes down at night. Students lose hours to noise and interruptions they cannot control.',
        points: [
          'Crowded benches with no privacy or personal storage',
          'Power cuts and dead Wi-Fi in the middle of a mock test',
          'Closing hours that cut the night study block short',
        ],
      },
      {
        id: 'solution',
        icon: 'target',
        label: 'Solution',
        title: 'A hall designed around the way aspirants actually study',
        body: 'ANUBHAVV Abhyasika gives every student a partitioned desk with its own light, power point and locker, backed by dual-ISP internet and biometric access at any hour.',
        points: [
          '125 individual cubicles with three-sided acoustic partitions',
          'Dual-ISP 300 Mbps fibre with automatic failover',
          '24x7 biometric entry, 9 HD cameras and RO drinking water',
        ],
      },
      {
        id: 'vision',
        icon: 'eye',
        label: 'Vision',
        title: 'The default place to study in the city',
        body: 'A hall where turning up at 4 AM is normal, where the person next to you is as serious as you are, and where nothing about the room is working against you.',
        points: [
          'A silent floor that stays silent all day',
          'Facilities maintained to the same standard every month',
          'A peer group that raises the baseline for everyone in it',
        ],
      },
      {
        id: 'mission',
        icon: 'flag',
        label: 'Mission',
        title: 'Keep it running and keep it affordable',
        body: 'Hold the fee at a level working families can manage, maintain the infrastructure properly, and keep a share of seats reserved for sponsored students.',
        points: [
          'Transparent monthly pricing with no hidden charges',
          'Reserved seats for Jhanvit-sponsored aspirants',
          'Upkeep of power, internet, hygiene and security without compromise',
        ],
      },
    ],
    servicesHeading: 'What You Get With a Seat',
    servicesIntro: 'Everything included in the monthly fee, with nothing billed separately.',
    services: [
      {
        id: 'svc-desk',
        icon: 'building',
        title: 'Your Own Partitioned Desk',
        description:
          'A 2.5 ft cubicle with three-sided wooden partitions, a dedicated power point and non-glare task lighting.',
      },
      {
        id: 'svc-hours',
        icon: 'clock',
        title: '24x7 Biometric Access',
        description:
          'Come in at any hour, any day of the week. Entry is by fingerprint, so no one waits on a caretaker.',
      },
      {
        id: 'svc-wifi',
        icon: 'wifi',
        title: 'Dual-ISP Fibre Internet',
        description:
          '300 Mbps on two separate lines with automatic failover, so a mock test is never cut short by an outage.',
      },
      {
        id: 'svc-locker',
        icon: 'lock',
        title: 'Keyed Personal Locker',
        description:
          'Overhead storage assigned to your desk. Leave your books and laptop overnight without carrying them home.',
      },
      {
        id: 'svc-water',
        icon: 'coffee',
        title: 'RO Water & Clean Washrooms',
        description:
          'Multi-stage purified drinking water and washrooms cleaned on a daily schedule.',
      },
      {
        id: 'svc-guidance',
        icon: 'book',
        title: 'Access to Jhanvit Guidance',
        description:
          'Seat holders can book one-on-one consultation slots and attend Jhanvit workshops at member rates.',
      },
    ],
    testimonialsHeading: 'What Aspirants Say',
    consultationsDone: '340',
    consultationsLabel: 'Consultations completed till date',
    testimonials: [
      {
        id: 'tst-1',
        name: 'Rohit Kamble',
        role: 'MPSC Rajyaseva aspirant',
        quote:
          'I was studying at home and losing half the day to interruptions. Two months here and I am putting in nine clean hours without thinking about it.',
      },
      {
        id: 'tst-2',
        name: 'Shraddha Nikam',
        role: 'UPSC aspirant, second attempt',
        quote:
          'The consultation was the first time someone told me plainly what was wrong with my answer writing instead of selling me a test series.',
      },
      {
        id: 'tst-3',
        name: 'Akshay Waghmare',
        role: 'Sponsored seat holder',
        quote:
          'My family could not have paid for a study hall. The sponsored seat meant I did not have to go back to the village and give up the attempt.',
      },
    ],
  },
  student: {
    workshopsHeading: 'Workshops',
    workshopsIntro:
      'Short, practical sessions open to any aspirant. Apply below and we will confirm your place by WhatsApp.',
    workshops: [
      {
        id: 'wsh-ai',
        title: 'Using AI Tools for UPSC & MPSC Preparation',
        summary:
          'A hands-on session on where AI actually helps in preparation and where it quietly wastes your time: building revision questions from your own notes, summarising reports, drafting and critiquing answers, and the mistakes that cost marks.',
        duration: '3 hours, single session',
        fee: 'Free for sponsored students, ₹299 otherwise',
        active: true,
      },
    ],
    fellowshipHeading: 'Jhanvit Fellowship',
    fellowshipIntro:
      'A year-long fellowship for aspirants who want to give part of their time back to the programme while they prepare. Fellows get a sponsored seat and a monthly stipend.',
    fellowshipPoints: [
      'Sponsored 24x7 study seat for the full fellowship year',
      'Monthly stipend to cover basic living costs',
      'Eight hours a week supporting Jhanvit guidance and outreach work',
      'Open to aspirants with at least one serious prelims attempt behind them',
    ],
  },
  careers: {
    heading: 'Work With Us',
    intro:
      'Openings at Jhanvit Foundation. We are a small team, so every role touches students directly.',
    openings: [],
    noOpeningsNote:
      'No openings are listed right now. If you want to volunteer or be considered later, write to us using the form above and mention the kind of work you are looking for.',
  },
  socials: [
    { id: 'soc-ig', platform: 'instagram', url: 'https://instagram.com/' },
    { id: 'soc-fb', platform: 'facebook', url: 'https://facebook.com/' },
    { id: 'soc-yt', platform: 'youtube', url: 'https://youtube.com/' },
    { id: 'soc-li', platform: 'linkedin', url: 'https://linkedin.com/' },
  ],
};

const STORAGE_KEY = 'jhanvit_page_content';

/** Merge stored content over the defaults one level deep per page section. */
function mergeContent(stored: Partial<PageContent>): PageContent {
  return {
    home: { ...DEFAULT_PAGE_CONTENT.home, ...(stored.home ?? {}) },
    about: { ...DEFAULT_PAGE_CONTENT.about, ...(stored.about ?? {}) },
    anubhavv: { ...DEFAULT_PAGE_CONTENT.anubhavv, ...(stored.anubhavv ?? {}) },
    student: { ...DEFAULT_PAGE_CONTENT.student, ...(stored.student ?? {}) },
    careers: { ...DEFAULT_PAGE_CONTENT.careers, ...(stored.careers ?? {}) },
    socials: stored.socials ?? DEFAULT_PAGE_CONTENT.socials,
  };
}

export function getPageContent(): PageContent {
  if (typeof window === 'undefined') return DEFAULT_PAGE_CONTENT;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_PAGE_CONTENT;
    return mergeContent(JSON.parse(stored) as Partial<PageContent>);
  } catch {
    return DEFAULT_PAGE_CONTENT;
  }
}

export function savePageContent(content: PageContent): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    pageContentStore.notify();
  } catch (err) {
    console.error('Error saving page content:', err);
  }
}

export function resetPageContent(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  pageContentStore.notify();
}

const pageContentStore = createClientStore(STORAGE_KEY, getPageContent, DEFAULT_PAGE_CONTENT);

/** Live page content. Re-renders when the admin saves, here or in another tab. */
export const usePageContent = pageContentStore.useValue;

/** Download the editable content as a JSON backup file. */
export function exportPageContent(): void {
  if (typeof window === 'undefined') return;
  const data =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(getPageContent(), null, 2));
  const anchor = document.createElement('a');
  anchor.setAttribute('href', data);
  anchor.setAttribute('download', `jhanvit-content-${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
