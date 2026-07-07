import { useState, useEffect, useRef, useMemo } from "react"
import { X } from "lucide-react"
import { FormField } from "../../components/FormField"
import { FormError } from "../../components/FormError"
import {
  validateRequired,
  validateMaxLength,
  validateIntRange,
  validateUrl,
  validateFutureDate,
  validateForm,
  runValidators,
} from "../../utils/formValidation"

const CATEGORIES = [
  "Animal Care",
  "Cleaning",
  "Feeding",
  "Walking",
  "Medical",
  "Administrative",
  "Events",
  "Other",
]

const getInitialValues = (opportunity) => ({
  name: opportunity?.name || "",
  category: opportunity?.category || "",
  location: opportunity?.location || "",
  date: opportunity?.date || "",
  duration: opportunity?.duration || "",
  totalSpaces: opportunity?.totalSpaces != null ? String(opportunity.totalSpaces) : "",
  image: opportunity?.image || "",
})

/**
 * OpportunityFormModal — Modal form for creating or editing a volunteer opportunity.
 * Pre-populates fields in edit mode when `opportunity` prop is provided.
 * Preserves form data on API error so the user can retry without re-entering.
 *
 * @param {{ opportunity?: Object, onSubmit: (data: Object) => Promise<void>, onCancel: () => void, isSubmitting: boolean, submitError: string|null }} props
 */
export const OpportunityFormModal = ({ opportunity, onSubmit, onCancel, isSubmitting, submitError }) => {
  const cancelRef = useRef(null)
  const previousFocusRef = useRef(null)
  const formRef = useRef(null)

  const isEditMode = Boolean(opportunity)

  const [values, setValues] = useState(() => getInitialValues(opportunity))
  const [errors, setErrors] = useState({})

  // Re-populate when opportunity changes (e.g. opening edit for different item)
  useEffect(() => {
    setValues(getInitialValues(opportunity))
    setErrors({})
  }, [opportunity])

  // Focus management
  useEffect(() => {
    previousFocusRef.current = document.activeElement
    const timer = setTimeout(() => {
      cancelRef.current?.focus()
    }, 0)
    return () => {
      clearTimeout(timer)
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [])

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onCancel()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onCancel])

  // Today's date string for min attribute
  const today = useMemo(() => {
    const d = new Date()
    return d.toISOString().split("T")[0]
  }, [])

  // Validation schema
  const validationSchema = useMemo(() => ({
    name: [
      (v) => validateRequired(v, "Name"),
      (v) => validateMaxLength(v, 100, "Name"),
    ],
    category: [
      (v) => validateRequired(v, "Category"),
    ],
    location: [
      (v) => validateRequired(v, "Location"),
      (v) => validateMaxLength(v, 200, "Location"),
    ],
    date: [
      (v) => validateRequired(v, "Date"),
      (v) => validateFutureDate(v),
    ],
    duration: [
      (v) => validateRequired(v, "Duration"),
    ],
    totalSpaces: [
      (v) => validateRequired(v, "Total spaces"),
      (v) => validateIntRange(v, 1, 10000, "Total spaces"),
    ],
    image: [
      (v) => validateUrl(v),
    ],
  }), [])

  const setField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    // Clear field error if it now passes validation
    setErrors((prev) => {
      if (!prev[name]) return prev
      if (validationSchema[name]) {
        const fieldError = runValidators(value, validationSchema[name])
        if (!fieldError) {
          const { [name]: _, ...rest } = prev
          return rest
        }
      }
      return prev
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Run full validation
    const { isValid, errors: formErrors } = validateForm(values, validationSchema)
    const activeErrors = {}
    for (const [field, error] of Object.entries(formErrors)) {
      if (error) activeErrors[field] = error
    }
    setErrors(activeErrors)

    if (!isValid) return

    // Build payload
    const payload = {
      name: values.name.trim(),
      category: values.category,
      location: values.location.trim(),
      date: values.date,
      duration: values.duration.trim(),
      totalSpaces: Number(values.totalSpaces),
    }

    if (values.image && values.image.trim() !== "") {
      payload.image = values.image.trim()
    }

    await onSubmit(payload)
    // Note: form data is NOT cleared here — onSubmit caller handles closing modal on success
  }

  const categoryHasError = Boolean(errors.category)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="opportunity-form-title"
        className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <h2
            id="opportunity-form-title"
            className="text-lg font-semibold text-primary"
          >
            {isEditMode ? "Edit Opportunity" : "Create New Opportunity"}
          </h2>
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Close"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} noValidate className="p-6 pt-4">
          {/* API error message above form */}
          {submitError && (
            <div className="mb-4">
              <FormError message={submitError} />
            </div>
          )}

          {/* Name */}
          <FormField
            id="opp-modal-name"
            label="Name"
            type="text"
            value={values.name}
            onChange={(val) => setField("name", val)}
            error={errors.name}
            required
            maxLength={100}
            placeholder="e.g. Dog Walking at the Park"
          />

          {/* Category */}
          <div className="mt-5">
            <label htmlFor="opp-modal-category" className="text-sm text-gray-600">
              Category
              <span className="text-red-500 ml-1" aria-hidden="true">*</span>
            </label>

            <div
              className={`flex items-center gap-2 border rounded-full px-4 py-3 mt-2 transition-colors
                ${categoryHasError ? "border-red-500" : "border-gray-300"}
                bg-white focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary`}
            >
              <select
                id="opp-modal-category"
                value={values.category}
                onChange={(e) => setField("category", e.target.value)}
                aria-required="true"
                aria-invalid={categoryHasError ? "true" : "false"}
                aria-describedby={categoryHasError ? "opp-modal-category-error" : undefined}
                className="w-full outline-none bg-transparent appearance-none cursor-pointer"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {categoryHasError && (
              <span
                id="opp-modal-category-error"
                className="text-red-500 text-xs mt-1 block"
                role="alert"
              >
                {errors.category}
              </span>
            )}
          </div>

          {/* Location */}
          <FormField
            id="opp-modal-location"
            label="Location"
            type="text"
            value={values.location}
            onChange={(val) => setField("location", val)}
            error={errors.location}
            required
            maxLength={200}
            placeholder="e.g. Central Park, City"
          />

          {/* Date */}
          <FormField
            id="opp-modal-date"
            label="Date"
            type="date"
            value={values.date}
            onChange={(val) => setField("date", val)}
            error={errors.date}
            required
            min={today}
          />

          {/* Duration */}
          <FormField
            id="opp-modal-duration"
            label="Duration"
            type="text"
            value={values.duration}
            onChange={(val) => setField("duration", val)}
            error={errors.duration}
            required
            placeholder="e.g. 2 hours"
          />

          {/* Total Spaces */}
          <FormField
            id="opp-modal-totalSpaces"
            label="Total Spaces"
            type="number"
            value={values.totalSpaces}
            onChange={(val) => setField("totalSpaces", val)}
            error={errors.totalSpaces}
            required
            min={1}
            max={10000}
            placeholder="e.g. 10"
          />

          {/* Image URL (optional) */}
          <FormField
            id="opp-modal-image"
            label="Image URL (optional)"
            type="url"
            value={values.image}
            onChange={(val) => setField("image", val)}
            error={errors.image}
            placeholder="https://example.com/image.jpg"
          />

          {/* Action buttons */}
          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 rounded-xl border border-secondary text-secondary-dark font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? (isEditMode ? "Saving..." : "Creating...")
                : (isEditMode ? "Save Changes" : "Create Opportunity")
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
