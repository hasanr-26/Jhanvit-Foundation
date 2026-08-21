// blogData.ts — Data model, starter blog articles, and persistence helpers for Jhanvit Foundation Blog

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogAuthor {
  name: string;
  role: string;
  avatarUrl?: string;
}

export type BlogStatus = 'published' | 'draft' | 'scheduled';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or structured text with headings & paragraphs
  category: string;
  tags: string[];
  author: BlogAuthor;
  bannerImage: string;
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  status: BlogStatus;
  scheduledAt?: string; // ISO string e.g. '2026-08-25T10:00'
  faqs?: BlogFAQ[];
}

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'digital-twin-technology-the-future-of-engineering',
    title: 'Digital Twin Technology: The Future of Engineering & Smart Infrastructure',
    excerpt:
      'How virtual simulations, real-time sensor streams, and AI-driven predictive models are revolutionizing modern engineering, smart cities, and technological governance.',
    category: 'Technology & Innovation',
    tags: ['Digital Twin', 'Engineering', 'AI & IoT', 'Smart Cities', 'Industry 4.0'],
    author: {
      name: 'Ganesh Zanjad',
      role: 'Founder & Director, Jhanvit Foundation',
      avatarUrl: '/images/ganesh_zanjad.png',
    },
    bannerImage:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80',
    publishedAt: '2026-08-18',
    readTime: '6 min read',
    featured: true,
    status: 'published',
    content: `Entering any current factory, power station, or civil engineering facility, one will most likely encounter a second, invisible copy of the machine already working on a server, changing its model according to real-time conditions and predicting potential failures in advance. The concept is no longer taken out of science-fiction literature. Digital twin technology is becoming one of the key ideas of how engineers design, build, and maintain our physical world.

To anyone following modern technological trends in engineering and public infrastructure, digital twins cannot be overlooked. The concept appears where several emerging disciplines converge: constant monitoring through IoT sensors, rapid analytics through AI algorithms, and predictive diagnostics before physical bottlenecks occur.

## What Is Digital Twin Technology?

In the most basic terms, the concept of a digital twin involves a dynamic, real-time representation of a tangible physical asset. This is not just a static 3D computer model; rather, it is a living entity actively fed by sensor streams from the physical world so that any change in the physical asset is mirrored in its virtual counterpart almost instantaneously.

While digital twins originated in aerospace engineering for monitoring spacecraft that could not be serviced physically, they have rapidly expanded into:
- **Urban Planning & Smart Cities:** Simulating traffic flow, water distribution grids, and energy consumption before laying physical infrastructure.
- **Smart Manufacturing:** Real-time optimization of automated production lines and robotics.
- **Healthcare Systems:** Modeling organ performance and personalized surgical simulation.
- **Structural Engineering:** Monitoring bridge vibration, structural load, and material wear over decades.

## How Does Digital Twin Technology Work?

Every digital twin architecture relies on a continuous 4-stage pipeline:

1. **Sensory Data Acquisition:** IoT sensors measure temperature, vibration, hydraulic pressure, strain, and electrical load.
2. **High-Speed Data Ingestion:** Secure IoT gateways stream the data into cloud or edge computational clusters.
3. **AI & Physics Simulation:** Machine learning algorithms compare real-time metrics against historical baselines and theoretical physics models to detect micro-anomalies.
4. **Predictive Action & Feedback:** Automated triggers or engineering dashboards receive actionable insights before mechanical failure occurs.

## Why Digital Twins Matter for Competitive Aspirants & Engineers

For aspirants appearing for civil services (UPSC/MPSC) with engineering or technology options, as well as students entering tech domains, understanding digital twins is vital. Government initiatives like Smart Cities Mission, Gati Shakti, and Digital India increasingly leverage digital twin frameworks for municipal governance and disaster management.`,
    faqs: [
      {
        question: 'What is the primary difference between a 3D simulation and a Digital Twin?',
        answer:
          'A traditional simulation runs on predefined static parameters, whereas a digital twin is constantly connected to live sensors on a physical asset, updating in real-time as physical conditions change.',
      },
      {
        question: 'How do Digital Twins integrate with AI and IoT?',
        answer:
          'IoT sensors provide the continuous stream of raw real-world data, while AI and machine learning algorithms process that data to predict maintenance requirements, failure risks, and efficiency improvements.',
      },
      {
        question: 'What career paths are emerging around Digital Twins in India?',
        answer:
          'Key roles include Simulation Engineers, IoT System Architects, AI Predictive Modeling Specialists, and Smart Infrastructure Consultants for both private tech giants and public infrastructure bodies.',
      },
    ],
  },
  {
    id: 'post-2',
    slug: 'the-modern-aspirants-blueprint-upsc-mpsc-pune',
    title: "The Modern Aspirant's Blueprint: Mastering UPSC & MPSC Preparation in Pune's Study Ecosystem",
    excerpt:
      'A deep dive into building sustained 12-hour focus routines, avoiding burnout, and leveraging Pune’s unique Abhyasika culture for maximum preliminary and mains output.',
    category: 'Exam Strategy',
    tags: ['UPSC', 'MPSC', 'Study Strategy', 'Abhyasika', 'Time Management'],
    author: {
      name: 'Academic Advisory Panel',
      role: 'Jhanvit Foundation Guidance Cell',
      avatarUrl: '/images/jhanvit_emblem_clean.png',
    },
    bannerImage:
      'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=1400&q=80',
    publishedAt: '2026-08-10',
    readTime: '8 min read',
    featured: true,
    status: 'published',
    content: `Every year, thousands of determined students arrive in Pune's historic educational heartlands—Sadashiv Peth, Navi Peth, and Narayan Peth—with a singular goal: cracking the UPSC Civil Services or MPSC State Services Examination. Yet, the difference between aspirants who clear the hurdle and those who struggle often comes down to their daily micro-environment and consistency.

In competitive examinations where the syllabus is vast and revisions are non-negotiable, having an uninterrupted, ergonomic study space is not a luxury—it is the baseline for success.

## 1. The Power of an Unbroken Focus Block

Human cognition takes 15 to 20 minutes to reach deep focus (flow state). Constant interruptions, noise, or uncomfortable seating reset this timer, resulting in cognitive fatigue without meaningful retention.

At ANUBHAVV Abhyasika, the 24x7 silent zone with individual high-privacy partition cubicles is engineered specifically to eliminate peripheral distractions. When you sit in an environment where 120+ peers are reading with intense discipline, positive social contagion takes over.

## 2. Active Recall vs. Passive Reading

Most aspirants spend 80% of their time highlighting notes. Research shows that active recall (testing yourself after each 50-minute block) improves memory consolidation by up to 300%.

- **The Pomodoro Revision Loop:** 50 minutes of intense reading followed by 10 minutes of active self-questioning.
- **Daily Answer Writing:** Dedicate 1 hour after lunch exclusively to GS answer drafting.
- **Weekly Mock Simulation:** Take simulated Prelims tests on Sunday mornings under strict exam-like conditions.

## 3. Physical Health & Ergonomics

Long study hours without lumbar support lead to neck strain, lower back fatigue, and reduced brain oxygenation. Ensure your study chair provides proper posture support, drink at least 3 liters of water daily, and utilize dedicated breakout areas to stretch during intervals.`,
    faqs: [
      {
        question: 'How many daily study hours are recommended for UPSC/MPSC?',
        answer:
          'Quality over quantity is crucial. 8 to 10 hours of high-concentration deep work consistently over 12-18 months yields far better results than erratic 14-hour cramming sessions.',
      },
      {
        question: 'Why choose a dedicated 24x7 Abhyasika over home study?',
        answer:
          'Abhyasikas provide zero domestic distractions, high-speed backup power, ergonomic seating, and an ambient atmosphere of peer discipline that keeps procrastination at bay.',
      },
    ],
  },
  {
    id: 'post-3',
    slug: 'bridging-the-opportunity-gap-community-sponsorship',
    title: 'Bridging the Opportunity Gap: How Seat Sponsorship Transforms Deserving Aspirants’ Lives',
    excerpt:
      'Behind every Section 8 non-profit initiative is a human story. Discover how donor-backed seat sponsorships empower brilliant students from underprivileged backgrounds.',
    category: 'Social Impact',
    tags: ['Sponsorship', 'Non-Profit', 'Education Equality', 'Section 8', 'Jhanvit Foundation'],
    author: {
      name: 'Ganesh Zanjad',
      role: 'Founder & Director, Jhanvit Foundation',
      avatarUrl: '/images/ganesh_zanjad.png',
    },
    bannerImage:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=80',
    publishedAt: '2026-07-28',
    readTime: '5 min read',
    featured: false,
    status: 'published',
    content: `Financial hardship should never be the reason a brilliant mind fails to reach the civil services or administrative leadership of our country. In Maharashtra, countless talented youths from agricultural families and economically weaker sections travel to Pune with high aspirations but face exorbitant study hall costs and living expenses.

Jhanvit Foundation (Section 8 Non-Profit) was established with a clear mandate: identifying deserving students through a transparent merit-cum-means screening process and providing them with fully sponsored 24x7 study seats, test series access, and mentorship.

## Transparency & Direct Donor Impact

Every rupee contributed towards the Jhanvit Foundation Student Sponsorship Fund is accounted for with complete institutional transparency. Donors receive verification updates on the student's progress and examination milestones.

By sponsoring a single study seat for ₹2,000/month or ₹24,000/year, patrons directly provide an aspirant with an uninterrupted year of safe, air-conditioned, 24x7 study facilities right in Sadashiv Peth, Pune.`,
    faqs: [
      {
        question: 'How are students selected for the Jhanvit Sponsored Seat Program?',
        answer:
          'Selection involves income verification (annual family income < ₹3 Lakhs), academic track record, previous attempt scores, and an in-person guidance interview.',
      },
      {
        question: 'Can donors track the impact of their contribution?',
        answer:
          'Yes, donors receive formal receipts, operational updates, and annual impact summaries documenting seat utilization and aspirant performance.',
      },
    ],
  },
];

