/**
 * Top-level form error banner for API/auth errors.
 * Renders nothing if no message is provided.
 * Uses role="alert" so screen readers announce the error immediately.
 *
 * @param {string|null|undefined} message - Error message to display
 * @param {function|null} [onRetry] - Optional callback for retry button
 */
export const FormError = ({ message, onRetry }) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex items-center justify-between gap-3 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700"
    >
      <p className="text-sm font-medium">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="shrink-0 rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          Reintentar
        </button>
      )}
    </div>
  );
};
