import { User, Phone } from "lucide-react"
import { FormField } from "../../components/FormField"

/**
 * VolunteerFields - Renders volunteer-specific registration fields.
 *
 * Validates: Requirements 1.2
 *
 * @param {Object} props
 * @param {Object} props.values - { name, lastName, description, skills, contactNumber }
 * @param {Object} props.errors - Error messages keyed by field name
 * @param {(fieldName: string, value: string) => void} props.onFieldChange - Field change handler
 */
export const VolunteerFields = ({ values, errors, onFieldChange }) => {
  return (
    <>
      <FormField
        id="name"
        label="First Name"
        type="text"
        value={values.name}
        onChange={(value) => onFieldChange("name", value)}
        error={errors.name}
        required
        maxLength={100}
        icon={<User size={18} />}
      />

      <FormField
        id="lastName"
        label="Last Name"
        type="text"
        value={values.lastName}
        onChange={(value) => onFieldChange("lastName", value)}
        error={errors.lastName}
        required
        maxLength={100}
        icon={<User size={18} />}
      />

      <FormField
        id="description"
        label="Description"
        type="text"
        value={values.description}
        onChange={(value) => onFieldChange("description", value)}
        error={errors.description}
        placeholder="Tell us about yourself..."
        maxLength={500}
      />

      <FormField
        id="skills"
        label="Skills"
        type="text"
        value={values.skills}
        onChange={(value) => onFieldChange("skills", value)}
        error={errors.skills}
        placeholder="E.g.: Animal care, first aid..."
      />

      <FormField
        id="contactNumber"
        label="Contact Number"
        type="text"
        value={values.contactNumber}
        onChange={(value) => onFieldChange("contactNumber", value)}
        error={errors.contactNumber}
        maxLength={20}
        icon={<Phone size={18} />}
      />
    </>
  )
}
