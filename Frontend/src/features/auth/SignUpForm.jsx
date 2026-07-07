import { useState, useCallback, useMemo, useRef } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseAuth';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { useFormState } from '../../hooks/useFormState';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import {
  validateRequired,
  validateEmail,
  validateMinLength,
  validateMaxLength,
  validateIntRange,
  validateUrl,
} from '../../utils/formValidation';
import { RoleSelector } from './RoleSelector';
import { VolunteerFields } from './VolunteerFields';
import { ShelterFields } from './ShelterFields';
import { FormField } from '../../components/FormField';
import { FormError } from '../../components/FormError';

/**
 * Validation schemas per role.
 */
const volunteerSchema = {
  email: [
    (v) => validateRequired(v, 'Email'),
    (v) => validateEmail(v),
  ],
  password: [
    (v) => validateRequired(v, 'Password'),
    (v) => validateMinLength(v, 6, 'Password'),
  ],
  name: [
    (v) => validateRequired(v, 'First Name'),
    (v) => validateMaxLength(v, 100, 'First Name'),
  ],
  lastName: [
    (v) => validateRequired(v, 'Last Name'),
    (v) => validateMaxLength(v, 100, 'Last Name'),
  ],
  description: [(v) => validateMaxLength(v, 500, 'Description')],
  skills: [],
  contactNumber: [(v) => validateMaxLength(v, 20, 'Contact Number')],
};

const shelterSchema = {
  email: [
    (v) => validateRequired(v, 'Email'),
    (v) => validateEmail(v),
  ],
  password: [
    (v) => validateRequired(v, 'Password'),
    (v) => validateMinLength(v, 6, 'Password'),
  ],
  shelterName: [
    (v) => validateRequired(v, 'Shelter Name'),
    (v) => validateMaxLength(v, 150, 'Shelter Name'),
  ],
  location: [
    (v) => validateRequired(v, 'Location'),
    (v) => validateMaxLength(v, 200, 'Location'),
  ],
  description: [(v) => validateMaxLength(v, 500, 'Description')],
  contactNumber: [(v) => validateMaxLength(v, 20, 'Contact Number')],
  animalCapacity: [(v) => validateIntRange(v, 1, 10000, 'Animal Capacity')],
  logo: [(v) => validateUrl(v)],
};

const volunteerInitial = {
  name: '',
  lastName: '',
  description: '',
  skills: '',
  contactNumber: '',
};

const shelterInitial = {
  shelterName: '',
  location: '',
  description: '',
  contactNumber: '',
  animalCapacity: '',
  logo: '',
};

/**
 * SignUpForm — Role-aware registration form.
 *
 * Step 1: Supabase Auth signUp with role metadata.
 * Step 2: POST /volunteers or POST /shelters to create profile.
 *
 * Validates: Requirements 1.1, 1.4, 1.5, 1.6, 1.7, 1.8, 2.1, 2.5, 2.6, 6.5, 6.7
 */
