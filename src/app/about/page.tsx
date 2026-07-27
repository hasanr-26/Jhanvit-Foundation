import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Target, Compass, Award, Shield, User, MapPin, Building, FileCheck } from 'lucide-react';

export const metadata = {
  title: "About Us | Jhanvit Foundation — Section 8 NGO",
  description: "Learn about Jhanvit Foundation's vision, mission, founder Ganesh Zanjad, Section 8 non-profit legal credentials, and core values.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Page Header Banner */}
      <section className="bg-gradient-to-r from-[#0f172a] via-[#00667e] to-[#0090b0] text-white pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#f5b82e] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
            Section 8 Non-Profit Organisation
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">About Jhanvit Foundation</h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-base">
            Empowering competitive exam aspirants in Pune through structured study spaces, expert guidance, and financial sponsorship.
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0090b0] bg-[#e6f7fa] px-3 py-1 rounded-full">
              Who We Are
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
              Registered Under Ministry of Corporate Affairs, Govt. of India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              <strong>Jhanvit Foundation</strong> is a Section 8 non-profit company registered under the Ministry of Corporate Affairs, Government of India. We work with youth from lower and middle-income families who are preparing for competitive examinations like UPSC, MPSC, and other state and central government exams.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              We believe the biggest barrier for most aspirants is not intelligence or hard work — it is access to the right environment, guidance, and support system.
            </p>
          </div>

          <div className="relative w-full h-[360px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/images/slide2.jpg"
              alt="Jhanvit Foundation Study & Mentorship"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="bg-slate-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#e6f7fa] text-[#0090b0] flex items-center justify-center">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-slate-700 text-base leading-relaxed">
              A world where every serious aspirant—regardless of their economic background—has access to the environment, guidance, and support they need to achieve their full potential.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#f5b82e] flex items-center justify-center">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-slate-700 text-base leading-relaxed">
              To provide structured study spaces, expert consultation, and financial sponsorship to competitive exam aspirants from underserved communities — and to measure our success by the real change in their lives.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900">Our Guiding Values</h2>
          <p className="text-slate-600">The principles that drive every initiative at Jhanvit Foundation.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#e6f7fa] text-[#0090b0] flex items-center justify-center font-bold">1</div>
            <h4 className="font-bold text-slate-900 text-lg">Access</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Quality guidance should not be available only to those who can afford expensive coaching institutes.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">2</div>
            <h4 className="font-bold text-slate-900 text-lg">Accountability</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every rupee of donation is tracked and reported transparently to donors and the community.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center font-bold">3</div>
            <h4 className="font-bold text-slate-900 text-lg">Structure</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The right study environment and peer discipline is as important as the right study strategy.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">4</div>
            <h4 className="font-bold text-slate-900 text-lg">Dignity</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every aspirant is treated with immense respect regardless of their financial or social background.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          <div className="md:col-span-1 text-center">
            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-xl border-4 border-[#0090b0]">
              <Image
                src="/images/slide4.jpg"
                alt="Ganesh Zanjad - Founder & Director"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-4">Ganesh Zanjad</h3>
            <p className="text-xs font-semibold text-[#0090b0]">Founder & Director</p>
          </div>

          <div className="md:col-span-2 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0090b0]">Founder&apos;s Journey</span>
            <h3 className="text-2xl font-bold text-slate-900">From Aspirant to Changemaker</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              Ganesh prepared for UPSC for 4 years at Jnan Prabodhini, Pune. He understands the journey from the inside — the struggle, the uncertainty, and what it feels like to study without the right environment or mentor.
            </p>
            <p className="text-slate-700 text-sm leading-relaxed">
              After joining <strong>Teach For India (Cohort 2023)</strong> and working across 500+ Maharashtra government schools as a Program Manager, he built what he needed and did not have — Jhanvit Foundation and ANUBHAVV Abhyasika.
            </p>
          </div>
        </div>
      </section>

      {/* Legal & Registration Credentials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">Legal Credentials & Details</h2>
          <p className="text-slate-600 text-sm">Full regulatory compliance details under MCA, Govt. of India.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100 text-sm">
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50">
              <span className="font-bold text-slate-700">Organisation Name</span>
              <span className="sm:col-span-2 font-semibold text-[#0090b0]">Jhanvit Foundation</span>
            </div>
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-bold text-slate-700">Legal Entity Type</span>
              <span className="sm:col-span-2 text-slate-800">Section 8 Non-Profit Company under Companies Act, 2013</span>
            </div>
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50">
              <span className="font-bold text-slate-700">Corporate Identification Number (CIN)</span>
              <span className="sm:col-span-2 font-mono font-bold text-[#f5b82e] bg-slate-900 px-3 py-1 rounded inline-block w-fit">
                U85499PN2026NPL255094
              </span>
            </div>
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-bold text-slate-700">PAN Number</span>
              <span className="sm:col-span-2 font-mono text-slate-800">AAHCJ3974C</span>
            </div>
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50">
              <span className="font-bold text-slate-700">Date of Incorporation</span>
              <span className="sm:col-span-2 text-slate-800">28 April 2026</span>
            </div>
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-bold text-slate-700">Registered Office Address</span>
              <span className="sm:col-span-2 text-slate-800">Chawl No. B-32/19, Upper Indira Nagar, Bibvewadi, Pune – 411037</span>
            </div>
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50">
              <span className="font-bold text-slate-700">Operational Study Center</span>
              <span className="sm:col-span-2 text-slate-800">2nd Floor, Above ICICI Bank, Gogate Chambers, Nagnath Par, Sadashiv Peth, Pune – 411030</span>
            </div>
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-bold text-slate-700">80G Tax Exemption Status</span>
              <span className="sm:col-span-2 text-amber-700 font-semibold bg-amber-50 px-3 py-1 rounded inline-block w-fit">
                Registration in Process (Will be updated once approved)
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
