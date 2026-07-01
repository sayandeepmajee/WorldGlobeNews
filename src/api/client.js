import axios from 'axios';

/**
 * Shared Axios instance. Nothing calls this yet — WorldScope currently runs
 * on the mock data layer in `mockData/` — but it's wired up so a real
 * provider (e.g. an internal news aggregation API) is a drop-in: set
 * VITE_API_BASE_URL and swap the mock calls in `newsService.js` for
 * `apiClient.get(...)`.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
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
      error.response?.data?.message ?? error.message ?? 'Something went wrong fetching news.';
    return Promise.reject(new Error(message));
  }
);