const BLOG_STORAGE_KEY = 'jhanvit_blog_posts';

/**
 * Returns all blog posts stored in localStorage, falling back to INITIAL_BLOG_POSTS
 */
export function getBlogPosts(): BlogPost[] {
  if (typeof window === 'undefined') {
    return INITIAL_BLOG_POSTS;
  }
  try {
    const stored = localStorage.getItem(BLOG_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(INITIAL_BLOG_POSTS));
      return INITIAL_BLOG_POSTS;
    }
    const posts: BlogPost[] = JSON.parse(stored);
    return Array.isArray(posts) && posts.length > 0 ? posts : INITIAL_BLOG_POSTS;
  } catch (err) {
    console.error('Error reading blog posts from storage:', err);
    return INITIAL_BLOG_POSTS;
  }
}

/**
 * Check if a post is publicly visible (published or scheduled date has passed)
 */
export function isPostPubliclyVisible(post: BlogPost): boolean {
  if (post.status === 'published') return true;
  if (post.status === 'scheduled') {
    if (!post.scheduledAt) return true;
    try {
      const scheduledDate = new Date(post.scheduledAt);
      return scheduledDate.getTime() <= Date.now();
    } catch {
      return true;
    }
  }
  return false;
}

/**
 * Get all publicly visible blog posts
 */
