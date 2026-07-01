import axios from 'axios';

/**
 * Shared Axios instance, pointed at newsdata.io's REST API.
 *
 * The API key is read from VITE_NEWSDATA_API_KEY (see .env.example). Vite
 * inlines VITE_-prefixed env vars into the client bundle at build time, so
 * this key is visible to anyone who opens dev tools — that's true of any
 * key used directly from the browser, not something this file can prevent.
 * If usage/billing matters, proxy this call through a small backend that
 * holds the key server-side instead of calling newsdata.io directly here.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://newsdata.io/api/1',
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Normalize errors to a shape components can rely on regardless of provider.
    const message =
      error.response?.data?.results?.message ??
      error.response?.data?.message ??
      error.message ??
      'Something went wrong fetching news.';
    return Promise.reject(new Error(message));
  }
);