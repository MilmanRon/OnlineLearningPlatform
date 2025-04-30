import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtilsService } from '../../shared/utils/form-utils.service';
import { CourseStore } from '../../../data/store/course.store';
import { ApiLessonRepository } from '../../../data/repositories/api-lesson.repository';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { Lesson } from '../../../core/domain/Models/lesson.model';
import { ApiErrorService } from '../../shared/services/api-error.service';
import { CustomValidators } from '../../shared/utils/custom-validators';

@Component({
  selector: 'app-lesson-edit',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './lesson-edit.component.html',
  styleUrl: './lesson-edit.component.css',
})
export class LessonEditComponent {
  formUtils = inject(FormUtilsService);
  courseStore = inject(CourseStore);
  apiLessonRepository = inject(ApiLessonRepository);
  notificationService = inject(NotificationService);
  apiErrorService = inject(ApiErrorService);
  route = inject(ActivatedRoute);

  courseId = this.route.snapshot.paramMap.get('courseId') ?? '';
  lessonId = this.route.snapshot.paramMap.get('lessonId') ?? '';

  lesson = signal<Lesson | undefined>(
    this.lessonId && this.courseId
      ? this.courseStore.getLesson(this.courseId, this.lessonId)
      : undefined
  );

  isProcessing = signal<boolean>(false);

  editLessonForm = new FormGroup({
    title: new FormControl(this.lesson()?.title, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(30),
    ]),
    videoUrl: new FormControl(this.lesson()?.videoUrl, [Validators.required, CustomValidators.requireVideoUrlFormat()]),
  });

  get title() {
    return this.editLessonForm.get('title');
  }

  get videoUrl() {
    return this.editLessonForm.get('videoUrl');
  }

  onSubmit() {
    if (this.editLessonForm.invalid) {
      this.editLessonForm.markAllAsTouched();
      return;
    }

    const editedLesson = this.editLessonForm.value as Partial<Lesson>;

    this.editLesson(editedLesson);
  }

  editLesson(editedLesson: Partial<Lesson>) {
    this.isProcessing.set(true);
    this.apiLessonRepository.update(this.lessonId, editedLesson).subscribe({
      next: () => {
        this.notificationService.notifySuccess('Lesson updated succefully !');
        this.isProcessing.set(false);
        this.lesson.set(
          this.courseStore.getLesson(this.courseId, this.lessonId)
        );
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
