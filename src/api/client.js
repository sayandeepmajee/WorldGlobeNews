import axios from 'axios';

/**
 * Shared Axios instance, pointed at newsdata.io's REST API.
 *
 * baseURL is intentionally hardcoded (not read from an env var) — an
 * earlier version of this file fell back to VITE_API_BASE_URL, and a
 * stray/leftover value for that variable in .env/.env.local silently
 * redirected every request to the wrong host, which surfaces as a
 * confusing generic 404 instead of a real newsdata.io error. If you need
 * to point this at a different host later (e.g. a proxy), change it here
 * explicitly rather than reintroducing an env override.
 *
 * The API key is read from VITE_NEWSDATA_API_KEY (see .env.example). Vite
 * inlines VITE_-prefixed env vars into the client bundle at build time, so
 * this key is visible to anyone who opens dev tools — that's true of any
 * key used directly from the browser, not something this file can prevent.
 */
export const apiClient = axios.create({
  baseURL: 'https://newsdata.io/api/1',
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // newsdata.io always returns JSON errors shaped like
    // { status: "error", results: { message, code } }. If that shape
    // isn't present, the response likely didn't come from newsdata.io at
    // all (wrong host, dev-server 404 page, CORS block, etc.) — surface a
    // hint instead of a bare "status code 404".
    const apiMessage = error.response?.data?.results?.message ?? error.response?.data?.message;
    const message =
      apiMessage ??
      (error.response
        ? `Unexpected response from the news API (HTTP ${error.response.status}). Check that VITE_API_BASE_URL isn't set to something stale in your .env files.`
        : (error.message ?? 'Something went wrong fetching news.'));
    return Promise.reject(new Error(message));
  }
);