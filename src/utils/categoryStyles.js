import {
  Zap,
  Landmark,
  Cpu,
  Briefcase,
  Trophy,
  Clapperboard,
  FlaskConical,
  HeartPulse,
  Leaf,
  GraduationCap,
} from 'lucide-react';

/**
 * The single source of truth for category filters. `apiValue` is the
 * string newsdata.io expects on `/latest?category=`; `label` is what's
 * shown in the UI (in <CategoryFilter> pills and <ArticleCard> badges).
 * Order here is the order pills render in.
 */
export const CATEGORIES = [
  { label: 'Breaking', apiValue: 'top', icon: Zap, classes: 'bg-coral-500/15 text-coral-500' },
  { label: 'Politics', apiValue: 'politics', icon: Landmark, classes: 'bg-mist-500/15 text-mist-300' },
  { label: 'Technology', apiValue: 'technology', icon: Cpu, classes: 'bg-teal-500/15 text-teal-500' },
  { label: 'Business', apiValue: 'business', icon: Briefcase, classes: 'bg-amber-500/15 text-amber-400' },
  { label: 'Sports', apiValue: 'sports', icon: Trophy, classes: 'bg-amber-500/15 text-amber-500' },
  { label: 'Entertainment', apiValue: 'entertainment', icon: Clapperboard, classes: 'bg-coral-500/15 text-coral-400' },
  { label: 'Science', apiValue: 'science', icon: FlaskConical, classes: 'bg-teal-500/15 text-teal-400' },
  { label: 'Health', apiValue: 'health', icon: HeartPulse, classes: 'bg-coral-500/15 text-coral-500' },
  { label: 'Environment', apiValue: 'environment', icon: Leaf, classes: 'bg-teal-500/15 text-teal-500' },
  { label: 'Education', apiValue: 'education', icon: GraduationCap, classes: 'bg-mist-500/15 text-mist-300' },
];

const DEFAULT_META = { icon: Landmark, classes: 'bg-mist-500/15 text-mist-300' };

/** Looks up badge icon/color for an article's category label (case-insensitive). */
export function getCategoryMeta(label) {
  const match = CATEGORIES.find((c) => c.label.toLowerCase() === label?.toLowerCase());
  return match ?? DEFAULT_META;
}

/** Looks up a category definition by newsdata.io's value, to map API responses back to a label. */
export function getCategoryByApiValue(apiValue) {
  return CATEGORIES.find((c) => c.apiValue === apiValue) ?? null;
}