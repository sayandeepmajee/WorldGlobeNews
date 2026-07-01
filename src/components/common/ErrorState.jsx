import { TriangleAlert } from 'lucide-react';

/** Reusable error state. Speaks in the interface's voice: what happened, how to fix it. */
export function ErrorState({ message = 'Could not load coverage.', onRetry }) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 py-16 text-center px-6">
      <TriangleAlert className="h-6 w-6 text-coral-500" aria-hidden="true" />
      <p className="text-sm text-mist-300 max-w-xs">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 rounded-full border border-ink-600 px-4 py-1.5 text-xs font-medium text-parchment-200 hover:border-amber-500 hover:text-amber-400 transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}
