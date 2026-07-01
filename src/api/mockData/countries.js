/**
 * Country registry.
 *
 * Keyed by ISO 3166-1 *numeric* id because that's the id react-simple-maps
 * exposes from the world-atlas TopoJSON (`geo.id`). Each entry carries the
 * alpha-2 code (for flags/routing), a display name, region (used for map
 * fill grouping + accent colour), and capital coordinates (used for the
 * cartographer's coordinate read-out and news "dateline").
 *
 * This is a curated subset (~65 countries) covering every populated
 * continent — enough for a rich demo without hand-maintaining all ~180
 * territories. Countries not listed still render on the map (in a neutral
 * "uncharted" fill) but won't produce a news panel on hover.
 */

export const REGIONS = {
  AMERICAS: 'Americas',
  EUROPE: 'Europe',
  AFRICA: 'Africa',
  ASIA: 'Asia',
  OCEANIA: 'Oceania',
  MIDDLE_EAST: 'Middle East',
};

export const COUNTRIES = {
  840: { alpha2: 'us', name: 'United States', region: REGIONS.AMERICAS, capital: 'Washington, D.C.', lat: 38.9072, lon: -77.0369 },
  124: { alpha2: 'ca', name: 'Canada', region: REGIONS.AMERICAS, capital: 'Ottawa', lat: 45.4215, lon: -75.6972 },
  484: { alpha2: 'mx', name: 'Mexico', region: REGIONS.AMERICAS, capital: 'Mexico City', lat: 19.4326, lon: -99.1332 },
  76: { alpha2: 'br', name: 'Brazil', region: REGIONS.AMERICAS, capital: 'Brasília', lat: -15.7939, lon: -47.8828 },
  32: { alpha2: 'ar', name: 'Argentina', region: REGIONS.AMERICAS, capital: 'Buenos Aires', lat: -34.6037, lon: -58.3816 },
  152: { alpha2: 'cl', name: 'Chile', region: REGIONS.AMERICAS, capital: 'Santiago', lat: -33.4489, lon: -70.6693 },
  170: { alpha2: 'co', name: 'Colombia', region: REGIONS.AMERICAS, capital: 'Bogotá', lat: 4.7110, lon: -74.0721 },
  604: { alpha2: 'pe', name: 'Peru', region: REGIONS.AMERICAS, capital: 'Lima', lat: -12.0464, lon: -77.0428 },
  862: { alpha2: 've', name: 'Venezuela', region: REGIONS.AMERICAS, capital: 'Caracas', lat: 10.4806, lon: -66.9036 },
  218: { alpha2: 'ec', name: 'Ecuador', region: REGIONS.AMERICAS, capital: 'Quito', lat: -0.1807, lon: -78.4678 },
  68: { alpha2: 'bo', name: 'Bolivia', region: REGIONS.AMERICAS, capital: 'Sucre', lat: -19.0333, lon: -65.2627 },
  600: { alpha2: 'py', name: 'Paraguay', region: REGIONS.AMERICAS, capital: 'Asunción', lat: -25.2637, lon: -57.5759 },
  858: { alpha2: 'uy', name: 'Uruguay', region: REGIONS.AMERICAS, capital: 'Montevideo', lat: -34.9011, lon: -56.1645 },
  192: { alpha2: 'cu', name: 'Cuba', region: REGIONS.AMERICAS, capital: 'Havana', lat: 23.1136, lon: -82.3666 },

  826: { alpha2: 'gb', name: 'United Kingdom', region: REGIONS.EUROPE, capital: 'London', lat: 51.5072, lon: -0.1276 },
  250: { alpha2: 'fr', name: 'France', region: REGIONS.EUROPE, capital: 'Paris', lat: 48.8566, lon: 2.3522 },
  276: { alpha2: 'de', name: 'Germany', region: REGIONS.EUROPE, capital: 'Berlin', lat: 52.5200, lon: 13.4050 },
  724: { alpha2: 'es', name: 'Spain', region: REGIONS.EUROPE, capital: 'Madrid', lat: 40.4168, lon: -3.7038 },
  380: { alpha2: 'it', name: 'Italy', region: REGIONS.EUROPE, capital: 'Rome', lat: 41.9028, lon: 12.4964 },
  620: { alpha2: 'pt', name: 'Portugal', region: REGIONS.EUROPE, capital: 'Lisbon', lat: 38.7223, lon: -9.1393 },
  528: { alpha2: 'nl', name: 'Netherlands', region: REGIONS.EUROPE, capital: 'Amsterdam', lat: 52.3676, lon: 4.9041 },
  56: { alpha2: 'be', name: 'Belgium', region: REGIONS.EUROPE, capital: 'Brussels', lat: 50.8503, lon: 4.3517 },
  756: { alpha2: 'ch', name: 'Switzerland', region: REGIONS.EUROPE, capital: 'Bern', lat: 46.9480, lon: 7.4474 },
  40: { alpha2: 'at', name: 'Austria', region: REGIONS.EUROPE, capital: 'Vienna', lat: 48.2082, lon: 16.3738 },
  752: { alpha2: 'se', name: 'Sweden', region: REGIONS.EUROPE, capital: 'Stockholm', lat: 59.3293, lon: 18.0686 },
  578: { alpha2: 'no', name: 'Norway', region: REGIONS.EUROPE, capital: 'Oslo', lat: 59.9139, lon: 10.7522 },
  208: { alpha2: 'dk', name: 'Denmark', region: REGIONS.EUROPE, capital: 'Copenhagen', lat: 55.6761, lon: 12.5683 },
  246: { alpha2: 'fi', name: 'Finland', region: REGIONS.EUROPE, capital: 'Helsinki', lat: 60.1699, lon: 24.9384 },
  616: { alpha2: 'pl', name: 'Poland', region: REGIONS.EUROPE, capital: 'Warsaw', lat: 52.2297, lon: 21.0122 },
  804: { alpha2: 'ua', name: 'Ukraine', region: REGIONS.EUROPE, capital: 'Kyiv', lat: 50.4501, lon: 30.5234 },
  643: { alpha2: 'ru', name: 'Russia', region: REGIONS.EUROPE, capital: 'Moscow', lat: 55.7558, lon: 37.6173 },
  300: { alpha2: 'gr', name: 'Greece', region: REGIONS.EUROPE, capital: 'Athens', lat: 37.9838, lon: 23.7275 },
  372: { alpha2: 'ie', name: 'Ireland', region: REGIONS.EUROPE, capital: 'Dublin', lat: 53.3498, lon: -6.2603 },
  352: { alpha2: 'is', name: 'Iceland', region: REGIONS.EUROPE, capital: 'Reykjavík', lat: 64.1466, lon: -21.9426 },
  203: { alpha2: 'cz', name: 'Czechia', region: REGIONS.EUROPE, capital: 'Prague', lat: 50.0755, lon: 14.4378 },
  642: { alpha2: 'ro', name: 'Romania', region: REGIONS.EUROPE, capital: 'Bucharest', lat: 44.4268, lon: 26.1025 },
  348: { alpha2: 'hu', name: 'Hungary', region: REGIONS.EUROPE, capital: 'Budapest', lat: 47.4979, lon: 19.0402 },

  818: { alpha2: 'eg', name: 'Egypt', region: REGIONS.AFRICA, capital: 'Cairo', lat: 30.0444, lon: 31.2357 },
  566: { alpha2: 'ng', name: 'Nigeria', region: REGIONS.AFRICA, capital: 'Abuja', lat: 9.0765, lon: 7.3986 },
  710: { alpha2: 'za', name: 'South Africa', region: REGIONS.AFRICA, capital: 'Pretoria', lat: -25.7479, lon: 28.2293 },
  404: { alpha2: 'ke', name: 'Kenya', region: REGIONS.AFRICA, capital: 'Nairobi', lat: -1.2921, lon: 36.8219 },
  231: { alpha2: 'et', name: 'Ethiopia', region: REGIONS.AFRICA, capital: 'Addis Ababa', lat: 9.0300, lon: 38.7400 },
  504: { alpha2: 'ma', name: 'Morocco', region: REGIONS.AFRICA, capital: 'Rabat', lat: 34.0209, lon: -6.8416 },
  12: { alpha2: 'dz', name: 'Algeria', region: REGIONS.AFRICA, capital: 'Algiers', lat: 36.7538, lon: 3.0588 },
  288: { alpha2: 'gh', name: 'Ghana', region: REGIONS.AFRICA, capital: 'Accra', lat: 5.6037, lon: -0.1870 },
  834: { alpha2: 'tz', name: 'Tanzania', region: REGIONS.AFRICA, capital: 'Dodoma', lat: -6.1630, lon: 35.7516 },
  800: { alpha2: 'ug', name: 'Uganda', region: REGIONS.AFRICA, capital: 'Kampala', lat: 0.3476, lon: 32.5825 },

  156: { alpha2: 'cn', name: 'China', region: REGIONS.ASIA, capital: 'Beijing', lat: 39.9042, lon: 116.4074 },
  392: { alpha2: 'jp', name: 'Japan', region: REGIONS.ASIA, capital: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  410: { alpha2: 'kr', name: 'South Korea', region: REGIONS.ASIA, capital: 'Seoul', lat: 37.5665, lon: 126.9780 },
  356: { alpha2: 'in', name: 'India', region: REGIONS.ASIA, capital: 'New Delhi', lat: 28.6139, lon: 77.2090 },
  360: { alpha2: 'id', name: 'Indonesia', region: REGIONS.ASIA, capital: 'Jakarta', lat: -6.2088, lon: 106.8456 },
  586: { alpha2: 'pk', name: 'Pakistan', region: REGIONS.ASIA, capital: 'Islamabad', lat: 33.6844, lon: 73.0479 },
  50: { alpha2: 'bd', name: 'Bangladesh', region: REGIONS.ASIA, capital: 'Dhaka', lat: 23.8103, lon: 90.4125 },
  704: { alpha2: 'vn', name: 'Vietnam', region: REGIONS.ASIA, capital: 'Hanoi', lat: 21.0278, lon: 105.8342 },
  764: { alpha2: 'th', name: 'Thailand', region: REGIONS.ASIA, capital: 'Bangkok', lat: 13.7563, lon: 100.5018 },
  608: { alpha2: 'ph', name: 'Philippines', region: REGIONS.ASIA, capital: 'Manila', lat: 14.5995, lon: 120.9842 },
  458: { alpha2: 'my', name: 'Malaysia', region: REGIONS.ASIA, capital: 'Kuala Lumpur', lat: 3.1390, lon: 101.6869 },
  702: { alpha2: 'sg', name: 'Singapore', region: REGIONS.ASIA, capital: 'Singapore', lat: 1.3521, lon: 103.8198 },
  398: { alpha2: 'kz', name: 'Kazakhstan', region: REGIONS.ASIA, capital: 'Astana', lat: 51.1605, lon: 71.4704 },

  682: { alpha2: 'sa', name: 'Saudi Arabia', region: REGIONS.MIDDLE_EAST, capital: 'Riyadh', lat: 24.7136, lon: 46.6753 },
  784: { alpha2: 'ae', name: 'United Arab Emirates', region: REGIONS.MIDDLE_EAST, capital: 'Abu Dhabi', lat: 24.4539, lon: 54.3773 },
  376: { alpha2: 'il', name: 'Israel', region: REGIONS.MIDDLE_EAST, capital: 'Jerusalem', lat: 31.7683, lon: 35.2137 },
  364: { alpha2: 'ir', name: 'Iran', region: REGIONS.MIDDLE_EAST, capital: 'Tehran', lat: 35.6892, lon: 51.3890 },
  368: { alpha2: 'iq', name: 'Iraq', region: REGIONS.MIDDLE_EAST, capital: 'Baghdad', lat: 33.3152, lon: 44.3661 },
  792: { alpha2: 'tr', name: 'Türkiye', region: REGIONS.MIDDLE_EAST, capital: 'Ankara', lat: 39.9334, lon: 32.8597 },

  36: { alpha2: 'au', name: 'Australia', region: REGIONS.OCEANIA, capital: 'Canberra', lat: -35.2809, lon: 149.1300 },
  554: { alpha2: 'nz', name: 'New Zealand', region: REGIONS.OCEANIA, capital: 'Wellington', lat: -41.2865, lon: 174.7762 },
};

/** Reverse lookup: alpha-2 code -> numeric id, for URL params like /country/us */
export const ALPHA2_TO_NUMERIC = Object.fromEntries(
  Object.entries(COUNTRIES).map(([numeric, c]) => [c.alpha2, numeric])
);

export const REGION_ACCENT = {
  [REGIONS.AMERICAS]: '#e8a33d',
  [REGIONS.EUROPE]: '#3a7d7a',
  [REGIONS.AFRICA]: '#e15241',
  [REGIONS.ASIA]: '#c8842a',
  [REGIONS.OCEANIA]: '#78839a',
  [REGIONS.MIDDLE_EAST]: '#9aa5b8',
};

export function getCountryByNumericId(id) {
  return COUNTRIES[id] ?? null;
}

export function getCountryByAlpha2(alpha2) {
  const numeric = ALPHA2_TO_NUMERIC[alpha2?.toLowerCase()];
  return numeric ? { id: numeric, ...COUNTRIES[numeric] } : null;
}
