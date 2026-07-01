import { CATEGORIES } from '../../utils/categoryStyles';

/**
 * Horizontal row of category filter pills (All, Breaking, Politics, …).
 * Behaves like a single-select radio group — exactly one option is active
 * at a time — but is built from plain, individually focusable <button>s so
 * it works with Tab/Enter/Space with no extra keyboard handling, and
 * scrolls horizontally on narrow viewports instead of wrapping awkwardly.
 */
export function CategoryFilter({ selected, onSelect }) {
  return (
    <div
      role="radiogroup"
      aria-label="Filter headlines by category"
      className="thin-scroll -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
    >
      <Pill label="All" active={selected === null} onClick={() => onSelect(null)} />
      {CATEGORIES.map((category) => (
        <Pill
          key={category.apiValue}
          label={category.label}
          icon={category.icon}
          active={selected === category.apiValue}
          onClick={() => onSelect(category.apiValue)}
        />
      ))}
    </div>
  );
}

function Pill({ label, icon: Icon, active, onClick }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'border-amber-500 bg-amber-500/15 text-amber-400'
          : 'border-ink-600 text-mist-400 hover:border-mist-500 hover:text-parchment-200'
      }`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {label}
    </button>
  );
}