import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static requireUppercase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      return /[A-Z]/.test(value) ? null : { requireUppercase: true };
    };
  }

  static requireDigit(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      return /[0-9]/.test(value) ? null : { requireDigit: true };
    };
  }

  static requireSpecialChar(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      return /[^a-zA-Z0-9]/.test(value) ? null : { requireSpecialChar: true };
    };
  }

  static requireVideoUrlFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      return /^(https?:\/\/)?(www\.)?(youtube\.com\/embed\/|youtu\.be\/)[a-zA-Z0-9_-]{11}(?:\?.*)?$/.test(
        value
      )
        ? null
        : { requireVideoUrlFormat: true };
    };
  }
}
