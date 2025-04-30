import { Component, inject, signal } from '@angular/core';
import { CourseStore } from '../../../../data/store/course.store';
import { Course } from '../../../../core/domain/Models/course.model';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { FormUtilsService } from '../../../shared/utils/form-utils.service';
import { ApiCourseRepository } from '../../../../data/repositories/api-course.repository';
import { NotificationService } from '../../../shared/services/notification.service';
import { ApiErrorService } from '../../../shared/services/api-error.service';

@Component({
  selector: 'app-course-edit',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './course-edit.component.html',
  styleUrl: './course-edit.component.css',
})
export class CourseEditComponent {
  formUtils = inject(FormUtilsService);
  courseStore = inject(CourseStore);
  apiCourseRepository = inject(ApiCourseRepository);
  notificationService = inject(NotificationService);
  apiErrorService = inject(ApiErrorService);
  route = inject(ActivatedRoute);

  courseId = this.route.snapshot.paramMap.get('courseId');
  course = signal<Course | undefined>(
    this.courseId ? this.courseStore.getCourseById(this.courseId) : undefined
  );
  isProcessing = signal<boolean>(false);

  editCourseForm = new FormGroup({
    title: new FormControl(this.course()?.title, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(30),
    ]),
    description: new FormControl(this.course()?.description, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
  });

  get title() {
    return this.editCourseForm.get('title');
  }

  get description() {
    return this.editCourseForm.get('description');
  }

  onSubmit() {
    if (this.editCourseForm.invalid) {
      this.editCourseForm.markAllAsTouched();
      return;
    }

    const course = this.editCourseForm.value as Partial<Course>;

    this.editCourse(course);
  }

  editCourse(editedCourse: Partial<Course>) {
    this.isProcessing.set(true);

    this.apiCourseRepository
      .update(this.courseId ?? '', editedCourse)
      .subscribe({
        next: () => {
          this.notificationService.notifySuccess('Course updated succefully !');
          this.isProcessing.set(false);
          this.course.set(this.courseStore.getCourseById(this.courseId ?? ''));
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
