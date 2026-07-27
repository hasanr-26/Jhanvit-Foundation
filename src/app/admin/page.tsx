'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Lock,
  Download,
  Search,
  BookOpen,
  Building2,
  HeartHandshake,
  MessageSquare,
  CheckCircle,
  Clock,
  LogOut,
  Users,
} from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'consultations' | 'seats' | 'sponsorships' | 'contacts'>('consultations');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data (matches form schemas & Supabase table structures)
  const [consultations] = useState([
    { id: 'CON-101', name: 'Rahul Deshmukh', phone: '9876543210', email: 'rahul@gmail.com', exam: 'UPSC', stage: 'Prelims prep', date: '2026-08-05', slot: '10:00 AM', status: 'Paid (₹199)' },
    { id: 'CON-102', name: 'Sneha Patil', phone: '9123456789', email: 'sneha@gmail.com', exam: 'MPSC', stage: 'Mains prep', date: '2026-08-06', slot: '02:00 PM', status: 'Paid (₹199)' },
    { id: 'CON-103', name: 'Amit Kulkarni', phone: '9988776655', email: 'amit@gmail.com', exam: 'Banking', stage: 'Just starting', date: '2026-08-07', slot: '05:00 PM', status: 'Pending' },
  ]);

  const [seatBookings] = useState([
    { id: 'SEAT-1001', name: 'Vikram Joshi', phone: '9765432109', email: 'vikram@gmail.com', exam: 'UPSC', seatNo: 'S-14', amount: '₹2,200', date: '2026-07-27', status: 'Confirmed & Paid' },
    { id: 'SEAT-1002', name: 'Pooja Shinde', phone: '9890123456', email: 'pooja@gmail.com', exam: 'MPSC', seatNo: 'S-22', amount: '₹2,200', date: '2026-07-26', status: 'Confirmed & Paid' },
  ]);

  const [sponsorships] = useState([
    { id: 'SPON-501', name: 'Ganesh More', phone: '9654321098', email: 'ganesh@gmail.com', exam: 'MPSC', income: 'Below ₹1.5L', age: '22', date: '2026-07-25', status: 'Under Review' },
    { id: 'SPON-502', name: 'Swati Pawar', phone: '9543210987', email: 'swati@gmail.com', exam: 'UPSC', income: '₹1.5L - ₹3.0L', age: '24', date: '2026-07-24', status: 'Approved' },
  ]);

  const [messages] = useState([
    { id: 'MSG-301', name: 'Anand Kumar', phone: '9432109876', email: 'anand@gmail.com', role: 'Donor', message: 'I want to donate ₹24,000 for a student annual seat.', date: '2026-07-27' },
    { id: 'MSG-302', name: 'Kavita Jadhav', phone: '9321098765', email: 'kavita@gmail.com', role: 'Aspirant', message: 'Is study hall open on Sundays?', date: '2026-07-26' },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'jhanvit2026' || passwordInput === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid admin password. (Default demo: jhanvit2026)');
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((obj) => Object.values(obj).map((v) => `"${v}"`).join(','));
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900 text-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4 pt-32 pb-20">
          <div className="bg-slate-800 p-8 rounded-3xl max-w-md w-full border border-slate-700 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-[#0090b0] text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <Lock className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-white">Admin Portal Login</h2>
              <p className="text-xs text-slate-400">Jhanvit Foundation Admin Dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Enter Admin Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter password..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-[#0090b0] focus:outline-none"
                />
              </div>

              {authError && <p className="text-xs text-red-400 bg-red-950/60 p-2.5 rounded-lg border border-red-800">{authError}</p>}

              <button
                type="submit"
                className="w-full bg-[#0090b0] hover:bg-[#00667e] text-white font-bold py-3.5 rounded-xl text-xs shadow-lg transition"
              >
                Login to Admin Dashboard
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 text-white p-6 rounded-3xl shadow-lg border border-slate-800 mb-8">
          <div>
            <span className="text-xs font-bold text-[#f5b82e] uppercase tracking-wider">Jhanvit Admin Panel</span>
            <h1 className="text-2xl font-extrabold text-white">All Bookings & Submissions</h1>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-4 py-2 rounded-xl transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Tab Navigation & Export Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('consultations')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'consultations' ? 'bg-[#0090b0] text-white shadow' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Consultations ({consultations.length})
            </button>
            <button
              onClick={() => setActiveTab('seats')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'seats' ? 'bg-[#801800] text-white shadow' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-4 h-4" /> Seat Bookings ({seatBookings.length})
            </button>
            <button
              onClick={() => setActiveTab('sponsorships')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'sponsorships' ? 'bg-amber-600 text-white shadow' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <HeartHandshake className="w-4 h-4" /> Sponsorships ({sponsorships.length})
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'contacts' ? 'bg-slate-900 text-white shadow' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Messages ({messages.length})
            </button>
          </div>

          <button
            onClick={() => {
              if (activeTab === 'consultations') exportToCSV(consultations, 'Jhanvit_Consultations');
              if (activeTab === 'seats') exportToCSV(seatBookings, 'ANUBHAVV_Seats');
              if (activeTab === 'sponsorships') exportToCSV(sponsorships, 'Jhanvit_Sponsorships');
              if (activeTab === 'contacts') exportToCSV(messages, 'Jhanvit_Messages');
            }}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow transition"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Data Tables */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {activeTab === 'consultations' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Phone / Email</th>
                    <th className="p-4">Exam & Stage</th>
                    <th className="p-4">Preferred Slot</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {consultations.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="p-4 font-mono font-bold text-[#0090b0]">{row.id}</td>
                      <td className="p-4 font-semibold text-slate-900">{row.name}</td>
                      <td className="p-4 text-slate-600">{row.phone} <br /> {row.email}</td>
                      <td className="p-4 text-slate-700">{row.exam} — {row.stage}</td>
                      <td className="p-4 text-slate-700">{row.date} @ {row.slot}</td>
                      <td className="p-4">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-[11px]">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'seats' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Phone / Email</th>
                    <th className="p-4">Seat Allocated</th>
                    <th className="p-4">Amount Paid</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {seatBookings.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="p-4 font-mono font-bold text-[#801800]">{row.id}</td>
                      <td className="p-4 font-semibold text-slate-900">{row.name}</td>
                      <td className="p-4 text-slate-600">{row.phone} <br /> {row.email}</td>
                      <td className="p-4 font-bold text-slate-900">{row.seatNo} ({row.exam})</td>
                      <td className="p-4 font-bold text-emerald-700">{row.amount}</td>
                      <td className="p-4">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-[11px]">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'sponsorships' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Applicant</th>
                    <th className="p-4">Phone / Email</th>
                    <th className="p-4">Exam & Income</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sponsorships.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="p-4 font-mono font-bold text-amber-600">{row.id}</td>
                      <td className="p-4 font-semibold text-slate-900">{row.name} (Age {row.age})</td>
                      <td className="p-4 text-slate-600">{row.phone} <br /> {row.email}</td>
                      <td className="p-4 text-slate-700">{row.exam} — {row.income}</td>
                      <td className="p-4 text-slate-700">{row.date}</td>
                      <td className="p-4">
                        <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-full text-[11px]">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Phone / Email</th>
                    <th className="p-4">Message</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {messages.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="p-4 font-mono font-bold text-slate-700">{row.id}</td>
                      <td className="p-4 font-semibold text-slate-900">{row.name}</td>
                      <td className="p-4 text-slate-700 font-bold">{row.role}</td>
                      <td className="p-4 text-slate-600">{row.phone} <br /> {row.email}</td>
                      <td className="p-4 text-slate-700 max-w-xs leading-relaxed">{row.message}</td>
                      <td className="p-4 text-slate-500">{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
