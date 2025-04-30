import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  getValidationClass(control: AbstractControl | null) {
    if (!control) return '';
    return control.invalid && (control.touched || control.dirty)
      ? 'is-invalid'
      : control.valid && (control.touched || control.dirty)
      ? 'is-valid'
      : '';
  }
}
