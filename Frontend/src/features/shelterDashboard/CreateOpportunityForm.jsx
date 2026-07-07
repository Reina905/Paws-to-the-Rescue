import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useFormState } from '../../hooks/useFormState';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { FormField } from '../../components/FormField';
import { FormError } from '../../components/FormError';
import {
  validateRequired,
  validateMaxLength,
  validateIntRange,
  validateUrl,
  validateFutureDate,
} from '../../utils/formValidation';

const FALLBACK_CATEGORIES = [
  'Feeding',
  'Cleaning',
  'Walks',
  'Medical Care',
  'Events',
  'Transport',
  'Other',
];

/**
 * CreateOpportunityForm — Shelter-only form for creating volunteer opportunities.
 *
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 6.5, 6.7
 */
export const CreateOpportunityForm = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  // Category state
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState(null);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);

  // Success state for ARIA live region
  const [successMessage, setSuccessMessage] = useState('');

  // Validation schema
  const validationSchema = useMemo(() => ({
    name: [
      (v) => validateRequired(v, 'Name'),
      (v) => validateMaxLength(v, 200, 'Name'),
    ],
    category: [
      (v) => validateRequired(v, 'Category'),
    ],
    location: [
      (v) => validateRequired(v, 'Location'),
      (v) => validateMaxLength(v, 200, 'Location'),
    ],
    date: [
      (v) => validateRequired(v, 'Date'),
      (v) => validateFutureDate(v),
    ],
    duration: [
      (v) => validateRequired(v, 'Duration'),
    ],
    totalSpaces: [
      (v) => validateRequired(v, 'Total Spaces'),
      (v) => validateIntRange(v, 1, 10000, 'Total Spaces'),
    ],
    image: [
      (v) => validateUrl(v),
    ],
  }), []);

  const { values, errors, setField, validate } = useFormState(
    {
      name: '',
      category: '',
      location: '',
      date: '',
      duration: '',
      totalSpaces: '',
      image: '',
    },
    validationSchema
  );

  // Fetch categories on mount
  useEffect(() => {
    let cancelled = false;

    const fetchCategories = async () => {
      try {
        const response = await api.get('/opportunities/categories');
        if (!cancelled) {
          const data = response.data;
          const cats = Array.isArray(data) ? data : [];
          setCategories(cats.length > 0 ? cats : FALLBACK_CATEGORIES);
          setCategoriesLoaded(true);
          setCategoryError(null);
        }
      } catch {
        if (!cancelled) {
          // Endpoint doesn't exist or failed — use fallback categories
          setCategories(FALLBACK_CATEGORIES);
          setCategoriesLoaded(true);
          setCategoryError(null);
        }
      }
    };

    fetchCategories();
    return () => { cancelled = true; };
  }, []);

  // Submit function with 30-second timeout
  const submitOpportunity = useCallback(async (data) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const payload = {
        name: data.name,
        category: data.category,
        location: data.location,
        date: data.date,
        duration: data.duration,
        totalSpaces: Number(data.totalSpaces),
      };

      if (data.image && data.image.trim() !== '') {
        payload.image = data.image.trim();
      }

      const response = await api.post('/opportunities', payload, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
        throw new Error('The request took too long. Please try again.');
      }

      // Map status codes to descriptive messages
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          throw new Error(
            error.response.data?.message || 'Invalid data. Please check the fields and try again.'
          );
        }
        if (status === 401) {
          throw new Error('Unauthorized. Please log in again.');
        }
        if (status >= 500) {
          throw new Error('Server error. Please try again later.');
        }
      }

      throw error;
    }
  }, []);

  const { submit, isSubmitting, submitError, clearSubmitError } = useFormSubmit(submitOpportunity);

  // Focus first invalid field
  const focusFirstInvalidField = useCallback(() => {
    if (!formRef.current) return;

    const fieldOrder = ['name', 'category', 'location', 'date', 'duration', 'totalSpaces', 'image'];
    for (const fieldName of fieldOrder) {
      const el = formRef.current.querySelector(`#opp-${fieldName}`);
      if (el && el.getAttribute('aria-invalid') === 'true') {
        el.focus();
        return;
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearSubmitError();
    setSuccessMessage('');

    // Check if categories failed to load and are blocking submission
    if (categoryError) return;

    const isValid = validate();
    if (!isValid) {
      // Use setTimeout to allow React to render the errors first
      setTimeout(() => focusFirstInvalidField(), 0);
      return;
    }

    try {
      const response = await submit(values);
      if (response && response.status === 201) {
        setSuccessMessage('Opportunity created successfully!');
        setTimeout(() => {
          navigate('/shelter-dashboard');
        }, 1500);
      }
    } catch {
      // Error is handled by useFormSubmit — data is preserved
    }
  };

  const categoryHasError = Boolean(errors.category);
  const categoryErrorId = 'opp-category-error';

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="w-full max-w-lg mx-auto">
      {/* ARIA live region for success announcements */}
      <div aria-live="polite" role="status" className="sr-only">
        {successMessage}
      </div>

      {/* Visible success message */}
      {successMessage && (
        <div className="rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-green-700 mb-4">
          <p className="text-sm font-medium">{successMessage}</p>
        </div>
      )}

      {/* Top-level form error */}
      <FormError message={submitError} onRetry={categoryError ? undefined : () => handleSubmit({ preventDefault: () => {} })} />

      {/* Category fetch error — blocks submission */}
      {categoryError && (
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3 text-yellow-700 mb-4" role="alert">
          <p className="text-sm font-medium">{categoryError}</p>
        </div>
      )}

      {/* Name */}
      <FormField
        id="opp-name"
        label="Opportunity Name"
        type="text"
        value={values.name}
        onChange={(val) => setField('name', val)}
        error={errors.name}
        required
        maxLength={200}
        placeholder="E.g.: Dog walking in the park"
      />

      {/* Category — custom select since FormField only renders <input> */}
      <div className="mt-5">
        <label htmlFor="opp-category" className="text-sm text-gray-600">
          Category
          <span className="text-red-500 ml-1" aria-hidden="true">*</span>
        </label>

        <div
          className={`flex items-center gap-2 border rounded-full px-4 py-3 mt-2 transition-colors
            ${categoryHasError ? 'border-red-500' : 'border-gray-300'}
            ${categoryError ? 'bg-gray-100 opacity-60' : 'bg-white'}
            focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary`}
        >
          <select
            id="opp-category"
            value={values.category}
            onChange={(e) => setField('category', e.target.value)}
            disabled={Boolean(categoryError)}
            aria-required="true"
            aria-invalid={categoryHasError ? 'true' : 'false'}
            aria-describedby={categoryHasError ? categoryErrorId : undefined}
            className="w-full outline-none bg-transparent appearance-none cursor-pointer"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {categoryHasError && (
          <span
            id={categoryErrorId}
            className="text-red-500 text-xs mt-1 block"
            role="alert"
          >
            {errors.category}
          </span>
        )}
      </div>

      {/* Location */}
      <FormField
        id="opp-location"
        label="Location"
        type="text"
        value={values.location}
        onChange={(val) => setField('location', val)}
        error={errors.location}
        required
        maxLength={200}
        placeholder="E.g.: Central Park, City"
      />

      {/* Date */}
      <FormField
        id="opp-date"
        label="Date"
        type="date"
        value={values.date}
        onChange={(val) => setField('date', val)}
        error={errors.date}
        required
      />

      {/* Duration */}
      <FormField
        id="opp-duration"
        label="Duration"
        type="text"
        value={values.duration}
        onChange={(val) => setField('duration', val)}
        error={errors.duration}
        required
        placeholder="E.g.: 2 hours"
      />

      {/* Total Spaces */}
      <FormField
        id="opp-totalSpaces"
        label="Total Spaces"
        type="number"
        value={values.totalSpaces}
        onChange={(val) => setField('totalSpaces', val)}
        error={errors.totalSpaces}
        required
        min={1}
        max={10000}
        placeholder="E.g.: 10"
      />

      {/* Image (optional) */}
      <FormField
        id="opp-image"
        label="Image (URL, optional)"
        type="url"
        value={values.image}
        onChange={(val) => setField('image', val)}
        error={errors.image}
        placeholder="https://example.com/image.jpg"
      />

      {/* Submit button */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting || Boolean(categoryError)}
          className="w-full rounded-full bg-primary px-6 py-3 text-white font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating opportunity...' : 'Create Opportunity'}
        </button>
      </div>
    </form>
  );
};
