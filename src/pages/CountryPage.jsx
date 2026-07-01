import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { ArticleCard } from '../components/panel/ArticleCard';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { useCountryNews } from '../hooks/useCountryNews';
import { getCountryByAlpha2 } from '../api/mockData/countries';
import { formatCoordinates } from '../utils/formatDate';

export function CountryPage() {
  const { alpha2 } = useParams();
  const country = getCountryByAlpha2(alpha2);
  const { data, isLoading, isError, error, refetch } = useCountryNews(country?.id);

  return (
    <div className="flex min-h-dvh flex-col bg-ink-900">
      <Header onSelectCountry={() => {}} />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-mist-400 hover:text-amber-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to the map
        </Link>

        {!country && (
          <EmptyState
            title="No coverage for this territory"
            description="This country isn't in WorldScope's curated registry yet. Try another one from the map."
          />
        )}

        {country && (
          <>
            <div className="mb-6 flex items-center gap-4 border-b border-ink-600 pb-6">
              <img
                src={`https://flagcdn.com/64x48/${country.alpha2}.png`}
                alt=""
                width={56}
                height={42}
                className="rounded border border-ink-600"
              />
              <div>
                <h1 className="font-display text-3xl text-parchment-100">{country.name}</h1>
                <p className="font-mono text-xs text-mist-500">
                  {country.capital} · {formatCoordinates(country.lat, country.lon)}
                </p>
              </div>
            </div>

            {isLoading && <LoadingState label="Tuning into the wire…" />}
            {isError && <ErrorState message={error.message} onRetry={refetch} />}

            {data && (
              <div className="grid gap-4 sm:grid-cols-2">
                {data.articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
