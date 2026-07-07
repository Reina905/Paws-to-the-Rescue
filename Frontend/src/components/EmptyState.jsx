export const EmptyState = ({ message = 'No items to display.' }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <p className="text-gray-500 text-lg">{message}</p>
  </div>
);
