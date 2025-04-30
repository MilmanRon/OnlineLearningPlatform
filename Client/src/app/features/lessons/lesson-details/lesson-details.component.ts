import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from '../../../core/domain/Models/lesson.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProgressStore } from '../../../data/store/progress.store';
import { CourseStore } from '../../../data/store/course.store';
import { ApiProgressRespository } from '../../../data/repositories/api-progress.repository';
import { UserStore } from '../../../data/store/user.store';
import { Progress } from '../../../core/domain/Models/progress.model';
import { NgClass } from '@angular/common';
import { Role } from '../../../core/domain/Models/user.model';

@Component({
  selector: 'app-lesson-details',
  imports: [NgClass],
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.css',
})
export class LessonDetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  sanitizer = inject(DomSanitizer);

  courseStore = inject(CourseStore);
  userStore = inject(UserStore);
  progressStore = inject(ProgressStore);

  userId = this.userStore.user()?.id;
  Role = Role;

  apiProgressRepository = inject(ApiProgressRespository);

  lesson = signal<Lesson | undefined>(undefined);
  safeVideoUrl = signal<SafeResourceUrl | undefined>(undefined);
  isProcessing = signal<boolean>(false);

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('courseId')!;
    const lessonId = this.route.snapshot.paramMap.get('lessonId')!;
    this.lesson.set(this.courseStore.getLesson(courseId, lessonId));

    this.safeVideoUrl.set(
      this.sanitizer.bypassSecurityTrustResourceUrl(this.lesson()!.videoUrl)
    );
  }

  addProgress() {
    this.isProcessing.set(true);

    if (!this.userStore.user()) {
      console.log('User must be logged in');
      this.isProcessing.set(false);
      return;
    }

    const progress: Omit<Progress, 'id'> = {
      lessonId: this.lesson()?.id!,
    };

    this.apiProgressRepository.add(this.userId!, progress).subscribe({
      next: () => {
        this.lesson()!.isCompleted = true;
        this.isProcessing.set(false);
      },
      error: () => {
        console.log('Unable to add progress');
        this.isProcessing.set(false);
      },
    });
  }

  deleteProgress() {
    this.isProcessing.set(true);

    if (!this.userStore.user()) {
      console.log('User must be logged in');
      this.isProcessing.set(false);
      return;
    }

    const progressId: string | undefined = this.progressStore
      .progress()
      ?.find((progress) => progress.lessonId === this.lesson()?.id)?.id;

    this.apiProgressRepository.delete(progressId!).subscribe({
      next: () => {
        this.lesson()!.isCompleted = false;
        this.isProcessing.set(false);
      },
      error: () => {
        console.log('Unable to delete progress');
        this.isProcessing.set(false);
      },
    });
  }
}
