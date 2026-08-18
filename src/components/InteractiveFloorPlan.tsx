'use client';

import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Lock,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CreditCard,
  QrCode,
  ArrowRight,
  DoorOpen,
  Coffee,
  Briefcase,
  Bath,
  Sparkles,
  AlertCircle,
  Calendar,
  Phone,
  Mail,
  User,
  BookOpen,
  ShieldCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export type SeatTier = 'green' | 'yellow' | 'pink';

export interface Seat {
  id: number;
  label: string;
  tier: SeatTier;
  price: number;
  width?: number; // 1 = standard, 2 = double wide
}

export const TIER_INFO: Record<SeatTier, { name: string; price: number; badgeBg: string; textCol: string; borderCol: string; hoverBg: string; cardBorder: string; cardBg: string; buttonBg: string }> = {
  green: {
    name: 'Green Seat',
    price: 1800,
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    textCol: 'text-emerald-700',
    borderCol: 'border-emerald-600',
    hoverBg: 'hover:bg-emerald-600 hover:text-white',
    cardBorder: 'border-emerald-500',
    cardBg: 'bg-emerald-50/40',
    buttonBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  },
  yellow: {
    name: 'Yellow Seat',
    price: 2000,
    badgeBg: 'bg-amber-50 text-amber-900 border-amber-300',
    textCol: 'text-amber-700',
    borderCol: 'border-amber-500',
    hoverBg: 'hover:bg-amber-500 hover:text-white',
    cardBorder: 'border-amber-500',
    cardBg: 'bg-amber-50/40',
    buttonBg: 'bg-amber-500 hover:bg-amber-600 text-white',
  },
  pink: {
    name: 'Pink Seat',
    price: 2200,
    badgeBg: 'bg-purple-50 text-purple-900 border-purple-300',
    textCol: 'text-purple-700',
    borderCol: 'border-purple-500',
    hoverBg: 'hover:bg-purple-600 hover:text-white',
    cardBorder: 'border-purple-500',
    cardBg: 'bg-purple-50/40',
    buttonBg: 'bg-purple-600 hover:bg-purple-700 text-white',
  },
};

