import { apiClient } from './client';
import { getCountryByNumericId, COUNTRIES } from './mockData/countries';
import { getCategoryByApiValue } from '../utils/categoryStyles';

const API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY;

if (!API_KEY && import.meta.env.DEV) {
  // Fails loudly in development rather than letting every request 401/404
  // silently — easy to miss otherwise since the UI just shows "no stories".
  console.warn(
    '[newsService] VITE_NEWSDATA_API_KEY is not set. Add it to .env.local and restart the dev server.'
  );
}

/** newsdata.io categories -> the labels used by CATEGORY_META in the UI. */
function normalizeCategory(rawCategories) {
  const first = rawCategories?.[0] ?? 'top';
  return getCategoryByApiValue(first)?.label ?? first.charAt(0).toUpperCase() + first.slice(1);
}

/** Rough reading time from description length, since the API doesn't provide one. */
function estimateReadTime(description) {
  const words = description?.split(/\s+/).length ?? 120;
  return Math.max(2, Math.round(words / 200));
}

/** Maps a raw newsdata.io article into the shape the UI components expect. */
function mapArticle(raw, index) {
  return {
    id: raw.article_id ?? `${raw.link ?? 'article'}-${index}`,
    headline: raw.title ?? 'Untitled story',
    category: normalizeCategory(raw.category),
    source: raw.source_name ?? raw.source_id ?? 'Unknown source',
    publishedAt: raw.pubDate ? new Date(raw.pubDate).toISOString() : new Date().toISOString(),
    readTimeMin: estimateReadTime(raw.description),
    summary: raw.description ?? raw.content ?? 'No summary available for this story.',
    url: raw.link,
  };
}

/**
 * News service — the single seam between UI components and data.
 * Backed by newsdata.io's `/latest` endpoint; if the provider ever changes
 * again, only this file (and `mapArticle` above) needs to change.
 */
export const newsService = {
  /**
   * Fetch headlines for one country by its ISO numeric id, optionally
   * narrowed to a single category (newsdata.io's `apiValue`, e.g.
   * "technology"). Pass `null` for unfiltered "All" coverage.
   */
  async getCountryNews(numericId, category = null) {
    const country = getCountryByNumericId(numericId);
    if (!country) {
      throw new Error('No coverage available for this territory yet.');
    }
    if (!API_KEY) {
      throw new Error('Missing NewsData API key. Add VITE_NEWSDATA_API_KEY to .env.local and restart the dev server.');
    }

    const { data } = await apiClient.get('/latest', {
      params: {
        apikey: API_KEY,
        country: country.alpha2,
        language: 'en',
        ...(category ? { category } : {}),
      },
    });

    const articles = (data.results ?? []).map(mapArticle);
    return { country: { id: numericId, ...country }, articles };
  },

  /** Fetch a rotating slate of headlines for the header ticker. */
  async getTickerHeadlines() {
    if (!API_KEY) return [];

    const { data } = await apiClient.get('/latest', {
      params: {
        apikey: API_KEY,
        language: 'en',
      },
    });

    return (data.results ?? []).slice(0, 12).map((raw, index) => {
      const article = mapArticle(raw, index);
      return { ...article, countryName: raw.source_name ?? article.source };
    });
  },

  /** Search countries by name — powers the search box (client-side over the registry). */
  async searchCountries(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return Object.entries(COUNTRIES)
      .filter(([, c]) => c.name.toLowerCase().includes(q))
      .map(([id, c]) => ({ id, ...c }))
      .slice(0, 8);
  },
};