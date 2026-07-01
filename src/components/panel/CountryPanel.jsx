import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ArrowUpRight } from 'lucide-react';
import { useCountryNews } from '../../hooks/useCountryNews';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { ArticleCard } from './ArticleCard';
import { LoadingState } from '../common/LoadingState';
import { ErrorState } from '../common/ErrorState';
import { formatCoordinates } from '../../utils/formatDate';

/**
 * The panel that appears when a country is hovered/tapped/selected on the
 * map. Desktop: a drawer sliding in from the right (doesn't obscure the
 * map). Mobile: a bottom sheet (touch devices can't "hover", so tapping a
 * country opens this directly).
 */
export function CountryPanel({ country, onClose }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { data, isLoading, isError, error, refetch } = useCountryNews(country?.id);

  const variants = isDesktop
    ? {
        initial: { x: '100%' },
        animate: { x: 0 },
        exit: { x: '100%' },
      }
    : {
        initial: { y: '100%' },
        animate: { y: 0 },
        exit: { y: '100%' },
      };

  return (
    <AnimatePresence>
      {country && (
        <>
          {/* Scrim — closes the panel on click, present so the map behind reads as inactive */}
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-30 bg-ink-950/50 md:bg-transparent"
            aria-hidden="true"
          />

          <motion.aside
            key="panel"
            role="dialog"
            aria-label={`Coverage for ${country.name}`}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
            className="thin-scroll fixed inset-x-0 bottom-0 z-40 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-ink-600 bg-ink-900 shadow-2xl shadow-black/50 md:inset-y-0 md:right-0 md:left-auto md:h-full md:max-h-none md:w-[26rem] md:rounded-none md:border-t-0 md:border-l"
          >
            <header className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-ink-600 bg-ink-900/95 px-5 py-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <img
                  src={`https://flagcdn.com/48x36/${country.alpha2}.png`}
                  alt=""
                  width={40}
                  height={30}
                  className="rounded shrink-0 border border-ink-600"
                />
                <div>
                  <h2 className="font-display text-xl leading-tight text-parchment-100">
                    {country.name}
                  </h2>
                  <p className="font-mono text-[11px] text-mist-500">
                    {country.capital} · {formatCoordinates(country.lat, country.lon)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="rounded-full p-1.5 text-mist-400 hover:bg-ink-700 hover:text-parchment-200"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="px-5 py-4">
              {isLoading && <LoadingState label="Tuning into the wire…" />}
              {isError && <ErrorState message={error.message} onRetry={refetch} />}

              {data && (
                <>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wide text-mist-500">
                      {data.articles.length} stories
                    </span>
                    <Link
                      to={`/country/${country.alpha2}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-amber-400 hover:text-amber-300"
                    >
                      Full coverage
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                  <div className="flex flex-col gap-3">
                    {data.articles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
