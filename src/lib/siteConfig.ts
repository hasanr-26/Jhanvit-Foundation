// siteConfig.ts — Single source of truth for all admin-editable site content.
// Admin changes are persisted in localStorage and read by all frontend pages.

export interface DonationPreset {
  amount: number;
  label: string;
  description: string;
  popular?: boolean;
}

export interface SiteConfig {
  // Homepage Stats
  aspirantsSupported: string;
  studySeatsAvailable: string;
  yearFounded: string;

  // Contact Info
  phone1: string;
  phone2: string;
  email: string;
  workingHours: string;

  // Organisation Details
  orgName: string;
  legalEntityType: string;
  cin: string;
  pan: string;
  dateOfIncorporation: string;
  registeredAddress: string;
  operationalAddress: string;
  taxExemptionStatus: string;

  // Donation Presets
  donationPresets: DonationPreset[];

  // Bank Details
  bankAccountName: string;
  bankAccountNumber: string;
  bankIfscCode: string;
  bankName: string;
  upiId: string;
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  // Homepage Stats
  aspirantsSupported: '120+',
  studySeatsAvailable: '125',
  yearFounded: '2026',

  // Contact Info
  phone1: '7066422555',
  phone2: '9637502333',
  email: 'anubhavveducation@gmail.com',
  workingHours: 'Study Hall: Open 24x7. Office queries responded 9 AM – 8 PM daily.',

  // Organisation Details
  orgName: 'Jhanvit Foundation',
  legalEntityType: 'Section 8 Non-Profit Company under Companies Act, 2013',
  cin: 'U85499PN2026NPL255094',
  pan: 'AAHCJ3974C',
  dateOfIncorporation: '28 April 2026',
  registeredAddress: 'Chawl No. B-32/19, Upper Indira Nagar, Bibvewadi, Pune – 411037',
  operationalAddress:
    '2nd Floor, Above ICICI Bank, Gogate Chambers, Nagnath Par, Sadashiv Peth, Pune – 411030',
  taxExemptionStatus: 'Registration in Process (Will be updated once approved)',

  // Donation Presets
  donationPresets: [
    {
      amount: 500,
      label: '1 Week Sponsorship',
      description: 'Contributes to one week of 24x7 study hall access for a student.',
      popular: false,
    },
    {
      amount: 2000,
      label: '1 Full Month Seat',
      description: 'Sponsors 1 full month of dedicated study seat for 1 aspirant.',
      popular: true,
    },
    {
      amount: 6000,
      label: 'Full Quarter (3 Months)',
      description: 'Sponsors 1 student through their critical Prelims or Mains prep phase.',
      popular: false,
    },
    {
      amount: 24000,
      label: 'Full Year Sponsorship',
      description: 'Sponsors an aspirant for an entire year until their target exam.',
      popular: false,
    },
  ],

  // Bank Details
  bankAccountName: 'Jhanvit Foundation',
  bankAccountNumber: '',
  bankIfscCode: '',
  bankName: '',
  upiId: '',
};

const STORAGE_KEY = 'jhanvit_site_config';

/**
 * Reads the site config from localStorage, merging with defaults
 * so any new fields added later get their default value automatically.
 */
export function getSiteConfig(): SiteConfig {
  if (typeof window === 'undefined') {
    // Server-side rendering — always return defaults
    return DEFAULT_SITE_CONFIG;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_SITE_CONFIG;
    const parsed = JSON.parse(stored) as Partial<SiteConfig>;
    return { ...DEFAULT_SITE_CONFIG, ...parsed };
  } catch {
    return DEFAULT_SITE_CONFIG;
  }
}

/**
 * Saves the full site config to localStorage.
 */
export function saveSiteConfig(config: SiteConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    console.error('Failed to save site config to localStorage');
  }
}