export function getPublicBlogPosts(): BlogPost[] {
  return getBlogPosts().filter(isPostPubliclyVisible);
}

/**
 * Get a single blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find((p) => p.slug === slug || p.id === slug);
}

/**
 * Save / Update a blog post
 */
export function saveBlogPost(post: BlogPost): void {
  if (typeof window === 'undefined') return;
  try {
    const posts = getBlogPosts();
    const existingIndex = posts.findIndex((p) => p.id === post.id);
    let updated: BlogPost[];
    if (existingIndex >= 0) {
      updated = [...posts];
      updated[existingIndex] = post;
    } else {
      updated = [post, ...posts];
    }
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving blog post:', err);
  }
}

/**
 * Delete a blog post by id
 */
export function deleteBlogPost(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const posts = getBlogPosts();
    const updated = posts.filter((p) => p.id !== id);
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error deleting blog post:', err);
  }
}

/**
 * Reset blog posts to default initial starter pack (Warning: overwrites storage)
 */
export function resetBlogPostsToDefault(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(INITIAL_BLOG_POSTS));
}

/**
 * Restore sample posts WITHOUT deleting custom written posts
 */
export function restoreDefaultSamplePostsPreservingCustom(): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getBlogPosts();
    const currentIds = new Set(current.map((p) => p.id));
    const currentSlugs = new Set(current.map((p) => p.slug));
    const missingDefaults = INITIAL_BLOG_POSTS.filter(
      (p) => !currentIds.has(p.id) && !currentSlugs.has(p.slug)
    );
    const merged = [...current, ...missingDefaults];
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(merged));
  } catch (err) {
    console.error('Error restoring default sample posts:', err);
  }
}

/**
 * Export all blog posts as a downloadable JSON file
 */
export function exportBlogPostsBackup(): void {
  if (typeof window === 'undefined') return;
  try {
    const posts = getBlogPosts();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(posts, null, 2));
    const downloadAnchor = document.createElement('a');
    const filename = `jhanvit-blog-backup-${new Date().toISOString().split('T')[0]}.json`;
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  } catch (err) {
    console.error('Error exporting blog posts backup:', err);
  }
}

/**
 * Import blog posts from a parsed JSON array
 */
export function importBlogPosts(importedPosts: BlogPost[], mode: 'merge' | 'replace' = 'merge'): { success: boolean; count: number } {
  if (typeof window === 'undefined') return { success: false, count: 0 };
  try {
    if (!Array.isArray(importedPosts) || importedPosts.length === 0) {
      return { success: false, count: 0 };
    }

    if (mode === 'replace') {
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(importedPosts));
      return { success: true, count: importedPosts.length };
    }

    // Merge mode:
    const current = getBlogPosts();
    const map = new Map<string, BlogPost>();
    current.forEach((p) => map.set(p.id, p));
    importedPosts.forEach((p) => map.set(p.id, p));
    const merged = Array.from(map.values());
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(merged));
    return { success: true, count: importedPosts.length };
  } catch (err) {
    console.error('Error importing blog posts:', err);
    return { success: false, count: 0 };
  }
}
