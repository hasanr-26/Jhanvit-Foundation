'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { usePublicBlogPosts } from '@/lib/blogData';
import { usePageContent } from '@/lib/pageContent';

/**
 * The three most recent published articles. Reads the same store the admin
 * blog editor writes to, so new posts show up on the homepage automatically.
 */
export default function NewsGrid() {
  const content = usePageContent();
  const published = usePublicBlogPosts();

  const posts = useMemo(
    () =>
      [...published]
        .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
        .slice(0, 3),
    [published]
  );

  if (!posts.length) return null;

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {content.home.newsHeading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl">{content.home.newsIntro}</p>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#007085] hover:text-[#005261] transition group shrink-0"
        >
          Read all articles
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            <div className="relative h-48 w-full overflow-hidden bg-slate-900">
              <Image
                src={post.bannerImage}
                alt={post.title}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#007085] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                {post.category}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <span className="text-xs text-slate-400 font-medium">
                  {post.readTime} •{' '}
                  {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-[#007085] transition line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{post.excerpt}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#007085]">
                <span>Read article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
