import { Component, inject, input, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ModalService } from '../../../shared/services/modal.service';
import { Router, RouterLink } from '@angular/router';
import { Course } from '../../../../core/domain/Models/course.model';
import { Enrollment } from '../../../../core/domain/Models/enrollment.model';
import { Role } from '../../../../core/domain/Models/user.model';
import { ApiCourseRepository } from '../../../../data/repositories/api-course.repository';
import { ApiEnrollmentRepository } from '../../../../data/repositories/api-enrollment.repository';
import { EnrollmentStore } from '../../../../data/store/enrollment.store';
import { UserStore } from '../../../../data/store/user.store';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-course-card',
  imports: [NgClass],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent implements OnInit {
  notificationService = inject(NotificationService);
  modalService = inject(ModalService);
  course = input.required<Course>();

  private router = inject(Router);

  enrollmentStore = inject(EnrollmentStore);
  userStore = inject(UserStore);

  apiEnrollmentRepositoryService = inject(ApiEnrollmentRepository);
  apiCourseRepository = inject(ApiCourseRepository);

  isEnrolled = signal<boolean>(false);
  isEnrollmentMessageVisible = signal<boolean>(false);
  isProcessing = signal<boolean>(false);

  Role = Role;

  ngOnInit(): void {
    if (
      this.enrollmentStore
        .enrollments()
        ?.find((enrollment) => enrollment.courseId === this.course().id)
    ) {
      this.course().isEnrolled = true;
    }
  }

  onCourseCardClick() {
    if (
      this.course().isEnrolled ||
      this.userStore.user()?.role === Role.Instructor
    )
      this.navigateToCourse();
    else {
      this.isEnrollmentMessageVisible.set(true);
      setTimeout(() => {
        this.isEnrollmentMessageVisible.set(false);
      }, 2000);
    }
  }

  navigateToCourse() {
    this.router.navigateByUrl(`courses/${this.course().id}`);
  }

  navigateToCourseEditPage(event: MouseEvent) {
    event.stopPropagation();
    this.router.navigateByUrl(`courses/${this.course().id}/edit`);
  }

  enrollUser(event: MouseEvent) {
    event.stopPropagation();
    this.modalService.setModalContent(
      'Course Enrollment Confirmation',
      `Are you sure you want to enroll in "${this.course().title}"?`
    );

    this.modalService.showModal(
      // On Accept callback
      () => {
        this.processEnrollment();
      },

      // On Decline callback
      () => {
        console.log('Enrollment canceled by user');
      }
    );
  }

  unenrollUser(event: MouseEvent) {
    event.stopPropagation();
    this.modalService.setModalContent(
      'Course Enrollment Cancellation',
      `Are you sure you want to cancel your enrollment in "${
        this.course().title
      }"?`
    );

    this.modalService.showModal(
      // On Accept callback
      () => {
        this.processEnrollmentCancelation();
      },

      // On Decline callback
      () => {
        console.log('Enrollment canceled by user');
      }
    );
  }

  deleteCourse(event: MouseEvent) {
    event.stopPropagation();
    this.modalService.setModalContent(
      'Course Delete Confirmation',
      `Are you sure you want to delete "${this.course().title}"?`
    );

    this.modalService.showModal(
      // On Accept callback
      () => {
        this.processCourseDelete();
      },

      // On Decline callback
      () => {
        console.log('Delete canceled by user');
      }
    );
  }

  private processEnrollmentCancelation() {
    this.isProcessing.set(true);

    const enrollment = this.enrollmentStore
      .enrollments()
      ?.find((enrollment) => enrollment.courseId === this.course().id);

    if (this.userStore.user()) {
      this.apiEnrollmentRepositoryService.delete(enrollment!.id).subscribe({
        next: () => {
          this.course().isEnrolled = false;
          this.isProcessing.set(false);
        },
        error: () => {
          console.log('Error cancelling enrollment');
          this.isProcessing.set(false);
        },
      });
    } else {
      console.log('User not logged in');
    }
  }

  private processEnrollment() {
    this.isProcessing.set(true);

    if (!this.userStore.user()) {
      console.log('User must be logged in');
      this.isProcessing.set(false);
      return;
    }

    const enrollment: Omit<Enrollment, 'id'> = {
      courseId: this.course().id,
    };

    this.apiEnrollmentRepositoryService
      .add(this.userStore.user()!.id, enrollment)
      .subscribe({
        next: () => {
          this.course().isEnrolled = true;
          this.isProcessing.set(false);
        },
        error: () => {
          console.log('Unable to enroll user');
          this.isProcessing.set(false);
        },
      });
  }

  private processCourseDelete() {
    this.isProcessing.set(true);

    if (!this.userStore.user()) {
      console.log('User must be logged in');
      this.isProcessing.set(false);
      return;
    }

    this.apiCourseRepository.delete(this.course().id).subscribe({
      next: () => {
        this.notificationService.notifySuccess('Course has been deleted.');
        this.isProcessing.set(false);
      },
      error: () => {
        this.notificationService.notifyError(
          'Unable to delete course, please try again.'
        );
        this.isProcessing.set(false);
      },
    });
  }
}
