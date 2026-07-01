# WorldScope

Explore news from around the world by hovering (or tapping) countries on an
interactive map.

## Stack

React 19 · Vite · Tailwind CSS v4 · React Router · TanStack Query · Axios ·
Framer Motion · react-simple-maps · lucide-react

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the production build locally
npm run lint
```

## Architecture

```
src/
  api/
    client.js            axios instance, pre-wired for a real backend
    newsService.js        the seam between UI and data — swap this to call
                           a real API without touching any component
    mockData/
      countries.js         curated country registry (ISO numeric id, name,
                            region, capital + coordinates)
      articles.js           deterministic mock headline generator
  hooks/                  TanStack Query hooks + small utility hooks
  components/
    layout/               Header, Ticker (the "live wire" strip)
    map/                   WorldMap (react-simple-maps) + MapHud readout
    panel/                 CountryPanel (drawer/sheet) + ArticleCard
    common/                SearchBar, Loading/Error/Empty states
  pages/                  Home, CountryPage, NotFound
  utils/                  date/coordinate formatting, category styling
```

**Data layer.** WorldScope doesn't call a live news provider yet — there's
no backend in this phase — so `newsService.js` fabricates deterministic,
clearly-fictional headlines per country (seeded by country id, so a given
country shows the same "coverage" for the session). Every function returns
the same shape a real API would (`{ country, articles }`), and it's the
*only* file that needs to change to wire in a real provider; components and
hooks are written against the service, not the mock data directly.

**Interaction model.**
- Desktop: hovering a country updates the news panel (`onMouseEnter`,
  guarded against touch devices via `matchMedia('(hover: none)')`);
  clicking pins the panel and is keyboard-operable (`Enter`/`Space` on a
  focused country, since each interactive `<Geography>` is a real
  `tabIndex={0}` element).
- Mobile/touch: tapping a country opens the panel directly (no hover to
  fall back on); the panel becomes a bottom sheet instead of a side drawer.
- The panel's "Full coverage" link routes to `/country/:alpha2` for a
  dedicated, linkable page per country.

**Accessibility.** Visible focus rings throughout (never suppressed), map
countries are keyboard-focusable with descriptive `aria-label`s, the search
box is a proper combobox/listbox pair, loading/error regions use
`role="status"` / `role="alert"`, and all animation respects
`prefers-reduced-motion`.

**Performance.** Country news is cached per id via TanStack Query
(`staleTime: 5min`) so re-hovering a country already viewed is instant.
Heavier vendor code (map projection math, animation) is split into its own
chunks in `vite.config.js` so it can be cached independently of app code.

## Wiring in a real news API

1. Set `VITE_API_BASE_URL` in `.env`.
2. In `newsService.js`, replace the mock calls with `apiClient.get(...)`
   calls to your endpoints, keeping the same return shape.
3. Nothing in `hooks/`, `components/`, or `pages/` needs to change.
