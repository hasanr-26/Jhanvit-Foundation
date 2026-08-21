'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Sparkles,
  BookOpen,
  Tag,
  Share2,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { getPublicBlogPosts, BlogPost } from '@/lib/blogData';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setPosts(getPublicBlogPosts());
  }, []);

  const categories = useMemo(() => {
    const cats = ['All'];
    posts.forEach((p) => {
      if (p.category && !cats.includes(p.category)) {
        cats.push(p.category);
      }
    });
    return cats;
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query)) ||
        post.author.name.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  const regularPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    // If no active search/category filter, exclude the top featured from the grid to avoid duplication
    if (selectedCategory === 'All' && !searchQuery.trim()) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#006578] via-[#007085] to-[#005261] text-white pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 relative overflow-hidden border-b-4 border-[#004754]">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-5xl mx-auto text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-cyan-200 text-xs sm:text-sm font-bold border border-white/20 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>KNOWLEDGE HUB & ASPIRANT INSIGHTS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
            Jhanvit Foundation <span className="text-cyan-200">Blog</span>
          </h1>

          <p className="max-w-2xl mx-auto text-cyan-100 text-sm sm:text-base md:text-lg leading-relaxed">
            In-depth guides, exam strategies, study psychology, modern engineering insights, and stories of transformation from Pune&apos;s leading educational non-profit.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by topic, exam keyword, or title..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-sm shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-300/40 border border-slate-100 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 px-2 py-1 text-xs font-semibold text-slate-400 hover:text-slate-700 bg-slate-100 rounded-lg"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Bar */}
      <section className="bg-white border-b border-slate-200 sticky top-16 sm:top-[72px] z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2 shrink-0 hidden sm:inline">
            Category:
          </span>
          {categories.map((category) => {
            const isActive = selectedCategory.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#007085] text-white shadow-md shadow-[#007085]/20 scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-12">
        {/* Featured Hero Article (when no active search/category filter) */}
        {!searchQuery && selectedCategory === 'All' && featuredPost && (
          <section className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 hover:shadow-2xl transition-all duration-300 group">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Image Section */}
              <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[360px] lg:min-h-[440px] overflow-hidden bg-slate-900">
                <Image
                  src={featuredPost.bannerImage}
                  alt={featuredPost.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-[#f5b82e] text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    ★ Featured Story
                  </span>
                  <span className="bg-[#007085] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              {/* Text Section */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#007085]" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#007085]" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight group-hover:text-[#007085] transition">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {featuredPost.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#007085]/10 border border-[#007085]/30 flex items-center justify-center font-bold text-[#007085] text-xs shrink-0">
                      {featuredPost.author.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{featuredPost.author.name}</p>
                      <p className="text-[11px] text-slate-500">{featuredPost.author.role}</p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 bg-[#007085] hover:bg-[#005e70] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition group-hover:gap-2"
                  >
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Regular Posts Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#007085]" />
              {searchQuery
                ? `Search results for "${searchQuery}" (${filteredPosts.length})`
                : selectedCategory === 'All'
                ? 'All Articles & Publications'
                : `${selectedCategory} Articles (${filteredPosts.length})`}
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Showing {regularPosts.length} post{regularPosts.length === 1 ? '' : 's'}
            </span>
          </div>

          {regularPosts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">No articles found</h4>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                We couldn&apos;t find any posts matching your search query or selected category. Try selecting another filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="bg-[#007085] text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Banner Image */}
                  <Link href={`/blog/${post.slug}`} className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900 block">
                    <Image
                      src={post.bannerImage}
                      alt={post.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#007085] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                        {post.category}
                      </span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#007085] transition line-clamp-2 leading-snug">
                          {post.title}
                        </h4>
                      </Link>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#007085]/10 border border-[#007085]/20 flex items-center justify-center font-bold text-[#007085] text-[10px]">
                          {post.author.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-xs font-semibold text-slate-700 truncate max-w-[120px]">
                          {post.author.name}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-bold text-[#007085] group-hover:text-[#005e70] flex items-center gap-1"
                      >
                        Read More
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Aspirant Support Banner */}
        <section className="bg-gradient-to-r from-[#007085] via-[#005e70] to-[#0a1a24] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="bg-white/10 text-cyan-200 text-xs font-bold px-3 py-1 rounded-full border border-white/20">
              JOIN OUR PUNE STUDY COMMUNITY
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Ready to Accelerate Your UPSC / MPSC Exam Preparation?
            </h3>
            <p className="text-cyan-100 text-sm sm:text-base leading-relaxed">
              Book a dedicated 24x7 study seat at ANUBHAVV Abhyasika in Sadashiv Peth or apply for a merit-cum-means sponsored seat funded by Jhanvit Foundation.
            </p>
            <div className="pt-2 flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/anubhavv"
                className="bg-white hover:bg-slate-100 text-[#007085] text-xs sm:text-sm font-extrabold px-5 py-3 rounded-xl shadow-lg transition"
              >
                Book a Study Seat
              </Link>
              <Link
                href="/sponsorship"
                className="bg-[#0090b0] hover:bg-[#007894] text-white text-xs sm:text-sm font-extrabold px-5 py-3 rounded-xl border border-white/20 transition"
              >
                Apply for Sponsored Seat
              </Link>
              <Link
                href="/consultation"
                className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl border border-white/20 transition"
              >
                1-on-1 Mentorship Session
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
