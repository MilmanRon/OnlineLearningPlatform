import { Location } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorAlertComponent } from '../shared/components/alerts/error-alert/error-alert.component';
import { SuccessAlertComponent } from '../shared/components/alerts/success-alert/success-alert.component';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-users',
  imports: [RouterOutlet, ErrorAlertComponent, SuccessAlertComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  location = inject(Location);
  notificationService = inject(NotificationService);

  successMessage = signal<string>('');
  errorMessage = signal<string>('');

  isSuccessful = signal<boolean>(false);
  hasError = signal<boolean>(false);

  ngOnInit(): void {
    this.notificationService.success$.subscribe((success) => {
      this.showSuccessAlert(success);
    });

    this.notificationService.error$.subscribe((error) => {
      this.showErrorAlert(error);
    });
  }

  showSuccessAlert(successMessage: string) {
    this.successMessage.set(successMessage);
    this.isSuccessful.set(true);

    setTimeout(() => {
      this.isSuccessful.set(false);
    }, 3500);
  }

  showErrorAlert(errorMessage: string) {
    this.errorMessage.set(errorMessage);
    this.hasError.set(true);

    setTimeout(() => {
      this.hasError.set(false);
    }, 3500);
  }

  goToPreviousPage() {
    this.location.back();
  }
}
