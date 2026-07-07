/**
 * Formats an ISO timestamp into a human-readable relative time string.
 *
 * Thresholds:
 * - Less than 1 hour → "Just now"
 * - 1–23 hours → "X hours ago"
 * - 1 day (24–47 hours) → "Yesterday"
 * - 2–6 days → "X days ago"
 * - 7–29 days → "Last week"
 * - 30+ days → "Last month"
 *
 * @param {string} dateString - An ISO 8601 timestamp string
 * @returns {string} A human-readable relative time string
 */
export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) {
    return 'Just now';
  }

  if (diffHours >= 1 && diffHours <= 23) {
    return `${diffHours} hours ago`;
  }

  if (diffDays === 1) {
    return 'Yesterday';
  }

  if (diffDays >= 2 && diffDays <= 6) {
    return `${diffDays} days ago`;
  }

  if (diffDays >= 7 && diffDays <= 29) {
    return 'Last week';
  }

  return 'Last month';
}
