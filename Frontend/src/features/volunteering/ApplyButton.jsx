import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/authStore';

/**
 * ApplyButton — Self-contained registration action for volunteer opportunities.
 *
 * Props:
 * - opportunityId: string — the opportunity to register for
 * - availableSpaces: number — remaining spaces
 * - onApplySuccess: () => void — callback after successful registration
 */
export const ApplyButton = ({ opportunityId, availableSpaces, onApplySuccess }) => {
  const { isAuthenticated, role } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Don't render at all for shelter users
  if (isAuthenticated && role === 'shelter') {
    return null;
  }

  // Unauthenticated user — show disabled button with login link
  if (!isAuthenticated) {
    return (
      <div className="space-y-2">
        <button
          disabled
          className="w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-2xl cursor-not-allowed"
          aria-disabled="true"
        >
          Register Now
        </button>
        <p className="text-sm text-gray-500 text-center">
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Log in
          </Link>{' '}
          to register for this opportunity.
        </p>
        <div aria-live="polite" aria-atomic="true" className="sr-only" />
      </div>
    );
  }

  // No available spaces
  if (availableSpaces <= 0) {
    return (
      <div className="space-y-2">
        <button
          disabled
          className="w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-2xl cursor-not-allowed"
          aria-disabled="true"
        >
          No spaces available
        </button>
        <div aria-live="polite" aria-atomic="true" className="sr-only" />
      </div>
    );
  }

  const handleRegister = async () => {
    if (isLoading || registered) return;

    setIsLoading(true);
    setStatusMessage('');
    setIsError(false);

    try {
      await api.post(`/opportunities/${opportunityId}/apply`);

      setRegistered(true);
      setStatusMessage('¡Te has inscrito exitosamente!');
      setIsError(false);

      if (onApplySuccess) {
        onApplySuccess();
      }
    } catch (error) {
      const statusCode = error.response?.status;

      if (statusCode === 409) {
        setStatusMessage('Ya estás inscrito en esta oportunidad.');
        setIsError(true);
      } else if (statusCode === 404) {
        setStatusMessage('Oportunidad no encontrada.');
        setIsError(true);
      } else {
        setStatusMessage('Error de conexión. Intenta de nuevo.');
        setIsError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (registered) return 'Registered ✓';
    if (isLoading) return 'Registering...';
    return 'Register Now';
  };

  const getButtonClasses = () => {
    const base = 'w-full px-6 py-3 rounded-2xl transition font-semibold';

    if (registered) {
      return `${base} bg-green-500 text-white cursor-not-allowed`;
    }
    if (isLoading) {
      return `${base} bg-primary/70 text-white cursor-wait`;
    }
    return `${base} bg-primary text-white hover:bg-primary-dark`;
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleRegister}
        disabled={isLoading || registered}
        className={getButtonClasses()}
        aria-disabled={isLoading || registered}
        aria-busy={isLoading}
      >
        {getButtonText()}
      </button>

      <div
        aria-live="polite"
        aria-atomic="true"
        role="status"
        className={statusMessage ? 'text-sm text-center mt-2' : 'sr-only'}
      >
        {statusMessage && (
          <p className={isError ? 'text-red-600' : 'text-green-600'}>
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
};
