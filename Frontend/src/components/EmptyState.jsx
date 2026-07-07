export const EmptyState = ({ message = 'No hay elementos para mostrar.' }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <p className="text-gray-500 text-lg">{message}</p>
  </div>
);
