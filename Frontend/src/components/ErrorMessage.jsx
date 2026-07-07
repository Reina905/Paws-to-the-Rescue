export const ErrorMessage = ({ message = 'Ha ocurrido un error.', onRetry }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <p className="text-red-600 font-medium mb-4">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
      >
        Reintentar
      </button>
    )}
  </div>
);
