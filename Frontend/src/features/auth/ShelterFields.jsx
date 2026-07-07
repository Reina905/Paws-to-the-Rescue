import { Home, MapPin, Phone } from 'lucide-react';
import { FormField } from '../../components/FormField';

/**
 * ShelterFields - Renders shelter-specific registration form fields.
 *
 * Accepts values, errors, and onFieldChange props to integrate with the
 * parent SignUpForm state management.
 *
 * Validates: Requirements 1.3
 *
 * @param {Object} props
 * @param {Object} props.values - { shelterName, location, description, contactNumber, animalCapacity, logo }
 * @param {Object} props.errors - Error messages for each field (or empty object)
 * @param {(fieldName: string, value: string) => void} props.onFieldChange - Called with (fieldName, value) when any field changes
 */
export const ShelterFields = ({ values, errors, onFieldChange }) => {
  return (
    <>
      <FormField
        id="shelterName"
        label="Nombre del refugio"
        type="text"
        value={values.shelterName}
        onChange={(value) => onFieldChange('shelterName', value)}
        error={errors.shelterName}
        required
        maxLength={150}
        icon={<Home size={18} />}
      />

      <FormField
        id="location"
        label="Ubicación"
        type="text"
        value={values.location}
        onChange={(value) => onFieldChange('location', value)}
        error={errors.location}
        required
        maxLength={200}
        icon={<MapPin size={18} />}
      />

      <FormField
        id="description"
        label="Descripción"
        type="text"
        value={values.description}
        onChange={(value) => onFieldChange('description', value)}
        error={errors.description}
        maxLength={500}
        placeholder="Describe tu refugio..."
      />

      <FormField
        id="contactNumber"
        label="Número de contacto"
        type="text"
        value={values.contactNumber}
        onChange={(value) => onFieldChange('contactNumber', value)}
        error={errors.contactNumber}
        maxLength={20}
        icon={<Phone size={18} />}
      />

      <FormField
        id="animalCapacity"
        label="Capacidad de animales"
        type="number"
        value={values.animalCapacity}
        onChange={(value) => onFieldChange('animalCapacity', value)}
        error={errors.animalCapacity}
        min={1}
        max={10000}
      />

      <FormField
        id="logo"
        label="Logo (URL)"
        type="url"
        value={values.logo}
        onChange={(value) => onFieldChange('logo', value)}
        error={errors.logo}
        placeholder="https://..."
      />
    </>
  );
};
