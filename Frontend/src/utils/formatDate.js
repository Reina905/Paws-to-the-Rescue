/**
 * Formats an ISO date string into a readable date (e.g. "Aug 2, 2026").
 * @param {string} isoDate - ISO date string like "2026-08-02T14:00:00+00:00"
 * @returns {string} Formatted date or the original string if invalid
 */
export const formatDate = (isoDate) => {
  if (!isoDate) return ""
  const d = new Date(isoDate)
  if (isNaN(d.getTime())) return isoDate
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
