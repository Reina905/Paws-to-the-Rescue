/**
 * Derives the display status of an opportunity based on its properties.
 *
 * Status derivation rules (evaluated in order):
 * 1. "closed" — when the opportunity is inactive
 * 2. "past_date" — when active but date has already passed
 * 3. "full_capacity" — when active, date is today/future, but no spaces left
 * 4. "open" — when active, date is today/future, and spaces are available
 *
 * @param {{ isActive: boolean, date: string, availableSpaces: number }} opportunity
 * @returns {'open' | 'closed' | 'past_date' | 'full_capacity'}
 */
export function deriveOpportunityStatus(opportunity) {
  if (!opportunity.isActive) {
    return 'closed';
  }

  const opportunityDate = new Date(opportunity.date);
  const today = new Date();
  // Compare by day only (strip time component)
  opportunityDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (opportunityDate < today) {
    return 'past_date';
  }

  if (opportunity.availableSpaces === 0) {
    return 'full_capacity';
  }

  return 'open';
}
