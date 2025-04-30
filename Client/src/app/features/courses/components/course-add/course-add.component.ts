import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtilsService } from '../../../shared/utils/form-utils.service';
import { ApiCourseRepository } from '../../../../data/repositories/api-course.repository';
import { Course } from '../../../../core/domain/Models/course.model';
import { NotificationService } from '../../../shared/services/notification.service';
import { ApiErrorService } from '../../../shared/services/api-error.service';

@Component({
  selector: 'app-course-add',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './course-add.component.html',
  styleUrl: './course-add.component.css',
})
export class CourseAddComponent {
  formUtils = inject(FormUtilsService);
  apiCourseRepository = inject(ApiCourseRepository);
  notificationService = inject(NotificationService);
  apiErrorService = inject(ApiErrorService);
  isProcessing = signal<boolean>(false);

  addCourseForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(30),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
  });

  get title() {
    return this.addCourseForm.get('title');
  }

  get description() {
    return this.addCourseForm.get('description');
  }

  onSubmit() {
    if (this.addCourseForm.invalid) {
      this.addCourseForm.markAllAsTouched();
      return;
    }

    const newCourse = this.addCourseForm.value as Omit<
      Course,
      'id' | 'createdAt'
    >;

    this.addNewCourse(newCourse);
  }

  addNewCourse(newCourse: Omit<Course, 'id' | 'createdAt'>) {
    this.isProcessing.set(true);

    this.apiCourseRepository.create(newCourse).subscribe({
      next: () => {
        this.notificationService.notifySuccess('Course added succefully !');
        this.isProcessing.set(false);
        this.addCourseForm.reset();
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
