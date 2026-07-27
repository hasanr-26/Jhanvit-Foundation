import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ConsultationBooking {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  exam: string;
  stage: string;
  brief: string;
  preferredDate: string;
  preferredTime: string;
  created_at?: string;
  status?: string;
}

export interface SeatBooking {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  exam: string;
  seatNumber: string;
  amountPaid: number;
  paymentStatus: string;
  created_at?: string;
}

export interface SponsorshipApplication {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  age: string;
  exam: string;
  prepDuration: string;
  income: string;
  reason: string;
  created_at?: string;
}

export interface ContactMessage {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  role: string;
  message: string;
  created_at?: string;
}
