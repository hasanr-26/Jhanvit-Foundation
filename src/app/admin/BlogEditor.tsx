'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  getBlogPosts,
  saveBlogPost,
  deleteBlogPost,
  resetBlogPostsToDefault,
  restoreDefaultSamplePostsPreservingCustom,
  exportBlogPostsBackup,
  importBlogPosts,
  isPostPubliclyVisible,
  BlogPost,
  BlogFAQ,
  BlogStatus,
} from '@/lib/blogData';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Upload,
  Image as ImageIcon,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Calendar,
  Clock,
  User,
  Tag,
  ArrowUpRight,
  RefreshCw,
  FileText,
  Download,
  UploadCloud,
  ShieldAlert,
  CalendarDays,
} from 'lucide-react';

const CATEGORY_PRESETS = [
  'Technology & Innovation',
  'Exam Strategy',
  'Study Habits & Focus',
  'Social Impact',
  'Current Affairs & Policy',
  'Foundation Updates',
];

const PRESET_BANNERS = [
  {
    label: 'Modern Tech & Circuit',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Library & Books',
    url: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Classroom & Study',
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Civil Services / India Emblem',
    url: 'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Modern Laptop & Notes',
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1400&q=80',
  },
];

// Helper to compress images client-side before storing to base64
const compressImageClientSide = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const maxWidth = 1400;
        const maxHeight = 850;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Compress as JPEG 82% quality (typically ~100-250KB)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
        resolve(compressedDataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function BlogEditor() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [isCompressingImage, setIsCompressingImage] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetConfirmInput, setResetConfirmInput] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const backupImportInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    setPosts(getBlogPosts());
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleCreateNew = () => {
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      category: 'Exam Strategy',
      tags: ['UPSC', 'Guidance'],
      author: {
        name: 'Ganesh Zanjad',
        role: 'Founder & Director, Jhanvit Foundation',
      },
      bannerImage: PRESET_BANNERS[0].url,
      publishedAt: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      featured: false,
      status: 'published',
      scheduledAt: '',
      faqs: [],
    };
    setEditingPost(newPost);
    setIsEditing(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost({ ...post });
    setIsEditing(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteBlogPost(id);
      loadPosts();
      showNotification('Blog post deleted successfully.');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    if (!editingPost.title.trim()) {
      alert('Please provide a title for the blog post.');
      return;
    }

    // Generate slug if empty
    let slug = editingPost.slug.trim();
    if (!slug) {
      slug = editingPost.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    // Validate scheduledAt if status is scheduled
    if (editingPost.status === 'scheduled' && !editingPost.scheduledAt) {
      alert('Please select a scheduled date & time for publishing.');
      return;
    }

    const postToSave: BlogPost = {
      ...editingPost,
      slug,
      tags: Array.isArray(editingPost.tags)
        ? editingPost.tags
        : String(editingPost.tags || '')
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
    };

    saveBlogPost(postToSave);
    loadPosts();
    setIsEditing(false);
    setEditingPost(null);

    if (postToSave.status === 'scheduled') {
      showNotification(`Article scheduled for ${new Date(postToSave.scheduledAt!).toLocaleString()}!`);
    } else if (postToSave.status === 'draft') {
      showNotification('Article saved as draft (hidden from public).');
    } else {
      showNotification('Article published and live on website!');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingPost) return;

    try {
      setIsCompressingImage(true);
      // Auto compress and optimize image to ensure it fits safely in storage
      const compressedDataUrl = await compressImageClientSide(file);
      setEditingPost({
        ...editingPost,
        bannerImage: compressedDataUrl,
      });
      showNotification('Banner image optimized & uploaded successfully!');
    } catch (err) {
      console.error('Image compression error:', err);
      alert('Could not process this image. Please try a different image or enter a URL.');
    } finally {
      setIsCompressingImage(false);
    }
  };

  const handleAddFaq = () => {
    if (!editingPost) return;
    const currentFaqs = editingPost.faqs || [];
    setEditingPost({
      ...editingPost,
      faqs: [...currentFaqs, { question: '', answer: '' }],
    });
  };

  const handleUpdateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    if (!editingPost) return;
    const updatedFaqs = [...(editingPost.faqs || [])];
    updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
    setEditingPost({ ...editingPost, faqs: updatedFaqs });
  };

  const handleRemoveFaq = (index: number) => {
    if (!editingPost) return;
    const updatedFaqs = (editingPost.faqs || []).filter((_, i) => i !== index);
    setEditingPost({ ...editingPost, faqs: updatedFaqs });
  };

  const insertContentHelper = (syntax: string) => {
    if (!editingPost) return;
    setEditingPost({
      ...editingPost,
      content: editingPost.content + (editingPost.content ? '\n\n' : '') + syntax,
    });
  };

  // Safe merge default sample posts without deleting custom articles
  const handleSafeRestoreSamples = () => {
    restoreDefaultSamplePostsPreservingCustom();
    loadPosts();
    setShowResetModal(false);
    showNotification('Default sample posts restored. All custom articles were preserved!');
  };

  // Hard factory reset with explicit typing protection
  const handleHardFactoryReset = () => {
    if (resetConfirmInput.trim().toUpperCase() !== 'RESET') {
      alert('Please type RESET in the box to confirm factory reset.');
      return;
    }
    resetBlogPostsToDefault();
    loadPosts();
    setShowResetModal(false);
    setResetConfirmInput('');
    showNotification('All articles reset to starter defaults.');
  };

  const handleImportBackupFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const result = importBlogPosts(parsed, 'merge');
        if (result.success) {
          loadPosts();
          showNotification(`Successfully imported and merged ${result.count} articles!`);
        } else {
          alert('Invalid backup file format.');
        }
      } catch (err) {
        alert('Failed to parse backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0d1420] p-6 rounded-2xl border border-white/5">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0090b0]" />
            Blog & Article Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Write, schedule, edit, and publish articles, exam strategy guides, and insights.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Export Backup */}
          <button
            type="button"
            onClick={exportBlogPostsBackup}
            title="Download JSON backup of all articles"
            className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold px-3 py-2.5 rounded-xl border border-white/10 transition"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            Export Backup
          </button>

          {/* Import Backup */}
          <input
            type="file"
            ref={backupImportInputRef}
            onChange={handleImportBackupFile}
            accept=".json"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => backupImportInputRef.current?.click()}
            title="Import articles from backup JSON file"
            className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold px-3 py-2.5 rounded-xl border border-white/10 transition"
          >
            <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
            Import Backup
          </button>

          {/* Reset / Restore Options */}
          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold px-3 py-2.5 rounded-xl border border-white/10 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Options
          </button>

          {/* Write New */}
          <button
            type="button"
            onClick={handleCreateNew}
            className="flex items-center gap-1.5 bg-[#0090b0] hover:bg-[#007894] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-[#0090b0]/20 transition"
          >
            <Plus className="w-4 h-4" />
            Write New Blog
          </button>
        </div>
      </div>

      {notification && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Post List View */}
      {!isEditing && (
        <div className="space-y-4">
          {/* Search bar & statistics */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts by title or category..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-xs placeholder-slate-500 focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="bg-white/5 px-3 py-2 rounded-xl border border-white/5">
                Total: <b className="text-white">{posts.length}</b>
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 px-3 py-2 rounded-xl border border-emerald-500/20">
                Live: <b>{posts.filter(isPostPubliclyVisible).length}</b>
              </span>
              <span className="bg-purple-500/10 text-purple-300 px-3 py-2 rounded-xl border border-purple-500/20">
                Scheduled: <b>{posts.filter((p) => p.status === 'scheduled' && !isPostPubliclyVisible(p)).length}</b>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPosts.map((post) => {
              const isScheduledFuture = post.status === 'scheduled' && !isPostPubliclyVisible(post);
              const isLive = isPostPubliclyVisible(post);

              return (
                <div
                  key={post.id}
                  className="bg-[#0d1420] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between hover:border-white/20 transition group"
                >
                  {/* Thumbnail banner */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <Image
                      src={post.bannerImage}
                      alt={post.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                      <span className="bg-[#0090b0] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                        {post.category}
                      </span>
                      {post.featured && (
                        <span className="bg-[#f5b82e] text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="absolute top-2.5 right-2.5">
                      {isScheduledFuture ? (
                        <span className="bg-purple-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          SCHEDULED
                        </span>
                      ) : post.status === 'draft' ? (
                        <span className="bg-slate-700/90 text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                          DRAFT
                        </span>
                      ) : (
                        <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          LIVE
                        </span>
                      )}
                    </div>

                    {isScheduledFuture && post.scheduledAt && (
                      <div className="absolute bottom-0 inset-x-0 bg-purple-950/90 backdrop-blur-sm text-purple-200 text-[11px] font-medium px-3 py-1 border-t border-purple-800 flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 text-purple-300 shrink-0" />
                        <span className="truncate">
                          Publishes on {new Date(post.scheduledAt).toLocaleDateString()} at {new Date(post.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Details */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span>{post.publishedAt}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-bold text-white text-sm line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-xs text-[#0090b0] hover:text-cyan-300 flex items-center gap-1 font-semibold"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Preview
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleEdit(post)}
                          className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg transition"
                          title="Edit Blog"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id, post.title)}
                          className="p-1.5 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition"
                          title="Delete Blog"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Post Edit / Add Modal Form */}
      {isEditing && editingPost && (
        <form
          onSubmit={handleSave}
          className="bg-[#0d1420] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">
                {editingPost.id.startsWith('post-') && !posts.some((p) => p.id === editingPost.id)
                  ? 'Create New Blog Post'
                  : 'Edit Blog Post'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Customize titles, scheduling, graphics, category tags, structured body text, and FAQs.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditingPost(null);
              }}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col: Main Content (2 cols) */}
            <div className="lg:col-span-2 space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Article Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  placeholder="e.g. Modern Digital Twin Technology & Civil Governance..."
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                />
              </div>

              {/* Slug URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  URL Slug (Auto-generated if left blank)
                </label>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-400">
                  <span className="text-slate-500 mr-1">/blog/</span>
                  <input
                    type="text"
                    value={editingPost.slug}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                      })
                    }
                    placeholder="custom-article-slug"
                    className="bg-transparent text-white w-full focus:outline-none"
                  />
                </div>
              </div>

              {/* Excerpt / Summary */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Excerpt / Short Summary
                </label>
                <textarea
                  rows={2}
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  placeholder="A brief 1-2 sentence overview shown on article cards and social previews..."
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                />
              </div>

              {/* Full Content Editor */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-400">
                    Article Body Content (Markdown & Formatted Text)
                  </label>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <button
                      type="button"
                      onClick={() => insertContentHelper('## Heading Title\n\nParagraph text goes here.')}
                      className="px-2 py-0.5 bg-white/5 hover:bg-white/10 rounded text-cyan-300"
                    >
                      + Heading
                    </button>
                    <button
                      type="button"
                      onClick={() => insertContentHelper('- Bullet point item 1\n- Bullet point item 2')}
                      className="px-2 py-0.5 bg-white/5 hover:bg-white/10 rounded text-cyan-300"
                    >
                      + List
                    </button>
                    <button
                      type="button"
                      onClick={() => insertContentHelper('> "Key takeaway quote goes here."')}
                      className="px-2 py-0.5 bg-white/5 hover:bg-white/10 rounded text-cyan-300"
                    >
                      + Quote
                    </button>
                  </div>
                </div>
                <textarea
                  rows={14}
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  placeholder="Write your article in standard text or Markdown. You can use ## for headings, - for bullet points, and > for quotes..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs font-mono leading-relaxed focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                />
              </div>

              {/* Article FAQs */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-[#0090b0]" />
                    Frequently Asked Questions (Accordion)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="text-xs text-[#0090b0] hover:text-cyan-300 font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add FAQ
                  </button>
                </div>

                {editingPost.faqs && editingPost.faqs.length > 0 ? (
                  <div className="space-y-3">
                    {editingPost.faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 p-3.5 rounded-xl border border-white/5 space-y-2 relative"
                      >
                        <button
                          type="button"
                          onClick={() => handleRemoveFaq(idx)}
                          className="absolute top-2 right-2 text-slate-500 hover:text-red-400 p-1 rounded"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                          placeholder="Question..."
                          className="w-full pr-6 px-3 py-1.5 bg-black/20 border border-white/10 rounded-lg text-white text-xs focus:outline-none"
                        />
                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                          placeholder="Answer..."
                          className="w-full px-3 py-1.5 bg-black/20 border border-white/10 rounded-lg text-white text-xs focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No FAQs added for this article yet.</p>
                )}
              </div>
            </div>

            {/* Right Col: Metadata, Scheduling & Banner (1 col) */}
            <div className="space-y-5">
              {/* Publishing Status & Scheduling */}
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700/80 space-y-3">
                <label className="block text-xs font-bold text-white flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#0090b0]" />
                  Publishing & Scheduling
                </label>

                {/* 3 Status Options */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/40 rounded-xl border border-white/5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setEditingPost({ ...editingPost, status: 'published' })}
                    className={`py-1.5 rounded-lg font-semibold transition ${
                      editingPost.status === 'published'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Live
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingPost({ ...editingPost, status: 'scheduled' })}
                    className={`py-1.5 rounded-lg font-semibold transition ${
                      editingPost.status === 'scheduled'
                        ? 'bg-purple-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Schedule
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingPost({ ...editingPost, status: 'draft' })}
                    className={`py-1.5 rounded-lg font-semibold transition ${
                      editingPost.status === 'draft'
                        ? 'bg-slate-700 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Draft
                  </button>
                </div>

                {/* If Scheduled: Show DateTime Picker */}
                {editingPost.status === 'scheduled' && (
                  <div className="space-y-2 pt-2 border-t border-white/10 animate-fadeIn">
                    <label className="block text-[11px] font-semibold text-purple-300">
                      Release Date & Time:
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={editingPost.scheduledAt || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, scheduledAt: e.target.value })}
                      className="w-full px-3 py-2 bg-black/30 border border-purple-500/40 rounded-xl text-white text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                    <p className="text-[10px] text-purple-300/80 leading-tight">
                      ⏰ The article will stay hidden from the public and will automatically go live when this time arrives.
                    </p>
                  </div>
                )}

                {/* Featured Checkbox */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-xs text-slate-300 font-medium">Featured Showcase</span>
                  <input
                    type="checkbox"
                    checked={Boolean(editingPost.featured)}
                    onChange={(e) => setEditingPost({ ...editingPost, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#0090b0] focus:ring-[#0090b0] bg-white/10 border-white/20"
                  />
                </div>
              </div>

              {/* Banner Image */}
              <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/5">
                <label className="block text-xs font-bold text-white">Cover Banner Image</label>

                {/* Image Preview */}
                <div className="relative h-32 w-full rounded-lg overflow-hidden bg-slate-900 border border-white/10">
                  {editingPost.bannerImage ? (
                    <Image
                      src={editingPost.bannerImage}
                      alt="Banner Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-500 text-xs">
                      No banner selected
                    </div>
                  )}
                </div>

                {/* Upload File with Auto-Compression */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={isCompressingImage}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold py-2 rounded-lg border border-white/10 transition disabled:opacity-50"
                >
                  <Upload className="w-3.5 h-3.5" />
                  {isCompressingImage ? 'Optimizing Image...' : 'Upload Image (Auto-Optimized)'}
                </button>

                {/* Or Custom URL */}
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Or Enter Image URL:
                  </label>
                  <input
                    type="url"
                    value={editingPost.bannerImage}
                    onChange={(e) => setEditingPost({ ...editingPost, bannerImage: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-1.5 bg-black/20 border border-white/10 rounded-lg text-white text-xs focus:outline-none"
                  />
                </div>

                {/* Quick Presets */}
                <div>
                  <p className="text-[11px] text-slate-400 mb-1.5">Quick Preset Images:</p>
                  <div className="flex flex-wrap gap-1">
                    {PRESET_BANNERS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setEditingPost({ ...editingPost, bannerImage: preset.url })}
                        className="text-[10px] bg-white/5 hover:bg-white/10 text-slate-300 px-2 py-1 rounded border border-white/5 transition"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Category
                </label>
                <select
                  value={editingPost.category}
                  onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0090b0]"
                >
                  {CATEGORY_PRESETS.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#0d1420] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Author Info */}
              <div className="space-y-3 bg-white/5 p-3.5 rounded-xl border border-white/5">
                <label className="block text-xs font-bold text-white">Author Information</label>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={editingPost.author.name}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        author: { ...editingPost.author, name: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-black/20 border border-white/10 rounded-lg text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Author Role</label>
                  <input
                    type="text"
                    value={editingPost.author.role}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        author: { ...editingPost.author, role: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-black/20 border border-white/10 rounded-lg text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Read time & Published date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={editingPost.readTime}
                    onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                    placeholder="6 min read"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Date Tag
                  </label>
                  <input
                    type="date"
                    value={editingPost.publishedAt}
                    onChange={(e) => setEditingPost({ ...editingPost, publishedAt: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={Array.isArray(editingPost.tags) ? editingPost.tags.join(', ') : editingPost.tags}
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
                      tags: e.target.value.split(',').map((t) => t.trim()),
                    })
                  }
                  placeholder="UPSC, Prelims, Tech, Study"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditingPost(null);
              }}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0090b0] hover:bg-[#007894] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#0090b0]/20 flex items-center gap-2 transition"
            >
              <Save className="w-4 h-4" />
              {editingPost.status === 'scheduled' ? 'Save & Schedule Post' : 'Save & Publish Post'}
            </button>
          </div>
        </form>
      )}

      {/* Safe Reset / Restore Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-700 max-w-lg w-full rounded-2xl p-6 space-y-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                Blog Storage & Reset Options
              </h3>
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Option 1: Safe Merge */}
              <div className="bg-cyan-950/40 border border-cyan-800/60 p-4 rounded-xl space-y-2">
                <h4 className="font-bold text-cyan-300 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  Option 1: Restore Starter Posts (Recommended & Safe)
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Restores any missing default foundation sample posts without deleting or modifying any of your custom written articles.
                </p>
                <button
                  type="button"
                  onClick={handleSafeRestoreSamples}
                  className="mt-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2 rounded-lg transition shadow"
                >
                  Restore Starter Pack Safely
                </button>
              </div>

              {/* Option 2: Factory Reset */}
              <div className="bg-red-950/40 border border-red-800/50 p-4 rounded-xl space-y-2.5">
                <h4 className="font-bold text-red-300 text-sm flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  Option 2: Factory Reset (Danger)
                </h4>
                <p className="text-red-200/80 leading-relaxed">
                  ⚠️ This will <b>permanently delete all custom articles</b> and replace storage with the initial template. Please download a backup first!
                </p>
                <div className="space-y-2 pt-2">
                  <label className="block text-[11px] text-slate-400 font-mono">
                    Type <b>RESET</b> to unlock:
                  </label>
                  <input
                    type="text"
                    value={resetConfirmInput}
                    onChange={(e) => setResetConfirmInput(e.target.value)}
                    placeholder="Type RESET"
                    className="w-full px-3 py-2 bg-black/40 border border-red-500/40 rounded-lg text-white font-mono text-xs focus:outline-none"
                  />
                  <button
                    type="button"
                    disabled={resetConfirmInput.trim().toUpperCase() !== 'RESET'}
                    onClick={handleHardFactoryReset}
                    className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-2 rounded-lg transition"
                  >
                    Confirm Full Factory Reset
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