// --- Exact 1:1 Seat Database matching the uploaded floor plan ---
export const SEATS_DATA: Seat[] = [
  // Left Wing - Block 1
  { id: 108, label: '108', tier: 'green', price: 1800, width: 1 },
  { id: 107, label: '107', tier: 'green', price: 1800, width: 1 },
  { id: 106, label: '106', tier: 'green', price: 1800, width: 1 },
  { id: 105, label: '105', tier: 'pink', price: 2200, width: 2 },

  { id: 109, label: '109', tier: 'green', price: 1800, width: 1 },
  { id: 110, label: '110', tier: 'green', price: 1800, width: 1 },
  { id: 111, label: '111', tier: 'green', price: 1800, width: 1 },
  { id: 112, label: '112', tier: 'green', price: 1800, width: 1 },
  { id: 113, label: '113', tier: 'green', price: 1800, width: 1 },

  { id: 5, label: '5', tier: 'green', price: 1800, width: 1 },
  { id: 4, label: '4', tier: 'green', price: 1800, width: 1 },
  { id: 3, label: '3', tier: 'green', price: 1800, width: 1 },
  { id: 2, label: '2', tier: 'green', price: 1800, width: 1 },
  { id: 1, label: '1', tier: 'green', price: 1800, width: 1 },

  // Left Wing - Block 2
  { id: 9, label: '9', tier: 'pink', price: 2200, width: 1 },
  { id: 7, label: '7', tier: 'pink', price: 2200, width: 2 },
  { id: 6, label: '6', tier: 'pink', price: 2200, width: 2 },

  { id: 16, label: '16', tier: 'green', price: 1800, width: 1 },
  { id: 15, label: '15', tier: 'green', price: 1800, width: 1 },
  { id: 14, label: '14', tier: 'green', price: 1800, width: 1 },
  { id: 12, label: '12', tier: 'green', price: 1800, width: 1 },
  { id: 11, label: '11', tier: 'green', price: 1800, width: 1 },

  { id: 18, label: '18', tier: 'green', price: 1800, width: 1 },
  { id: 19, label: '19', tier: 'green', price: 1800, width: 1 },
  { id: 20, label: '20', tier: 'green', price: 1800, width: 1 },
  { id: 21, label: '21', tier: 'green', price: 1800, width: 1 },
  { id: 22, label: '22', tier: 'green', price: 1800, width: 1 },

  { id: 26, label: '26', tier: 'pink', price: 2200, width: 2 },
  { id: 25, label: '25', tier: 'green', price: 1800, width: 1 },
  { id: 24, label: '24', tier: 'green', price: 1800, width: 1 },
  { id: 23, label: '23', tier: 'green', price: 1800, width: 1 },

  // Left Wing - Block 3
  { id: 27, label: '27', tier: 'green', price: 1800, width: 1 },
  { id: 28, label: '28', tier: 'green', price: 1800, width: 1 },
  { id: 29, label: '29', tier: 'green', price: 1800, width: 1 },
  { id: 30, label: '30', tier: 'green', price: 1800, width: 1 },
  { id: 31, label: '31', tier: 'green', price: 1800, width: 1 },

  { id: 37, label: '37', tier: 'green', price: 1800, width: 1 },
  { id: 36, label: '36', tier: 'green', price: 1800, width: 1 },
  { id: 35, label: '35', tier: 'green', price: 1800, width: 1 },
  { id: 34, label: '34', tier: 'green', price: 1800, width: 1 },
  { id: 33, label: '33', tier: 'green', price: 1800, width: 1 },

  { id: 38, label: '38', tier: 'green', price: 1800, width: 1 },
  { id: 39, label: '39', tier: 'green', price: 1800, width: 1 },
  { id: 40, label: '40', tier: 'green', price: 1800, width: 1 },
  { id: 41, label: '41', tier: 'green', price: 1800, width: 1 },
  { id: 42, label: '42', tier: 'green', price: 1800, width: 1 },

  // Left Wing - Block 4
  { id: 46, label: '46', tier: 'pink', price: 2200, width: 1 },

  { id: 45, label: '45', tier: 'pink', price: 2200, width: 1 },
  { id: 44, label: '44', tier: 'pink', price: 2200, width: 2 },
  { id: 43, label: '43', tier: 'pink', price: 2200, width: 2 },

  { id: 51, label: '51', tier: 'green', price: 1800, width: 1 },
  { id: 50, label: '50', tier: 'green', price: 1800, width: 1 },
  { id: 49, label: '49', tier: 'green', price: 1800, width: 1 },
  { id: 48, label: '48', tier: 'green', price: 1800, width: 1 },
  { id: 47, label: '47', tier: 'green', price: 1800, width: 1 },

  // Middle/Right Wing - Block M1 (Yellow Section)
  { id: 104, label: '104', tier: 'yellow', price: 2000, width: 1 },
  { id: 103, label: '103', tier: 'yellow', price: 2000, width: 1 },
  { id: 102, label: '102', tier: 'yellow', price: 2000, width: 1 },

  { id: 99, label: '99', tier: 'yellow', price: 2000, width: 1 },
  { id: 100, label: '100', tier: 'yellow', price: 2000, width: 1 },
  { id: 101, label: '101', tier: 'yellow', price: 2000, width: 1 },

  { id: 98, label: '98', tier: 'yellow', price: 2000, width: 1 },
  { id: 97, label: '97', tier: 'yellow', price: 2000, width: 1 },
  { id: 96, label: '96', tier: 'yellow', price: 2000, width: 1 },

  // Middle/Right Wing - Block M2
  { id: 93, label: '93', tier: 'yellow', price: 2000, width: 1 },
  { id: 94, label: '94', tier: 'yellow', price: 2000, width: 1 },
  { id: 95, label: '95', tier: 'yellow', price: 2000, width: 1 },

  { id: 123, label: '123', tier: 'green', price: 1800, width: 1 },
  { id: 124, label: '124', tier: 'green', price: 1800, width: 1 },

  // Middle/Right Wing - Block M3
  { id: 92, label: '92', tier: 'yellow', price: 2000, width: 1 },
  { id: 91, label: '91', tier: 'yellow', price: 2000, width: 1 },
  { id: 90, label: '90', tier: 'yellow', price: 2000, width: 1 },

  { id: 87, label: '87', tier: 'yellow', price: 2000, width: 1 },
  { id: 88, label: '88', tier: 'yellow', price: 2000, width: 1 },
  { id: 89, label: '89', tier: 'yellow', price: 2000, width: 1 },

  // Long Middle Horizontal Row 1 (Extending to right wall)
  { id: 86, label: '86', tier: 'green', price: 1800, width: 1 },
  { id: 85, label: '85', tier: 'green', price: 1800, width: 1 },
  { id: 84, label: '84', tier: 'green', price: 1800, width: 1 },
  { id: 83, label: '83', tier: 'green', price: 1800, width: 1 },
  { id: 82, label: '82', tier: 'green', price: 1800, width: 1 },
  { id: 81, label: '81', tier: 'green', price: 1800, width: 1 },
  { id: 79, label: '79', tier: 'green', price: 1800, width: 1 },
  { id: 78, label: '78', tier: 'green', price: 1800, width: 1 },

  // Long Middle Horizontal Row 2
  { id: 70, label: '70', tier: 'green', price: 1800, width: 1 },
  { id: 71, label: '71', tier: 'green', price: 1800, width: 1 },
  { id: 72, label: '72', tier: 'green', price: 1800, width: 1 },
  { id: 73, label: '73', tier: 'green', price: 1800, width: 1 },
  { id: 74, label: '74', tier: 'green', price: 1800, width: 1 },
  { id: 75, label: '75', tier: 'green', price: 1800, width: 1 },
  { id: 76, label: '76', tier: 'green', price: 1800, width: 1 },
  { id: 77, label: '77', tier: 'green', price: 1800, width: 1 },
  { id: 122, label: '122', tier: 'green', price: 1800, width: 1 },

  // Middle/Right Wing - Block M4
  { id: 69, label: '69', tier: 'green', price: 1800, width: 1 },
  { id: 114, label: '114', tier: 'green', price: 1800, width: 1 },
  { id: 116, label: '116', tier: 'green', price: 1800, width: 1 },
  { id: 117, label: '117', tier: 'green', price: 1800, width: 1 },
  { id: 120, label: '120', tier: 'pink', price: 2200, width: 2 },

  { id: 68, label: '68', tier: 'green', price: 1800, width: 1 },
  { id: 67, label: '67', tier: 'green', price: 1800, width: 1 },
  { id: 66, label: '66', tier: 'green', price: 1800, width: 1 },
  { id: 65, label: '65', tier: 'green', price: 1800, width: 1 },
  { id: 64, label: '64', tier: 'green', price: 1800, width: 1 },
  { id: 63, label: '63', tier: 'green', price: 1800, width: 1 },
  { id: 62, label: '62', tier: 'green', price: 1800, width: 1 },

  // Bottom Perimeter Row
  { id: 52, label: '52', tier: 'green', price: 1800, width: 1 },
  { id: 53, label: '53', tier: 'green', price: 1800, width: 1 },
  { id: 54, label: '54', tier: 'green', price: 1800, width: 1 },
  { id: 55, label: '55', tier: 'green', price: 1800, width: 1 },
  { id: 56, label: '56', tier: 'green', price: 1800, width: 1 },
  { id: 57, label: '57', tier: 'green', price: 1800, width: 1 },
  { id: 58, label: '58', tier: 'green', price: 1800, width: 1 },
  { id: 59, label: '59', tier: 'green', price: 1800, width: 1 },
  { id: 60, label: '60', tier: 'pink', price: 2200, width: 2 },
  { id: 61, label: '61', tier: 'green', price: 1800, width: 1 },
];

