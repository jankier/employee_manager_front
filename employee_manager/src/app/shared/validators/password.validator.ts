import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validatePassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = !/[A-Z]+/.test(value);

    const hasLowerCase = !/[a-z]+/.test(value);

    const hasDigit = !/[0-9]+/.test(value);

    const hasWhiteSpace = /\s+/.test(value);

    const passwordValid = !hasUpperCase && !hasLowerCase && !hasDigit && !hasWhiteSpace;

    return !passwordValid
      ? {
          hasUpperCase,
          hasLowerCase,
          hasDigit,
          hasWhiteSpace,
        }
      : null;
  };
}
