import { MapPinOff } from 'lucide-react';

/** Empty state — treated as an invitation to act, not just an apology. */
export function EmptyState({ icon: Icon = MapPinOff, title, description }) {
  return (
    <div className="flex flex-col items-center gap-2 py-16 text-center px-6">
      <Icon className="h-6 w-6 text-mist-500" aria-hidden="true" />
      <p className="text-sm font-medium text-parchment-200">{title}</p>
      {description && <p className="text-xs text-mist-400 max-w-xs">{description}</p>}
    </div>
  );
}
