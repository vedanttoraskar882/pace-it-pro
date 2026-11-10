export type PilotFormValues = {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  organisationName: string;
};

export type PilotFormErrors = Partial<Record<keyof PilotFormValues, string>>;

export const PILOT_STORAGE_KEY = 'practitrace_pilot_requests';

export function savePilotRequest(values: PilotFormValues): void {
  const raw = window.localStorage.getItem(PILOT_STORAGE_KEY);
  const previous = raw === null ? [] : JSON.parse(raw);

  if (!Array.isArray(previous)) {
    throw new Error('Unexpected pilot request storage format');
  }

  const entry = {
    fullName: values.fullName.trim(),
    phoneNumber: values.phoneNumber.trim(),
    emailAddress: values.emailAddress.trim(),
    organisationName: values.organisationName.trim(),
    submittedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(
    PILOT_STORAGE_KEY,
    JSON.stringify([...previous, entry])
  );
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHAR_PATTERN = /^\+?[0-9\s()-]+$/;

export function validatePilotForm(values: PilotFormValues): PilotFormErrors {
  const errors: PilotFormErrors = {};

  const fullName = values.fullName.trim();
  if (!fullName) {
    errors.fullName = 'Please enter your full name.';
  }

  const phoneNumber = values.phoneNumber.trim();
  const digitCount = phoneNumber.replace(/\D/g, '').length;
  if (!phoneNumber) {
    errors.phoneNumber = 'Please enter a phone number.';
  } else if (
    !PHONE_CHAR_PATTERN.test(phoneNumber) ||
    digitCount < 7 ||
    digitCount > 20
  ) {
    errors.phoneNumber =
      'Please enter a valid UK or international phone number using digits, spaces, +, brackets or hyphens.';
  }

  const emailAddress = values.emailAddress.trim();
  if (!emailAddress) {
    errors.emailAddress = 'Please enter an email address.';
  } else if (!EMAIL_PATTERN.test(emailAddress)) {
    errors.emailAddress = 'Please enter a valid email address.';
  }

  const organisationName = values.organisationName.trim();
  if (!organisationName) {
    errors.organisationName = 'Please enter your school or organisation name.';
  }

  return errors;
}
