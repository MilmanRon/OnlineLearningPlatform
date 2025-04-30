import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../core/domain/Models/user.model';
import { CourseStore } from './course.store';
import { EnrollmentStore } from './enrollment.store';
import { LessonStore } from './lesson.store';
import { ProgressStore } from './progress.store';

@Injectable({ providedIn: 'root' })
export class UserStore {
  courseStore = inject(CourseStore);
  enrollmentStore = inject(EnrollmentStore);
  lessonStore = inject(LessonStore);
  progressStore = inject(ProgressStore);

  private userSignal = signal<User | null>(null);
  private tokenSignal = signal<string | null>(null);

  readonly user = this.userSignal.asReadonly();
  readonly token = this.tokenSignal.asReadonly();



  setUser(user: User | null): void {
    this.userSignal.set(user);
  }

  setToken(token: string | null): void {
    this.tokenSignal.set(token);
  }

  updateUser(updatedUser: User): void {
    console.log(updatedUser);

    this.userSignal.update((user) => {
      if (!user) return null;

      return updatedUser;
    });
  }

  clearUser(): void {
    this.userSignal.set(null);
    this.tokenSignal.set(null);
    this.courseStore.clear();
    this.enrollmentStore.clear();
    this.lessonStore.clear();
    this.progressStore.clear();
  }

  isLoggedIn(): boolean {
    if (this.userSignal() && this.tokenSignal()) return true;
    return false;
  }
}
