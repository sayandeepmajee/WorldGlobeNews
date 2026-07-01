/** Relative "3h ago" style formatting for article timestamps. */
export function formatRelativeTime(isoString) {
  const then = new Date(isoString).getTime();
  const diffMs = Date.now() - then;
  const diffMin = Math.round(diffMs / 60000);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.round(diffHr / 24);
  return `${diffDay}d ago`;
}

/** Live UTC clock string, e.g. "14:32:07 UTC" — used in the header. */
export function formatUtcClock(date = new Date()) {
  return `${date.toUTCString().slice(17, 25)} UTC`;
}

/** Formats a lat/lon pair like a cartographer's instrument read-out. */
export function formatCoordinates(lat, lon) {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(2)}°${latDir}  ${Math.abs(lon).toFixed(2)}°${lonDir}`;
}
