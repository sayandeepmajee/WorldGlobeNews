/**
 * Mock article generator.
 *
 * WorldScope isn't wired to a live news provider yet, so this module
 * fabricates plausible, clearly-fictional headlines per country. It is
 * deterministic (seeded by country id) so the same country always shows
 * the same "coverage" during a session, and it exposes the same shape a
 * real provider would (id, headline, source, category, publishedAt,
 * summary, url) so swapping in a real API later only touches
 * `src/api/newsService.js`.
 */

const CATEGORIES = ['Politics', 'Economy', 'Technology', 'Culture', 'Sports', 'Environment'];

const SOURCES = [
  'The Daily Meridian', 'Continental Wire', 'Harbor & Herald', 'The Longitude Post',
  'Frontline Bulletin', 'The Compass Review', 'Atlas Standard', 'The Dispatch',
];

const HEADLINE_TEMPLATES = {
  Politics: [
    'Lawmakers in {capital} debate new coalition amid budget standoff',
    '{country} government unveils reform package ahead of key vote',
    'Regional leaders meet in {capital} to discuss trade cooperation',
    'Opposition parties in {country} call for early elections',
  ],
  Economy: [
    '{country} central bank holds interest rates steady',
    'Manufacturing output rises across {country} for third straight month',
    '{capital} markets rally on stronger-than-expected trade data',
    'Inflation cools in {country}, easing pressure on households',
  ],
  Technology: [
    '{capital} start-up hub attracts new wave of venture funding',
    '{country} unveils national plan to expand broadband access',
    'Researchers in {country} announce breakthrough in battery storage',
    'Tech firms in {capital} pilot new public transit app',
  ],
  Culture: [
    '{capital} film festival opens with record attendance',
    'Museum in {country} unveils long-awaited restoration project',
    'Traditional festival draws crowds across {country}',
    '{capital} named a finalist for next design biennial',
  ],
  Sports: [
    'National team from {country} advances after tense qualifier',
    '{capital} to host regional championship next season',
    'Young athletes from {country} shine at continental games',
    'Stadium expansion approved in {capital}',
  ],
  Environment: [
    '{country} expands protected marine reserve off its coast',
    'Drought concerns grow in rural {country} as reservoirs shrink',
    '{capital} pilots low-emission zone in city center',
    'Reforestation project in {country} passes milestone',
  ],
};

/** Small deterministic PRNG (mulberry32) seeded from a string, so a given
 * country always renders the same mock coverage within a browser session. */
function seededRandom(seedStr) {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed << 5) - seed + seedStr.charCodeAt(i);
    seed |= 0;
  }
  return function next() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

function fillTemplate(template, { country, capital }) {
  return template.replaceAll('{country}', country).replaceAll('{capital}', capital);
}

/**
 * Generate a list of mock articles for a given country.
 * @param {{id: string, name: string, capital: string}} country
 * @param {number} count
 */
export function generateArticlesForCountry(country, count = 8) {
  if (!country) return [];
  const rng = seededRandom(`${country.id}-${country.name}`);
  const articles = [];
  const usedTemplates = new Set();

  for (let i = 0; i < count; i++) {
    const category = pick(rng, CATEGORIES);
    const templates = HEADLINE_TEMPLATES[category];
    let template = pick(rng, templates);
    let tries = 0;
    while (usedTemplates.has(`${category}:${template}`) && tries < 5) {
      template = pick(rng, templates);
      tries++;
    }
    usedTemplates.add(`${category}:${template}`);

    const hoursAgo = Math.floor(rng() * 71) + 1;
    const publishedAt = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString();

    articles.push({
      id: `${country.id}-${i}`,
      headline: fillTemplate(template, country),
      category,
      source: pick(rng, SOURCES),
      publishedAt,
      readTimeMin: Math.floor(rng() * 6) + 2,
      summary: `A developing story out of ${country.capital}, ${country.name}, with coverage continuing to update as officials respond.`,
    });
  }

  return articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

/** A rotating slate of "wire" headlines for the ticker, pulled from a spread of countries. */
export function generateTickerHeadlines(countries) {
  return countries.slice(0, 12).map((country) => {
    const [first] = generateArticlesForCountry(country, 1);
    return { ...first, countryName: country.name };
  });
}
