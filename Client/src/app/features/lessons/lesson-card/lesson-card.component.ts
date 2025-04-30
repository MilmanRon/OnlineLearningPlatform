import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Lesson } from '../../../core/domain/Models/lesson.model';
import { Router, RouterLink } from '@angular/router';
import { ProgressStore } from '../../../data/store/progress.store';
import { NgClass } from '@angular/common';
import { Role } from '../../../core/domain/Models/user.model';
import { UserStore } from '../../../data/store/user.store';
import { ModalService } from '../../shared/services/modal.service';
import { ApiLessonRepository } from '../../../data/repositories/api-lesson.repository';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-lesson-card',
  imports: [NgClass, RouterLink],
  templateUrl: './lesson-card.component.html',
  styleUrl: './lesson-card.component.css',
})
export class LessonCardComponent implements OnInit {
  notificationService = inject(NotificationService);
  lesson = input.required<Lesson>();
  router = inject(Router);
  progressStore = inject(ProgressStore);
  userStore = inject(UserStore);
  modalService = inject(ModalService);
  isProcessing = signal<boolean>(false);
  apiLessonRepository = inject(ApiLessonRepository);
  Role = Role;

  ngOnInit(): void {
    if (this.userStore.user()?.role === Role.Student) {
      this.setLessonStatus();
    }
  }

  setLessonStatus() {
    if (
      this.progressStore
        .progress()
        ?.find((progress) => progress.lessonId === this.lesson().id)
    ) {
      this.lesson().isCompleted = true;
    }
  }

  deleteLesson() {
    this.modalService.setModalContent(
      'Lesson Delete Confirmation',
      `Are you sure you want to delete "${this.lesson().title}"?`
    );

    this.modalService.showModal(
      // On Accept callback
      () => {
        this.processLessonDelete();
      },

      // On Decline callback
      () => {
        console.log('Delete canceled by user');
      }
    );
  }

  processLessonDelete() {
    this.isProcessing.set(true);

    if (!this.userStore.user()) {
      console.log('User must be logged in');
      this.isProcessing.set(false);
      return;
    }

    this.apiLessonRepository
      .delete(this.lesson().courseId, this.lesson().id)
      .subscribe({
        next: () => {
          this.notificationService.notifySuccess('Lesson has been deleted.');
          this.isProcessing.set(false);
        },
        error: () => {
          this.notificationService.notifyError(
            'Unable to delete lesson, please try again.'
          );
          this.isProcessing.set(false);
        },
      });
  }
}
