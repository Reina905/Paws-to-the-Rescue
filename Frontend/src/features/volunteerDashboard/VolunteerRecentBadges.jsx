import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { EmptyState } from '../../components/EmptyState';

const BadgeCard = ({ badge }) => (
  <div className="flex flex-col items-center gap-2 bg-white p-4 rounded-2xl shadow-sm text-center min-w-[120px]">
    <img
      src={badge.imageUrl || badge.urlImage}
      alt={badge.name}
      className="w-14 h-14 rounded-full object-cover"
    />
    <p className="text-sm font-medium text-gray-700 line-clamp-2">{badge.name}</p>
  </div>
);

export const VolunteerRecentBadges = ({ badges = [], isLoading, error }) => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Badges could not be retrieved." />;

  const displayBadges = badges.slice(0, 5);

  if (displayBadges.length === 0) {
    return <EmptyState message="No badges earned yet" />;
  }

  return (
    <div className="flex gap-4 flex-wrap">
      {displayBadges.map((badge, index) => (
        <BadgeCard key={badge.id || index} badge={badge} />
      ))}
    </div>
  );
};
