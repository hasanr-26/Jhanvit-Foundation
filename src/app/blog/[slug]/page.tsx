'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
  Calendar,
  Clock,
  User,
  ChevronRight,
  Share2,
  Bookmark,
  Heart,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Send,
  Copy,
  Check,
} from 'lucide-react';
import { getBlogPosts, getBlogPostBySlug, getPublicBlogPosts, isPostPubliclyVisible, BlogPost } from '@/lib/blogData';

export default function BlogPostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (!slug) return;
    const posts = getBlogPosts();
    setAllPosts(posts);
    const found = getBlogPostBySlug(slug);
    if (found) {
      setPost(found);
    }
  }, [slug]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return allPosts
      .filter((p) => p.id !== post.id && isPostPubliclyVisible(p))
      .slice(0, 3);
  }, [allPosts, post]);

  const handleShare = (platform: 'whatsapp' | 'twitter' | 'linkedin' | 'copy') => {
    if (typeof window === 'undefined' || !post) return;
    const url = window.location.href;
    const title = post.title;

    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center pt-32">
          <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 mb-2">Article Not Found</h1>
          <p className="text-slate-500 text-sm max-w-md mb-6">
            The article you are looking for may have been moved or is currently in draft mode.
          </p>
          <Link
            href="/blog"
            className="bg-[#007085] hover:bg-[#005e70] text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow transition"
          >
            Back to All Articles
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Parse markdown-like content into formatted HTML sections
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];

    const flushList = (keyPrefix: string) => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`ul-${keyPrefix}`} className="space-y-2.5 my-5 pl-2">
            {currentList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-base sm:text-lg leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-[#007085] mt-2.5 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        currentList.push(trimmed.substring(2));
        return;
      }

      flushList(`line-${index}`);

      if (!trimmed) {
        return;
      }

      if (trimmed.startsWith('## ')) {
        elements.push(
          <h2
            key={index}
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-10 mb-4 pt-4 border-t border-slate-100 flex items-center gap-2.5"
          >
            <span className="w-1.5 h-6 rounded-full bg-[#007085] shrink-0" />
            {trimmed.substring(3)}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl sm:text-2xl font-bold text-slate-800 mt-8 mb-3">
            {trimmed.substring(4)}
          </h3>
        );
      } else if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ') || trimmed.startsWith('4. ')) {
        const num = trimmed.substring(0, 2);
        const text = trimmed.substring(3);
        elements.push(
          <div key={index} className="flex items-start gap-3 my-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="w-7 h-7 rounded-lg bg-[#007085] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              {num}
            </span>
            <p
              className="text-slate-700 text-base sm:text-lg leading-relaxed flex-1"
              dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
            />
          </div>
        );
      } else {
        // Standard paragraph
        elements.push(
          <p
            key={index}
            className="text-slate-700 text-base sm:text-lg leading-relaxed my-4"
            dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
          />
        );
      }
    });

    flushList('final');
    return elements;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc]">
      <Navbar />

      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 pt-24 sm:pt-28 pb-3 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap py-1">
          <Link href="/" className="hover:text-[#007085] transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/blog" className="hover:text-[#007085] transition">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-[#007085] font-semibold truncate max-w-[240px] sm:max-w-md">
            {post.title}
          </span>
        </div>
      </div>

      {/* Main Article Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1 space-y-8">
        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="bg-[#007085]/10 text-[#007085] font-extrabold text-xs px-3.5 py-1 rounded-full border border-[#007085]/20 uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#007085]" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#007085]" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.18] tracking-tight">
            {post.title}
          </h1>

          <p className="text-slate-600 text-base sm:text-xl leading-relaxed italic border-l-4 border-[#007085] pl-4 py-1">
            {post.excerpt}
          </p>

          {/* Author info & Quick Share Bar */}
          <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#007085] text-white flex items-center justify-center font-black text-sm shadow-md ring-2 ring-white">
                {post.author.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{post.author.name}</p>
                <p className="text-xs text-slate-500">{post.author.role}</p>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
                Share:
              </span>
              <button
                onClick={() => handleShare('whatsapp')}
                title="Share on WhatsApp"
                className="w-8 h-8 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white flex items-center justify-center transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                title="Share on LinkedIn"
                className="w-8 h-8 rounded-full bg-[#0A66C2]/15 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white flex items-center justify-center transition"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </button>
              <button
                onClick={() => handleShare('twitter')}
                title="Share on X (Twitter)"
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-900 text-slate-700 hover:text-white flex items-center justify-center transition"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              <button
                onClick={() => handleShare('copy')}
                title="Copy Link"
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-[#007085] text-slate-700 hover:text-white flex items-center justify-center transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </header>

        {/* Hero Banner Image */}
        <div className="relative w-full h-[260px] sm:h-[400px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-950">
          <Image
            src={post.bannerImage}
            alt={post.title}
            fill
            unoptimized
            className="object-cover"
            priority
          />
        </div>

        {/* Article Body */}
        <article className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-strong:text-slate-900">
          {renderFormattedContent(post.content)}
        </article>

        {/* FAQs Section (Matching reference VIT layout) */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="pt-8 mt-12 border-t-2 border-slate-200 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#007085]/10 text-[#007085] flex items-center justify-center font-black">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-3">
              {post.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-slate-800 text-base sm:text-lg hover:text-[#007085] transition"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#007085]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase mr-1">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg hover:bg-slate-200 transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio Box */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#007085] text-white flex items-center justify-center font-black text-xl shadow-lg shrink-0">
            {post.author.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="space-y-2 text-center sm:text-left flex-1">
            <span className="text-xs font-bold text-[#007085] uppercase tracking-wider">
              About the Author
            </span>
            <h4 className="text-lg font-extrabold text-slate-900">{post.author.name}</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {post.author.role}. Contributing thought leadership, exam strategy methodologies, and technological perspectives to empower India&apos;s next generation of civil servants and innovators.
            </p>
          </div>
        </section>

        {/* Aspirant Support CTA Box */}
        <section className="bg-gradient-to-br from-[#007085] to-[#004f5e] rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-extrabold">Need a Dedicated Study Seat in Pune?</h4>
            <p className="text-cyan-100 text-xs sm:text-sm max-w-xl">
              ANUBHAVV Study Hall offers 24x7 silent air-conditioned seats, individual partitions, high-speed WiFi, and cafeteria access at Sadashiv Peth.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/anubhavv"
              className="bg-white hover:bg-slate-100 text-[#007085] text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-xl shadow transition"
            >
              Book Study Seat
            </Link>
            <Link
              href="/donate"
              className="bg-[#0090b0] hover:bg-[#007894] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border border-white/20 transition"
            >
              Sponsor an Aspirant
            </Link>
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="pt-8 mt-12 border-t-2 border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Related & Recent Articles
              </h3>
              <Link href="/blog" className="text-xs font-bold text-[#007085] hover:underline flex items-center gap-1">
                View all blogs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`/blog/${rPost.slug}`}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition group flex flex-col"
                >
                  <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                    <Image
                      src={rPost.bannerImage}
                      alt={rPost.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#007085] uppercase">
                        {rPost.category}
                      </span>
                      <h5 className="font-bold text-slate-900 text-sm group-hover:text-[#007085] transition line-clamp-2 leading-snug">
                        {rPost.title}
                      </h5>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {rPost.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
