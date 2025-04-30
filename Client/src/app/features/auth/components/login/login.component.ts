import { Component, inject, signal } from '@angular/core';
import { ApiAuthRespository } from '../../../../data/repositories/api-auth.respository';
import { UserStore } from '../../../../data/store/user.store';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthCredentials } from '../../../../core/domain/Models/auth/auth-credentials.model';
import { FormUtilsService } from '../../../shared/utils/form-utils.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { ApiErrorService } from '../../../shared/services/api-error.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  apiAuthRepository = inject(ApiAuthRespository);
  userStore = inject(UserStore);
  router = inject(Router);
  formUtils = inject(FormUtilsService);
  notificationService = inject(NotificationService);
  apiErrorService = inject(ApiErrorService);

  isProcessing = signal<boolean>(false);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    this.processLogin();
    console.log(this.loginForm.value as AuthCredentials);
  }

 processLogin(){
    this.isProcessing.set(true);

    this.apiAuthRepository
    .login(this.loginForm.value as AuthCredentials)
    .subscribe({
      next: () => {
        console.log('User logged In succefuly');
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