export const SignUpForm = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [roleError, setRoleError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const formRef = useRef(null);

  // Shared fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Pick schema based on role
  const validationSchema = useMemo(() => {
    if (role === 'volunteer') return volunteerSchema;
    if (role === 'shelter') return shelterSchema;
    return null;
  }, [role]);

  // Role-specific initial values
  const roleInitialValues = useMemo(() => {
    if (role === 'volunteer') return volunteerInitial;
    if (role === 'shelter') return shelterInitial;
    return {};
  }, [role]);

  // Form state for role-specific fields
  const {
    values: roleValues,
    errors: roleErrors,
    setField: setRoleField,
    clearErrors,
    resetFields,
    validate: validateRoleFields,
  } = useFormState(roleInitialValues, validationSchema);

  // Shared fields validation (manual since they live outside useFormState)
  const [sharedErrors, setSharedErrors] = useState({});

  const validateSharedFields = useCallback(() => {
    const schema = validationSchema;
    if (!schema) return { isValid: false, errors: {} };

    const emailValidators = schema.email || [];
    const passwordValidators = schema.password || [];

    const errors = {};
    let isValid = true;

    for (const validator of emailValidators) {
      const err = validator(email);
      if (err) {
        errors.email = err;
        isValid = false;
        break;
      }
    }

    for (const validator of passwordValidators) {
      const err = validator(password);
      if (err) {
        errors.password = err;
        isValid = false;
        break;
      }
    }

    setSharedErrors(errors);
    return { isValid, errors };
  }, [email, password, validationSchema]);

  // Clear shared field error when value changes
  const handleEmailChange = useCallback((value) => {
    setEmail(value);
    setSharedErrors((prev) => {
      if (!prev.email) return prev;
      // eslint-disable-next-line no-unused-vars
      const { email: _removed, ...rest } = prev;
      return rest;
    });
  }, []);

  const handlePasswordChange = useCallback((value) => {
    setPassword(value);
    setSharedErrors((prev) => {
      if (!prev.password) return prev;
      // eslint-disable-next-line no-unused-vars
      const { password: _removed, ...rest } = prev;
      return rest;
    });
  }, []);

  // Role switch handler — preserves email/password, clears role-specific fields
  const handleRoleChange = useCallback((newRole) => {
    setRole(newRole);
    setRoleError(null);
    clearErrors();
    setSharedErrors({});
    resetFields();
  }, [clearErrors, resetFields]);

  // Profile creation error (separate from auth error for retry logic)
  const [profileError, setProfileError] = useState(null);

  // Flag to track if profile creation failed within the submit callback
  const profileFailedRef = useRef(false);
  const setIsSigningUp = useAuthStore((state) => state.setIsSigningUp);

  // Submit handler — performs auth signup AND profile creation in one go
  // to avoid GuestRoute redirect before profile is created.
  const handleSubmitFn = useCallback(async () => {
    profileFailedRef.current = false;
    setIsSigningUp(true);

    // Step 1: Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role },
      },
    });

    if (authError) {
      setIsSigningUp(false);
      throw new Error(authError.message);
    }

    // Step 2: Create profile on backend
    // This must happen before GuestRoute detects the new session and redirects.
    try {
      if (role === 'volunteer') {
        await api.post('/volunteers', {
          name: roleValues.name,
          lastName: roleValues.lastName,
          description: roleValues.description || undefined,
          skills: roleValues.skills || undefined,
          contactNumber: roleValues.contactNumber || undefined,
        });
      } else if (role === 'shelter') {
        await api.post('/shelters', {
          name: roleValues.shelterName,
          location: roleValues.location,
          description: roleValues.description || undefined,
          contactNumber: roleValues.contactNumber || undefined,
          animalCapacity: roleValues.animalCapacity
            ? Number(roleValues.animalCapacity)
            : undefined,
          logo: roleValues.logo || undefined,
        });
      }
    } catch (profileErr) {
      profileFailedRef.current = true;
      setIsSigningUp(false);
      const message =
        profileErr.response?.data?.message ||
        profileErr.message ||
        'Could not create profile. Please try again.';
      setProfileError(message);
      // Profile failed but auth succeeded — don't throw, let the user see the error
      return data;
    }

    setIsSigningUp(false);
    return data;
  }, [email, password, role, roleValues, setIsSigningUp]);

  const { submit, isSubmitting, submitError, clearSubmitError } = useFormSubmit(handleSubmitFn);

  // Focus first invalid field
  const focusFirstInvalid = useCallback(() => {
    // Small delay to allow DOM to update with aria-invalid
    setTimeout(() => {
      const invalid = formRef.current?.querySelector('[aria-invalid="true"]');
      if (invalid) {
        invalid.focus();
      }
    }, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearSubmitError();
    setProfileError(null);

    // Check role is selected
    if (!role) {
      setRoleError('Please select a role to continue');
      return;
    }

    // Validate shared fields
    const sharedResult = validateSharedFields();
    // Validate role-specific fields
    const roleValid = validateRoleFields();

    if (!sharedResult.isValid || !roleValid) {
      focusFirstInvalid();
      return;
    }

    // Submit auth + profile creation
    try {
      await submit();

      // If profile creation didn't fail, show success
      if (!profileFailedRef.current) {
        setSuccessMessage('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login', { state: { message: 'Registration successful. Please log in.' } });
        }, 1500);
      }
    } catch {
      // Auth error is already captured by useFormSubmit
    }
  };

  // Retry profile creation
  const handleRetryProfile = useCallback(async () => {
    setProfileError(null);
    try {
      if (role === 'volunteer') {
        await api.post('/volunteers', {
          name: roleValues.name,
          lastName: roleValues.lastName,
          description: roleValues.description || undefined,
          skills: roleValues.skills || undefined,
          contactNumber: roleValues.contactNumber || undefined,
        });
      } else if (role === 'shelter') {
        await api.post('/shelters', {
          name: roleValues.shelterName,
          location: roleValues.location,
          description: roleValues.description || undefined,
          contactNumber: roleValues.contactNumber || undefined,
          animalCapacity: roleValues.animalCapacity
            ? Number(roleValues.animalCapacity)
            : undefined,
          logo: roleValues.logo || undefined,
        });
      }
      setSuccessMessage('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login', { state: { message: 'Registration successful. Please log in.' } });
      }, 1500);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Could not create profile. Please try again.';
      setProfileError(message);
    }
  }, [role, roleValues, navigate]);

  return (
    <div className="bg-white rounded-[36px] shadow-xl p-10">
      <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
      <p className="text-gray-500 mt-2">
        Sign up as a volunteer or shelter
      </p>

      {/* ARIA live region for success announcement */}
      <div aria-live="polite" role="status" className="sr-only">
        {successMessage}
      </div>

      {successMessage && (
        <div className="mt-4 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-green-700 text-sm font-medium">
          {successMessage}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        {/* Top-level auth error */}
        <div className="mt-6">
          <FormError message={submitError} />
        </div>

        {/* Profile creation error with retry */}
        <div className="mt-2">
          <FormError message={profileError} onRetry={handleRetryProfile} />
        </div>

        {/* Role Selector */}
        <div className="mt-6">
          <RoleSelector selectedRole={role} onChange={handleRoleChange} />
          {roleError && (
            <p className="text-red-500 text-xs mt-2" role="alert">
              {roleError}
            </p>
          )}
        </div>

        {/* Shared fields: Email and Password */}
        {role && (
          <>
            <FormField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              error={sharedErrors.email}
              required
              placeholder="you@example.com"
              icon={<Mail size={18} />}
            />

            <FormField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              error={sharedErrors.password}
              required
              placeholder="••••••••"
              icon={<Lock size={18} />}
            />

            {/* Role-specific fields */}
            {role === 'volunteer' && (
              <VolunteerFields
                values={roleValues}
                errors={roleErrors}
                onFieldChange={setRoleField}
              />
            )}

            {role === 'shelter' && (
              <ShelterFields
                values={roleValues}
                errors={roleErrors}
                onFieldChange={setRoleField}
              />
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-8 bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </>
        )}
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{' '}
        <button
          onClick={() => navigate('/login')}
          className="text-primary font-semibold"
        >
          Log In
        </button>
      </p>
    </div>
  );
};
