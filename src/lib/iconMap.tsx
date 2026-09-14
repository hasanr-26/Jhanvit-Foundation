import React from 'react';
import {
  AlertTriangle,
  Target,
  Eye,
  Flag,
  BookOpen,
  Building2,
  Users,
  Heart,
  ShieldCheck,
  Clock,
  Wifi,
  Lock,
  MapPin,
  Award,
  BarChart3,
  FileText,
  Coffee,
  Lightbulb,
} from 'lucide-react';
import type { IconKey } from './pageContent';

const ICONS: Record<IconKey, React.ComponentType<{ className?: string }>> = {
  alert: AlertTriangle,
  target: Target,
  eye: Eye,
  flag: Flag,
  book: BookOpen,
  building: Building2,
  users: Users,
  heart: Heart,
  shield: ShieldCheck,
  clock: Clock,
  wifi: Wifi,
  lock: Lock,
  map: MapPin,
  award: Award,
  chart: BarChart3,
  file: FileText,
  coffee: Coffee,
  lightbulb: Lightbulb,
};

/** Every key the admin can pick from, in the order shown in the picker. */
export const ICON_KEYS = Object.keys(ICONS) as IconKey[];

export function ContentIcon({ name, className }: { name: IconKey; className?: string }) {
  const Icon = ICONS[name] ?? Lightbulb;
  return <Icon className={className} />;
}
