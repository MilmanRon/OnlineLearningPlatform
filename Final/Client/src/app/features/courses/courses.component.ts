import { Location } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SuccessAlertComponent } from '../shared/components/alerts/success-alert/success-alert.component';
import { NotificationService } from '../shared/services/notification.service';
import { single } from 'rxjs';
import { ErrorAlertComponent } from '../shared/components/alerts/error-alert/error-alert.component';

@Component({
  selector: 'app-courses',
  imports: [RouterOutlet, SuccessAlertComponent, ErrorAlertComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
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
    })
  }

  showSuccessAlert(successMessage: string) {
    this.successMessage.set(successMessage);
    this.isSuccessful.set(true);

    setTimeout(() => {
      this.isSuccessful.set(false);
    }, 3500);
  }

  showErrorAlert(errorMessage: string){
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
