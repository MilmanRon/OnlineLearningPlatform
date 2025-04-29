import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomValidators } from '../../../shared/utils/custom-validators';
import { Role } from '../../../../core/domain/Models/user.model';
import { ApiAuthRespository } from '../../../../data/repositories/api-auth.respository';
import { RegistrationData } from '../../../../core/domain/Models/auth/registration-data.model';
import { ApiErrorService } from '../../../shared/services/api-error.service';
import { UserStore } from '../../../../data/store/user.store';
import { Router, RouterLink } from '@angular/router';
import { FormUtilsService } from '../../../shared/utils/form-utils.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  apiAuthRepository = inject(ApiAuthRespository);
  userStore = inject(UserStore);
  router = inject(Router);
  formUtils = inject(FormUtilsService);
  apiErrorService = inject(ApiErrorService);
  notificationService = inject(NotificationService);
  Role = Role;

  isProcessing = signal<boolean>(false);

  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      CustomValidators.requireUppercase(),
      CustomValidators.requireDigit(),
      CustomValidators.requireSpecialChar(),
    ]),
    role: new FormControl(Role.Student),
  });

  get name() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }
    this.processRegistration();
    console.log(this.registrationForm.value as RegistrationData);
  }

  processRegistration() {
    this.isProcessing.set(true);

    this.apiAuthRepository
      .register(this.registrationForm.value as RegistrationData)
      .subscribe({
        next: () => {
          console.log('User registered succefuly');
          this.isProcessing.set(false);
          this.router.navigateByUrl('/');
        },
        error: (error) => {
            this.notificationService.notifyError(
              this.apiErrorService.getErrorDetails(error)
            );
            this.isProcessing.set(false);
          },
      });
  }
}
