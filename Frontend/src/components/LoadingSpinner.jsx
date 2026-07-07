export const LoadingSpinner = ({ className = '' }) => (
  <div className={`flex justify-center items-center py-12 ${className}`}>
    <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
  </div>
);
