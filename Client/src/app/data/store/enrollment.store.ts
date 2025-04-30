import { Injectable, signal } from '@angular/core';
import { Enrollment } from '../../core/domain/Models/enrollment.model';

@Injectable({ providedIn: 'root' })
export class EnrollmentStore {
  private enrollmentsSignal = signal<Enrollment[] | null>(null);

  readonly enrollments = this.enrollmentsSignal.asReadonly();

  setEnrollments(enrollments: Enrollment[]): void {
    console.log('enrollment store',enrollments);
    this.enrollmentsSignal.set(enrollments);
  }

  addEnrollment(newEnrollment: Enrollment): void {
    this.enrollmentsSignal.update((enrollments) => {
      if (!enrollments) return [newEnrollment];

      return [...enrollments, newEnrollment];
    });
  }

  deleteEnrollment(enrollmentId: string): void {
    this.enrollmentsSignal.update((enrollments) => {
      if (!enrollments) return null;

      return enrollments.filter((enrollment) => enrollment.id !== enrollmentId);
    });
  }

  clear(){
    this.enrollmentsSignal.set(null);
  }
}
