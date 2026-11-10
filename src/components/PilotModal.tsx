import { useEffect, useId, useRef, useState } from 'react';
import {
  savePilotRequest,
  validatePilotForm,
  type PilotFormErrors,
  type PilotFormValues,
} from '../utils/pilotStorage';
import { AlertTriangleIcon, CheckCircleIcon, CloseIcon } from './Icons';

type PilotModalProps = {
  isOpen: boolean;
  onClose: () => void;
  returnFocusEl: HTMLElement | null;
};

const EMPTY_VALUES: PilotFormValues = {
  fullName: '',
  phoneNumber: '',
  emailAddress: '',
  organisationName: '',
};

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function PilotModal({
  isOpen,
  onClose,
  returnFocusEl,
}: PilotModalProps) {
  const [values, setValues] = useState<PilotFormValues>(EMPTY_VALUES);
  const [fieldErrors, setFieldErrors] = useState<PilotFormErrors>({});
  const [storageError, setStorageError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submittingLockRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const fullNameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const organisationRef = useRef<HTMLInputElement | null>(null);
  const closeAfterSaveRef = useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = useRef(false);

  const titleId = useId();
  const noticeId = useId();

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      wasOpenRef.current = true;
      setFieldErrors({});
      setStorageError(null);
      setIsSaved(false);
      setIsSubmitting(false);
      submittingLockRef.current = false;

      const raf = window.requestAnimationFrame(() => {
        fullNameRef.current?.focus();
      });
      return () => window.cancelAnimationFrame(raf);
    }

    if (!isOpen && wasOpenRef.current) {
      wasOpenRef.current = false;
      if (returnFocusEl && document.contains(returnFocusEl)) {
        returnFocusEl.focus();
      }
    }
  }, [isOpen, returnFocusEl]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ).filter((el) => el.getClientRects().length > 0);

        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (event.shiftKey) {
          if (!active || active === first || !dialogRef.current.contains(active)) {
            event.preventDefault();
            last.focus();
          }
        } else if (!active || active === last || !dialogRef.current.contains(active)) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const updateField = (field: keyof PilotFormValues, nextValue: string) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (isSaved) {
      setIsSaved(false);
    }
    if (storageError) {
      setStorageError(null);
    }
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const focusFirstInvalidField = (errors: PilotFormErrors) => {
    if (errors.fullName) {
      fullNameRef.current?.focus();
    } else if (errors.phoneNumber) {
      phoneRef.current?.focus();
    } else if (errors.emailAddress) {
      emailRef.current?.focus();
    } else if (errors.organisationName) {
      organisationRef.current?.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submittingLockRef.current || isSubmitting || isSaved) {
      return;
    }

    setStorageError(null);
    const errors = validatePilotForm(values);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      focusFirstInvalidField(errors);
      return;
    }

    submittingLockRef.current = true;
    setIsSubmitting(true);
    setFieldErrors({});

    try {
      savePilotRequest(values);
      setValues(EMPTY_VALUES);
      setIsSaved(true);
      window.requestAnimationFrame(() => {
        closeAfterSaveRef.current?.focus();
      });
    } catch {
      setIsSaved(false);
      setStorageError(
        'Unable to save your pilot request in this browser. Existing browser storage could not be read or updated, so your details were not saved.'
      );
    } finally {
      window.setTimeout(() => {
        submittingLockRef.current = false;
        setIsSubmitting(false);
      }, 0);
    }
  };

  const handleBackdropMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const errorCount = Object.keys(fieldErrors).length;

  return (
    <div
      className="modal-backdrop"
      onMouseDown={handleBackdropMouseDown}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={noticeId}
      >
        <div className="modal-header">
          <div>
            <p className="modal-kicker">West Midlands preview</p>
            <h2 id={titleId} className="modal-title">
              Request a Pilot
            </h2>
          </div>
          <button
            type="button"
            className="modal-icon-close"
            aria-label="Close Request a Pilot modal"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <p id={noticeId} className="modal-notice">
          This preview saves your details in this browser only. Your request is
          not sent to the PractiTrace team.
        </p>

        {isSaved ? (
          <div className="modal-status modal-status-success" role="status" aria-live="polite">
            <div className="modal-status-msg">
              <CheckCircleIcon className="modal-status-icon" />
              <p className="modal-status-text">
                Pilot request saved in this browser.
              </p>
            </div>
            <button
              ref={closeAfterSaveRef}
              type="button"
              className="btn btn-primary btn-compact"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : null}

        {storageError ? (
          <div className="modal-status modal-status-error" role="alert" aria-live="assertive">
            <div className="modal-status-msg">
              <AlertTriangleIcon className="modal-status-icon" />
              <p className="modal-status-text">{storageError}</p>
            </div>
          </div>
        ) : null}

        {errorCount > 0 ? (
          <div className="sr-only" role="alert" aria-live="assertive">
            {`Please correct ${errorCount} ${errorCount === 1 ? 'field' : 'fields'} in the form before saving.`}
          </div>
        ) : null}

        <form className="pilot-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="pilot-full-name" className="form-label">
              Full Name <span className="required-mark" aria-hidden="true">*</span>
            </label>
            <input
              ref={fullNameRef}
              id="pilot-full-name"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={Boolean(fieldErrors.fullName)}
              aria-describedby={fieldErrors.fullName ? 'pilot-full-name-error' : undefined}
              value={values.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              className={fieldErrors.fullName ? 'form-input form-input-error' : 'form-input'}
            />
            {fieldErrors.fullName ? (
              <p id="pilot-full-name-error" className="form-error">
                <AlertTriangleIcon className="form-error-icon" />
                <span>{fieldErrors.fullName}</span>
              </p>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="pilot-phone-number" className="form-label">
              Phone Number <span className="required-mark" aria-hidden="true">*</span>
            </label>
            <input
              ref={phoneRef}
              id="pilot-phone-number"
              name="phoneNumber"
              type="tel"
              autoComplete="tel"
              required
              aria-required="true"
              aria-invalid={Boolean(fieldErrors.phoneNumber)}
              aria-describedby={
                fieldErrors.phoneNumber ? 'pilot-phone-number-error' : undefined
              }
              value={values.phoneNumber}
              onChange={(e) => updateField('phoneNumber', e.target.value)}
              className={
                fieldErrors.phoneNumber ? 'form-input form-input-error' : 'form-input'
              }
            />
            {fieldErrors.phoneNumber ? (
              <p id="pilot-phone-number-error" className="form-error">
                <AlertTriangleIcon className="form-error-icon" />
                <span>{fieldErrors.phoneNumber}</span>
              </p>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="pilot-email-address" className="form-label">
              Email Address <span className="required-mark" aria-hidden="true">*</span>
            </label>
            <input
              ref={emailRef}
              id="pilot-email-address"
              name="emailAddress"
              type="email"
              autoComplete="email"
              required
              aria-required="true"
              aria-invalid={Boolean(fieldErrors.emailAddress)}
              aria-describedby={
                fieldErrors.emailAddress ? 'pilot-email-address-error' : undefined
              }
              value={values.emailAddress}
              onChange={(e) => updateField('emailAddress', e.target.value)}
              className={
                fieldErrors.emailAddress ? 'form-input form-input-error' : 'form-input'
              }
            />
            {fieldErrors.emailAddress ? (
              <p id="pilot-email-address-error" className="form-error">
                <AlertTriangleIcon className="form-error-icon" />
                <span>{fieldErrors.emailAddress}</span>
              </p>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="pilot-organisation-name" className="form-label">
              Organisation Name{' '}
              <span className="required-mark" aria-hidden="true">*</span>
            </label>
            <input
              ref={organisationRef}
              id="pilot-organisation-name"
              name="organisationName"
              type="text"
              autoComplete="organization"
              required
              aria-required="true"
              aria-invalid={Boolean(fieldErrors.organisationName)}
              aria-describedby={
                fieldErrors.organisationName
                  ? 'pilot-organisation-name-error'
                  : undefined
              }
              value={values.organisationName}
              onChange={(e) => updateField('organisationName', e.target.value)}
              className={
                fieldErrors.organisationName
                  ? 'form-input form-input-error'
                  : 'form-input'
              }
            />
            {fieldErrors.organisationName ? (
              <p id="pilot-organisation-name-error" className="form-error">
                <AlertTriangleIcon className="form-error-icon" />
                <span>{fieldErrors.organisationName}</span>
              </p>
            ) : null}
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || isSaved}
            >
              {isSubmitting ? 'Saving…' : 'Request a Pilot'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
