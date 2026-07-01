import { COUNTRIES, getCountryByNumericId } from './mockData/countries';
import { generateArticlesForCountry, generateTickerHeadlines } from './mockData/articles';

// Simulated network latency so loading states are visible and real —
// remove once this talks to an actual endpoint via `apiClient`.
const MOCK_LATENCY_MS = 380;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * News service — the single seam between UI components and data.
 * Every function here returns the shape a real API would; today they're
 * backed by deterministic mock data, but the call sites (see hooks/) never
 * need to change when a real provider is introduced.
 */
export const newsService = {
  /** Fetch headlines for one country by its ISO numeric id. */
  async getCountryNews(numericId) {
    await delay(MOCK_LATENCY_MS);
    const country = getCountryByNumericId(numericId);
    if (!country) {
      throw new Error('No coverage available for this territory yet.');
    }
    const articles = generateArticlesForCountry({ id: numericId, ...country });
    return { country: { id: numericId, ...country }, articles };
  },

  /** Fetch a rotating slate of headlines for the header ticker. */
  async getTickerHeadlines() {
    await delay(200);
    const all = Object.entries(COUNTRIES).map(([id, c]) => ({ id, ...c }));
    // Shuffle deterministically-ish by rotating from the current hour so the
    // ticker feels alive across visits without being fully random per render.
    const offset = new Date().getHours() % all.length;
    const rotated = [...all.slice(offset), ...all.slice(0, offset)];
    return generateTickerHeadlines(rotated);
  },

  /** Search countries by name — powers the search box (client-side over the registry). */
  async searchCountries(query) {
    await delay(120);
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return Object.entries(COUNTRIES)
      .filter(([, c]) => c.name.toLowerCase().includes(q))
      .map(([id, c]) => ({ id, ...c }))
      .slice(0, 8);
  },
};
