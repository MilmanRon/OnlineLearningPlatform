import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiLessonRepository } from '../../../data/repositories/api-lesson.repository';
import { NotificationService } from '../../shared/services/notification.service';
import { FormUtilsService } from '../../shared/utils/form-utils.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { Lesson } from '../../../core/domain/Models/lesson.model';
import { CourseStore } from '../../../data/store/course.store';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../../core/domain/Models/course.model';

@Component({
  selector: 'app-lesson-add',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './lesson-add.component.html',
  styleUrl: './lesson-add.component.css',
})
export class LessonAddComponent {
  formUtils = inject(FormUtilsService);
  apiLessonRepository = inject(ApiLessonRepository);
  notificationService = inject(NotificationService);
  isProcessing = signal<boolean>(false);

  courseStore = inject(CourseStore);
  route = inject(ActivatedRoute);
  courseId = this.route.snapshot.paramMap.get('courseId') ?? '';
  course = signal<Course | undefined>(
    this.courseStore.getCourseById(this.courseId)
  );

  addLessonForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(30),
    ]),
    videoUrl: new FormControl('', [Validators.required]),
  });

  get title() {
    return this.addLessonForm.get('title');
  }

  get videoUrl() {
    return this.addLessonForm.get('videoUrl');
  }

  onSubmit() {
    if (this.addLessonForm.invalid) {
      this.addLessonForm.markAllAsTouched();
      return;
    }

    const newLesson = {
      ...this.addLessonForm.value,
      courseId: this.course()?.id ?? '',
    } as Omit<Lesson, 'id' | 'isCompleted'>;

    this.addNewLesson(newLesson);    
  }

  addNewLesson(newLesson: Omit<Lesson, 'id' | 'isCompleted'>) {
    this.isProcessing.set(true);

    this.apiLessonRepository.create(newLesson).subscribe({
      next: () => {
        this.notificationService.notifySuccess('Lesson added succefully !');
        this.isProcessing.set(false);
        this.addLessonForm.reset();
      },

      error: (error) => {
        this.notificationService.notifyError(
          'Error adding lesson, please try again.'
        );
        this.isProcessing.set(false);
      },
    });
  }
}
