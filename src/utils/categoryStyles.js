import { Landmark, TrendingUp, Cpu, Palette, Trophy, Leaf } from 'lucide-react';

/** Maps a headline category to an icon + Tailwind color classes for its badge. */
export const CATEGORY_META = {
  Politics: { icon: Landmark, classes: 'bg-mist-500/15 text-mist-300' },
  Economy: { icon: TrendingUp, classes: 'bg-amber-500/15 text-amber-400' },
  Technology: { icon: Cpu, classes: 'bg-teal-500/15 text-teal-500' },
  Culture: { icon: Palette, classes: 'bg-coral-500/15 text-coral-500' },
  Sports: { icon: Trophy, classes: 'bg-amber-500/15 text-amber-500' },
  Environment: { icon: Leaf, classes: 'bg-teal-500/15 text-teal-500' },
};

export function getCategoryMeta(category) {
  return CATEGORY_META[category] ?? { icon: Landmark, classes: 'bg-mist-500/15 text-mist-300' };
}
