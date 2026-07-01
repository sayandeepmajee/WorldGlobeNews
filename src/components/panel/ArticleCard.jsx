import { Clock } from 'lucide-react';
import { formatRelativeTime } from '../../utils/formatDate';
import { getCategoryMeta } from '../../utils/categoryStyles';

/**
 * A single mock headline. Deliberately not a link to an external article
 * (there isn't a real one behind it yet) — it reads as a wire-service
 * bulletin: source, category, and a short summary line.
 */
export function ArticleCard({ article }) {
  const { icon: CategoryIcon, classes } = getCategoryMeta(article.category);

  return (
    <article className="group rounded-xl border border-ink-600 bg-ink-800/60 p-4 transition-colors hover:border-amber-500/50">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${classes}`}
        >
          <CategoryIcon className="h-3 w-3" aria-hidden="true" />
          {article.category}
        </span>
        <span className="flex items-center gap-1 font-mono text-[11px] text-mist-500">
          <Clock className="h-3 w-3" aria-hidden="true" />
          {formatRelativeTime(article.publishedAt)}
        </span>
      </div>

      <h3 className="font-display text-base leading-snug text-parchment-100">
        {article.headline}
      </h3>

      <p className="mt-1.5 text-sm leading-relaxed text-mist-400">{article.summary}</p>

      <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-mist-500">
        <span>{article.source}</span>
        <span>{article.readTimeMin} min read</span>
      </div>
    </article>
  );
}
