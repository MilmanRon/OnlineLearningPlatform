import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiErrorService } from '../shared/services/api-error.service';
import { ErrorAlertComponent } from '../shared/components/alerts/error-alert/error-alert.component';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, ErrorAlertComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  notificationService = inject(NotificationService);
  errorMessage = signal<string>('');
  hasError = signal<boolean>(false);

  ngOnInit(): void {
    this.notificationService.error$.subscribe((error) => {
      this.showErrorAlert(error);
    });
  }

  showErrorAlert(errorMessage: string) {
    this.errorMessage.set(errorMessage);
    this.hasError.set(true);

    setTimeout(() => {
      this.hasError.set(false);
    }, 3000);
  }
}