export const OCCUPIED_SEATS = [3, 4, 11, 12, 18, 25, 27, 33, 40, 41, 55, 62, 70, 71, 78, 85, 90, 94, 98, 102, 110, 114];

export default function InteractiveFloorPlan() {
  const [selectedSeatId, setSelectedSeatId] = useState<number | null>(null);
  const [filterTier, setFilterTier] = useState<'all' | SeatTier | 'available'>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    exam: 'UPSC Civil Services',
    startDate: todayStr,
    paymentMethod: 'upi',
  });

  // Touched state for realtime validation
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const occupiedSet = useMemo(() => new Set(OCCUPIED_SEATS), []);
  const seatMap = useMemo(() => new Map(SEATS_DATA.map((s) => [s.id, s])), []);
  const selectedSeat = useMemo(() => (selectedSeatId ? seatMap.get(selectedSeatId) || null : null), [selectedSeatId, seatMap]);

  const getSeat = (id: number): Seat => {
    return seatMap.get(id) || { id, label: String(id), tier: 'green', price: 1800, width: 1 };
  };

  // Count available seats per tier
  const tierCounts = useMemo(() => {
    const counts = { green: 0, yellow: 0, pink: 0 };
    SEATS_DATA.forEach((s) => {
      if (!occupiedSet.has(s.id)) {
        counts[s.tier]++;
      }
    });
    return counts;
  }, [occupiedSet]);

  // Robust Form Validation Rules
  const formErrors = useMemo(() => {
    const errors: Record<string, string> = {};

    // 1. Full Name Validation: At least 3 chars, letters and spaces
    const cleanName = formData.fullName.trim();
    if (!cleanName) {
      errors.fullName = 'Full name is required';
    } else if (cleanName.length < 3) {
      errors.fullName = 'Name must be at least 3 characters';
    } else if (!/^[a-zA-Z\s.]+$/.test(cleanName)) {
      errors.fullName = 'Name can only contain letters and spaces';
    }

    // 2. Mobile / WhatsApp: Valid Indian 10-digit number starting with 6-9
    const cleanPhone = formData.phone.trim().replace(/\D/g, '');
    if (!cleanPhone) {
      errors.phone = 'Mobile number is required';
    } else if (cleanPhone.length !== 10) {
      errors.phone = 'Must be exactly 10 digits';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errors.phone = 'Enter a valid Indian mobile number starting with 6, 7, 8, or 9';
    }

    // 3. Email Validation: Standard format
    const cleanEmail = formData.email.trim();
    if (!cleanEmail) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      errors.email = 'Please enter a valid email address (e.g. name@domain.com)';
    }

    // 4. Start Date Validation: Must not be in the past
    if (!formData.startDate) {
      errors.startDate = 'Start date is required';
    } else if (formData.startDate < todayStr) {
      errors.startDate = 'Start date cannot be in the past';
    }

    return errors;
  }, [formData, todayStr]);

  const isFormValid = Object.keys(formErrors).length === 0;

  // Pick a random unoccupied seat in a tier
  const selectRandomSeat = (tier: SeatTier) => {
    const availableSeats = SEATS_DATA.filter((s) => s.tier === tier && !occupiedSet.has(s.id));
    if (availableSeats.length === 0) return;
    const randomIndex = Math.floor(Math.random() * availableSeats.length);
    const chosenSeat = availableSeats[randomIndex];
    setSelectedSeatId(chosenSeat.id);
    
    // Smooth scroll to seat map
    const el = document.getElementById('seat-map');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const calculatePricing = () => {
    if (!selectedSeat) {
      return { monthlyRate: 0, grossTotal: 0, deposit: 200, total: 0 };
    }
    const monthlyRate = selectedSeat.price;
    const grossTotal = monthlyRate * selectedDuration;
    const deposit = 200;
    const total = grossTotal + deposit;
    return { monthlyRate, grossTotal, deposit, total };
  };

  const pricing = calculatePricing();

  const handleSeatClick = (seat: Seat) => {
    if (occupiedSet.has(seat.id)) return;
    if (selectedSeatId === seat.id) {
      setSelectedSeatId(null);
    } else {
      setSelectedSeatId(seat.id);
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Touch all fields to reveal all errors if invalid
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      startDate: true,
    });

    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccess(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }, 1000);
  };

  // Render individual seat cell with high legibility and crisp numbers
  const renderCell = (id: number, widthOverride?: number, customClass = '') => {
    const seat = getSeat(id);
    const isOccupied = occupiedSet.has(seat.id);
    const isSelected = selectedSeatId === seat.id;
    const width = widthOverride || seat.width || 1;

    const isDimmed =
      filterTier === 'all'
        ? false
        : filterTier === 'available'
        ? isOccupied
        : seat.tier !== filterTier;

    let styleClass = '';
    if (isOccupied) {
      styleClass = 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed';
    } else if (isSelected) {
      styleClass = 'bg-[#0090b0] text-white border-[#00667e] shadow-lg ring-4 ring-[#0090b0]/40 font-black z-20 scale-[1.03]';
    } else {
      if (seat.tier === 'green') {
        styleClass = 'bg-white text-emerald-800 border-emerald-500 hover:bg-emerald-600 hover:text-white shadow-xs hover:shadow-md';
      } else if (seat.tier === 'yellow') {
        styleClass = 'bg-white text-amber-900 border-amber-500 hover:bg-amber-500 hover:text-white shadow-xs hover:shadow-md';
      } else if (seat.tier === 'pink') {
        styleClass = 'bg-white text-purple-900 border-purple-500 hover:bg-purple-600 hover:text-white shadow-xs hover:shadow-md';
      }
    }

    return (
      <button
        key={seat.id}
        type="button"
        disabled={isOccupied}
        onClick={() => handleSeatClick(seat)}
        style={{ gridColumn: `span ${width}` }}
        className={`h-11 border-2 rounded-lg text-sm sm:text-[15px] font-extrabold tracking-tight transition-all duration-150 flex items-center justify-center relative select-none ${styleClass} ${customClass} ${
          isDimmed ? 'opacity-20 grayscale' : 'opacity-100'
        }`}
      >
        <span>{seat.label}</span>
        {isOccupied && <Lock className="w-3 h-3 absolute top-1 right-1 opacity-40" />}
      </button>
    );
  };

  return (
    <div className="w-full space-y-8">
      {/* 3 Tier Overview Cards with Instant Random Picker */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {/* Green Tier Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border-2 border-emerald-500/80 hover:border-emerald-500 transition-all flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black border border-emerald-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                GREEN SEATS
              </span>
              <span className="text-xs font-bold text-slate-500">
                {tierCounts.green} Available
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-black text-slate-900">₹1,800</span>
                <span className="text-slate-500 text-sm font-semibold">/ month</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => selectRandomSeat('green')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl text-center text-sm transition shadow-sm flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Select Green Seat</span>
          </button>
        </div>

        {/* Yellow Tier Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border-2 border-amber-500/80 hover:border-amber-500 transition-all flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-black border border-amber-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                YELLOW SEATS
              </span>
              <span className="text-xs font-bold text-slate-500">
                {tierCounts.yellow} Available
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-black text-slate-900">₹2,000</span>
                <span className="text-slate-500 text-sm font-semibold">/ month</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => selectRandomSeat('yellow')}
            className="w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl text-center text-sm transition shadow-sm flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Select Yellow Seat</span>
          </button>
        </div>

        {/* Pink Tier Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border-2 border-purple-500/80 hover:border-purple-500 transition-all flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-900 text-xs font-black border border-purple-300">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                PINK SEATS
              </span>
              <span className="text-xs font-bold text-slate-500">
                {tierCounts.pink} Available
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-black text-slate-900">₹2,200</span>
                <span className="text-slate-500 text-sm font-semibold">/ month</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => selectRandomSeat('pink')}
            className="w-full bg-purple-600 hover:bg-purple-700 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl text-center text-sm transition shadow-sm flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Select Pink Seat</span>
          </button>
        </div>
      </div>

      {/* Top Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Tier Filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold">
          <span className="text-slate-500 uppercase tracking-wider text-xs mr-1">Filter View:</span>

          <button
            onClick={() => setFilterTier(filterTier === 'green' ? 'all' : 'green')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 transition ${
              filterTier === 'green'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                : 'bg-emerald-50 text-emerald-800 border-emerald-600 hover:bg-emerald-100'
            }`}
          >
            <span className="w-3.5 h-3.5 border-2 border-emerald-600 bg-white rounded-xs inline-block"></span>
            <span>Green (₹1,800)</span>
          </button>

          <button
            onClick={() => setFilterTier(filterTier === 'yellow' ? 'all' : 'yellow')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 transition ${
              filterTier === 'yellow'
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-amber-50 text-amber-900 border-amber-500 hover:bg-amber-100'
            }`}
          >
            <span className="w-3.5 h-3.5 border-2 border-amber-500 bg-white rounded-xs inline-block"></span>
            <span>Yellow (₹2,000)</span>
          </button>

          <button
            onClick={() => setFilterTier(filterTier === 'pink' ? 'all' : 'pink')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 transition ${
              filterTier === 'pink'
                ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                : 'bg-purple-50 text-purple-900 border-purple-500 hover:bg-purple-100'
            }`}
          >
            <span className="w-3.5 h-3.5 border-2 border-purple-500 bg-white rounded-xs inline-block"></span>
            <span>Pink (₹2,200)</span>
          </button>

          <button
            onClick={() => setFilterTier(filterTier === 'available' ? 'all' : 'available')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition ${
              filterTier === 'available'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Available Only</span>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 border border-slate-200 self-end md:self-auto">
          <button
            onClick={() => setZoomLevel((prev) => Math.max(0.75, prev - 0.1))}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold px-2.5 text-slate-700">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((prev) => Math.min(1.25, prev + 0.1))}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setZoomLevel(1);
              setFilterTier('all');
            }}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition ml-1"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Blueprint Drawing Canvas: Clean & Full Width */}
      <div className="w-full bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto pb-2 pt-1">
          {/* Main Architectural Layout */}
          <div
            className="min-w-[960px] w-full bg-slate-50/70 p-6 sm:p-8 rounded-2xl transition-transform origin-top duration-200 relative"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Layout Grid: Left Wing (5 cols) + Center Aisle (with Pantry) + Right Wing (7 cols) */}
            <div className="grid grid-cols-[5fr_auto_7fr] gap-6 sm:gap-8 items-start">
              
              {/* ================= LEFT WING (5 Columns) ================= */}
              <div>
                {/* 1. Standalone Row 1: 108-105 */}
                <div className="grid grid-cols-5 gap-1">
                  {renderCell(108)}
                  {renderCell(107)}
                  {renderCell(106)}
                  {renderCell(105, 2)}
                </div>

                {/* Standard Walkway Aisle Gap between 108-105 and 109-113 */}
                <div className="h-6" />

                {/* 2. Back-to-Back Cluster: [109-113] & [5-1] */}
                <div className="space-y-0.5">
                  <div className="grid grid-cols-5 gap-1">
                    {renderCell(109)}
                    {renderCell(110)}
                    {renderCell(111)}
                    {renderCell(112)}
                    {renderCell(113)}
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {renderCell(5)}
                    {renderCell(4)}
                    {renderCell(3)}
                    {renderCell(2)}
                    {renderCell(1)}
                  </div>
                </div>

                {/* Standard Walkway Aisle Gap between [5] and [9] */}
                <div className="h-6" />

                {/* 3. Back-to-Back Cluster: [9, 7, 6] & [16, 15, 14, 12, 11] */}
                <div className="space-y-0.5">
                  <div className="grid grid-cols-5 gap-1">
                    {renderCell(9)}
                    {renderCell(7, 2)}
                    {renderCell(6, 2)}
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {renderCell(16)}
                    {renderCell(15)}
                    {renderCell(14)}
                    {renderCell(12)}
                    {renderCell(11)}
                  </div>
                </div>

                {/* Standard Walkway Aisle Gap between [16] and [18] */}
                <div className="h-6" />

                {/* 4. Back-to-Back Cluster: [18-22] & [26-23] */}
                <div className="space-y-0.5">
                  <div className="grid grid-cols-5 gap-1">
                    {renderCell(18)}
                    {renderCell(19)}
                    {renderCell(20)}
                    {renderCell(21)}
                    {renderCell(22)}
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {renderCell(26, 2)}
                    {renderCell(25)}
                    {renderCell(24)}
                    {renderCell(23)}
                  </div>
                </div>

                {/* Standard Walkway Aisle Gap between [26] and [27] */}
                <div className="h-6" />

                {/* 5. Back-to-Back Cluster: [27-31] & [37-33] */}
                <div className="space-y-0.5">
                  <div className="grid grid-cols-5 gap-1">
                    {renderCell(27)}
                    {renderCell(28)}
                    {renderCell(29)}
                    {renderCell(30)}
                    {renderCell(31)}
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {renderCell(37)}
                    {renderCell(36)}
                    {renderCell(35)}
                    {renderCell(34)}
                    {renderCell(33)}
                  </div>
                </div>

                {/* Gap between 37 and 38 */}
                <div className="h-6" />

                {/* 6. Consecutive Block: [38-42], [46], [45, 44, 43], [51-47] (NO GAP b/w 38 and 46) */}
                <div className="space-y-0.5">
                  <div className="grid grid-cols-5 gap-1">
                    {renderCell(38)}
                    {renderCell(39)}
                    {renderCell(40)}
                    {renderCell(41)}
                    {renderCell(42)}
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {renderCell(46)}
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {renderCell(45)}
                    {renderCell(44, 2)}
                    {renderCell(43, 2)}
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {renderCell(51)}
                    {renderCell(50)}
                    {renderCell(49)}
                    {renderCell(48)}
                    {renderCell(47)}
                  </div>
                </div>
              </div>

              {/* ================= CENTER AISLE: PANTRY AT TOP (BETWEEN 105 & 104) ================= */}
              <div className="flex flex-col items-center pt-0.5 px-1">
                <div className="flex items-center gap-1.5 bg-amber-50 border-2 border-amber-400 text-amber-900 rounded-md px-3 py-2 text-xs font-black shadow-xs whitespace-nowrap">
                  <Coffee className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Pantry</span>
                </div>
              </div>

              {/* ================= MIDDLE & RIGHT WING (7 Columns) ================= */}
              <div>
                {/* 1. Standalone Row: [104, 103, 102] */}
                <div className="w-[58%]">
                  <div className="grid grid-cols-3 gap-1">
                    {renderCell(104)}
                    {renderCell(103)}
                    {renderCell(102)}
                  </div>
                </div>

                {/* Standardized Walkway Gap between 104 and 99 */}
                <div className="h-6" />

                {/* 2. Back-to-Back Rows: [99, 100, 101] & [98, 97, 96] */}
                <div className="w-[58%] space-y-0.5">
                  <div className="grid grid-cols-3 gap-1">
                    {renderCell(99)}
                    {renderCell(100)}
                    {renderCell(101)}
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {renderCell(98)}
                    {renderCell(97)}
                    {renderCell(96)}
                  </div>
                </div>

                {/* Standardized Walkway Gap between 98 and 93 */}
                <div className="h-6" />

                {/* 3. Back-to-Back Rows: [93, 94, 95] & [123, Passage, 124] */}
                <div className="w-[58%] space-y-0.5">
                  <div className="grid grid-cols-3 gap-1">
                    {renderCell(93)}
                    {renderCell(94)}
                    {renderCell(95)}
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {renderCell(123)}
                    <div className="h-11 border-2 border-dashed border-slate-200 bg-white rounded-md flex items-center justify-center text-xs text-slate-400 font-mono">
                      Passage
                    </div>
                    {renderCell(124)}
                  </div>
                </div>

                {/* Standardized Walkway Gap between 123/124 and 92 WITH ENTRANCE */}
                <div className="h-6 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-emerald-600 text-white border-2 border-emerald-700 rounded-lg px-3.5 py-1.5 text-xs font-black shadow-md z-20">
                    <DoorOpen className="w-4 h-4 text-emerald-100 shrink-0" />
                    <span>ENTRANCE</span>
                  </div>
                </div>

                {/* 4. Standalone Row: [92, 91, 90] */}
                <div className="w-[58%]">
                  <div className="grid grid-cols-3 gap-1">
                    {renderCell(92)}
                    {renderCell(91)}
                    {renderCell(90)}
                  </div>
                </div>

                {/* Gap between 92 and 87 */}
                <div className="h-6" />

                {/* 5. Back-to-Back Block: [87, 88, 89] & [86-78] (NO GAP b/w 87 and 86) */}
                <div className="space-y-0.5">
                  <div className="w-[58%] grid grid-cols-3 gap-1">
                    {renderCell(87)}
                    {renderCell(88)}
                    {renderCell(89)}
                  </div>
                  {/* Standalone Long Row 8: [86-78] directly touching 87-89 */}
                  <div className="grid grid-cols-8 gap-1">
                    {renderCell(86)}
                    {renderCell(85)}
                    {renderCell(84)}
                    {renderCell(83)}
                    {renderCell(82)}
                    {renderCell(81)}
                    {renderCell(79)}
                    {renderCell(78)}
                  </div>
                </div>

                {/* Gap between 86 and 70 */}
                <div className="h-6" />

                {/* 6. Row 9: [70-77] with [122] under 77 */}
                <div className="space-y-0.5">
                  <div className="grid grid-cols-8 gap-1">
                    {renderCell(70)}
                    {renderCell(71)}
                    {renderCell(72)}
                    {renderCell(73)}
                    {renderCell(74)}
                    {renderCell(75)}
                    {renderCell(76)}
                    {renderCell(77)}
                  </div>
                  <div className="grid grid-cols-8 gap-1">
                    <div className="col-span-7" />
                    {renderCell(122)}
                  </div>
                </div>

                {/* BIG Walkway Gap between 70 and 69 */}
                <div className="h-10" />

                {/* 7. Lower Block: [69, 114, 116, 117, 120] & [68-62] */}
                <div className="space-y-0.5">
                  <div className="grid grid-cols-6 gap-1">
                    {renderCell(69)}
                    {renderCell(114)}
                    {renderCell(116)}
                    {renderCell(117)}
                    {renderCell(120, 2)}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {renderCell(68)}
                    {renderCell(67)}
                    {renderCell(66)}
                    {renderCell(65)}
                    {renderCell(64)}
                    {renderCell(63)}
                    {renderCell(62)}
                  </div>
                </div>
              </div>
            </div>

            {/* Symmetrical Bottom Aisle Gap before bottom perimeter row */}
            <div className="h-8" />

            {/* ================= BOTTOM ROW (52-61) ================= */}
            {/* Office on left of 52, Desks 52-61, Bathroom beside 61 on the right */}
            <div className="border-t-2 border-slate-200/80 pt-3">
              <div className="flex flex-nowrap items-stretch gap-1.5 w-full">
                {/* Office / Consultation on left of 52 */}
                <div className="flex-1 min-w-[95px] border-2 border-[#0090b0] bg-cyan-50 rounded-md p-1.5 flex flex-col items-center justify-center text-center shadow-xs">
                  <Briefcase className="w-4 h-4 text-[#0090b0] mb-0.5 shrink-0" />
                  <span className="text-xs font-black text-[#00667e] leading-tight">
                    Office / Consultation
                  </span>
                </div>

                {/* Desks 52 to 61 */}
                <div className="flex-[10] grid grid-cols-11 gap-1">
                  {renderCell(52)}
                  {renderCell(53)}
                  {renderCell(54)}
                  {renderCell(55)}
                  {renderCell(56)}
                  {renderCell(57)}
                  {renderCell(58)}
                  {renderCell(59)}
                  {renderCell(60, 2)}
                  {renderCell(61)}
                </div>

                {/* Bathroom directly beside 61 on the right */}
                <div className="flex-1 min-w-[95px] border-2 border-slate-400 bg-slate-100 rounded-md p-1.5 flex flex-col items-center justify-center text-center shadow-xs">
                  <Bath className="w-4 h-4 text-slate-600 mb-0.5 shrink-0" />
                  <span className="text-xs font-black text-slate-700 leading-tight">
                    Bathroom
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Seat Booking Summary Card */}
      {selectedSeat && (
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-lg border-2 border-[#0090b0] space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs text-[#0090b0] uppercase font-black tracking-wider">
                Selected Desk
              </span>
              <h4 className="text-2xl font-black text-slate-900">
                Seat {selectedSeat.label} • {TIER_INFO[selectedSeat.tier].name}
              </h4>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-500 font-semibold">Monthly Seat Fee</span>
              <div className="text-2xl font-black text-slate-900">
                ₹{selectedSeat.price.toLocaleString()}
                <span className="text-xs font-normal text-slate-500"> / mo</span>
              </div>
            </div>
          </div>

          {/* Duration Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Select Study Pass Duration:
            </label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 6, 12].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedDuration(m)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition ${
                    selectedDuration === m
                      ? 'bg-[#0090b0] text-white border-[#0090b0] shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {m} {m === 1 ? 'Month' : 'Months'}
                </button>
              ))}
            </div>
          </div>

          {/* Calculation */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs sm:text-sm">
            <div className="space-y-1 text-slate-600">
              <div>
                Base Fee ({selectedDuration} Month{selectedDuration > 1 ? 's' : ''}): <strong>₹{pricing.grossTotal.toLocaleString()}</strong>
              </div>
              <div className="text-slate-500 text-xs">
                + ₹200 one-time refundable security deposit
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-right">
                <span className="text-xs uppercase font-bold text-slate-400">Total Payable</span>
                <div className="text-2xl font-black text-[#0090b0]">
                  ₹{pricing.total.toLocaleString()}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowCheckoutModal(true);
                  setBookingSuccess(false);
                }}
                className="bg-[#0090b0] hover:bg-[#00667e] active:scale-95 text-white font-bold px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2"
              >
                <span>Book Seat {selectedSeat.label}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Institutional Grade Checkout & Booking Modal */}
      {showCheckoutModal && selectedSeat && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-slate-100">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm transition"
            >
              ✕
            </button>

            {!bookingSuccess ? (
              <div className="space-y-5">
                {/* Modal Header */}
                <div className="border-b border-slate-100 pb-4 pr-8">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-[#007085] text-xs font-extrabold border border-cyan-200 mb-2">
                    RESERVE STUDY SEAT
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Book Seat {selectedSeat.label}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {TIER_INFO[selectedSeat.tier].name} • ₹{pricing.total.toLocaleString()} ({selectedDuration} Month{selectedDuration > 1 ? 's' : ''} pass + ₹200 refundable deposit)
                  </p>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4" noValidate>
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Full Legal Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        onBlur={() => handleBlur('fullName')}
                        className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                          touched.fullName && formErrors.fullName
                            ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-300'
                            : touched.fullName && !formErrors.fullName
                            ? 'border-emerald-400 bg-emerald-50/20 focus:ring-emerald-300'
                            : 'border-slate-300 focus:ring-[#0090b0] focus:border-[#0090b0]'
                        }`}
                      />
                    </div>
                    {touched.fullName && formErrors.fullName && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{formErrors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      WhatsApp / Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-slate-400 text-xs font-bold border-r border-slate-200 pr-2">
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setFormData({ ...formData, phone: val });
                        }}
                        onBlur={() => handleBlur('phone')}
                        className={`w-full pl-16 pr-3.5 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 font-mono ${
                          touched.phone && formErrors.phone
                            ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-300'
                            : touched.phone && !formErrors.phone
                            ? 'border-emerald-400 bg-emerald-50/20 focus:ring-emerald-300'
                            : 'border-slate-300 focus:ring-[#0090b0] focus:border-[#0090b0]'
                        }`}
                      />
                    </div>
                    {touched.phone && formErrors.phone ? (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{formErrors.phone}</span>
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 mt-1">Pass QR and access code will be sent to this WhatsApp.</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        placeholder="rahul.sharma@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onBlur={() => handleBlur('email')}
                        className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                          touched.email && formErrors.email
                            ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-300'
                            : touched.email && !formErrors.email
                            ? 'border-emerald-400 bg-emerald-50/20 focus:ring-emerald-300'
                            : 'border-slate-300 focus:ring-[#0090b0] focus:border-[#0090b0]'
                        }`}
                      />
                    </div>
                    {touched.email && formErrors.email && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{formErrors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Target Exam & Start Date in 2 columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Target Exam <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <BookOpen className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select
                          value={formData.exam}
                          onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0090b0] focus:outline-none bg-white font-medium"
                        >
                          <option value="UPSC Civil Services">UPSC Civil Services</option>
                          <option value="MPSC (State Services)">MPSC State Services</option>
                          <option value="Banking (IBPS/SBI/RBI)">Banking (IBPS/SBI)</option>
                          <option value="SSC / Railways">SSC / Railways</option>
                          <option value="Law / Judiciary">Law / Judiciary</option>
                          <option value="Other Govt / CA">Other Govt / CA</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Pass Start Date <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="date"
                          min={todayStr}
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          onBlur={() => handleBlur('startDate')}
                          className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                            touched.startDate && formErrors.startDate
                              ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-300'
                              : 'border-slate-300 focus:ring-[#0090b0] focus:border-[#0090b0]'
                          }`}
                        />
                      </div>
                      {touched.startDate && formErrors.startDate && (
                        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{formErrors.startDate}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Payment Mode Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Payment Mode
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                          formData.paymentMethod === 'upi'
                            ? 'bg-cyan-50 border-[#0090b0] text-[#007085] ring-1 ring-[#0090b0]'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <CreditCard className="w-3.5 h-3.5 text-[#0090b0]" />
                        <span>UPI / QR / Cards</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'desk' })}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                          formData.paymentMethod === 'desk'
                            ? 'bg-cyan-50 border-[#0090b0] text-[#007085] ring-1 ring-[#0090b0]'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#0090b0]" />
                        <span>Pay at Center Desk</span>
                      </button>
                    </div>
                  </div>

                  {/* Entity Notice */}
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs text-slate-600 space-y-0.5">
                    <div>
                      Total Payable: <strong>₹{pricing.total.toLocaleString()}</strong> ({selectedDuration} Mo Pass + ₹200 Deposit).
                    </div>
                    <div className="text-slate-500">
                      Payment credited directly to <strong>ANUBHAVV Impact Labs</strong>.
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0090b0] hover:bg-[#00667e] active:scale-[0.99] text-white font-bold py-3.5 rounded-xl shadow-md transition text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating Study Pass...
                      </span>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Confirm & Reserve Seat {selectedSeat.label} (₹{pricing.total.toLocaleString()})</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Success Confirmation Card */
              <div className="text-center py-4 space-y-5 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">
                    RESERVATION CONFIRMED
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                    Seat {selectedSeat.label} Reserved!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1">
                    Congratulations <strong>{formData.fullName}</strong>! Your {selectedDuration}-Month study pass starting from <strong>{formData.startDate}</strong> has been allocated.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl max-w-xs mx-auto space-y-2">
                  <QrCode className="w-24 h-24 mx-auto text-slate-800" />
                  <div className="text-xs font-mono font-bold text-slate-700">
                    PASS ID: ANUBHAVV-S{selectedSeat.label}-{Math.floor(1000 + Math.random() * 9000)}
                  </div>
                  <p className="text-xs text-slate-500">
                    A copy of this digital pass has been sent to WhatsApp <strong>+91 {formData.phone}</strong> and <strong>{formData.email}</strong>.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setShowCheckoutModal(false);
                      setBookingSuccess(false);
                      setSelectedSeatId(null);
                    }}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold py-3 rounded-xl transition"
                  >
                    Done & Return to Blueprint
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
