/**
 * FormField - Reusable accessible form field component
 *
 * Renders a label, input with optional icon, and error message with proper
 * ARIA attributes for accessibility (aria-required, aria-invalid, aria-describedby).
 *
 * Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.6
 */

/**
 * @param {Object} props
 * @param {string} props.id - Unique field id (used for htmlFor, aria-describedby)
 * @param {string} props.label - Label text
 * @param {string} [props.type='text'] - Input type (text, email, password, number, date, url)
 * @param {string|number} props.value - Current field value
 * @param {(value: string) => void} props.onChange - Change handler receiving the new value
 * @param {string|null} [props.error] - Validation error message
 * @param {boolean} [props.required=false] - Whether the field is required
 * @param {string} [props.placeholder] - Input placeholder text
 * @param {number} [props.maxLength] - Maximum character length
 * @param {number} [props.min] - Minimum value (for number/date inputs)
 * @param {number} [props.max] - Maximum value (for number/date inputs)
 * @param {boolean} [props.disabled=false] - Whether the input is disabled
 * @param {React.ReactNode} [props.icon] - Optional lucide-react icon element
 */
export const FormField = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  maxLength,
  min,
  max,
  disabled = false,
  icon,
}) => {
  const hasError = Boolean(error);
  const errorId = `${id}-error`;

  return (
    <div className="mt-5">
      <label htmlFor={id} className="text-sm text-gray-600">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div
        className={`flex items-center gap-2 border rounded-full px-4 py-3 mt-2 transition-colors
          ${hasError ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 opacity-60' : 'bg-white'}
          focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary`}
      >
        {icon && (
          <span className="text-gray-400 shrink-0">{icon}</span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          min={min}
          max={max}
          disabled={disabled}
          aria-required={required ? 'true' : undefined}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? errorId : undefined}
          className="w-full outline-none bg-transparent"
        />
      </div>

      {hasError && (
        <span
          id={errorId}
          className="text-red-500 text-xs mt-1 block"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
};
