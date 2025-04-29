import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { LessonCardComponent } from '../lesson-card/lesson-card.component';
import { Lesson } from '../../../core/domain/Models/lesson.model';
import { UserStore } from '../../../data/store/user.store';
import { ApiProgressRespository } from '../../../data/repositories/api-progress.repository';
import { ProgressStore } from '../../../data/store/progress.store';

@Component({
  selector: 'app-lesson-list',
  imports: [LessonCardComponent],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.css',
})
export class LessonListComponent implements OnInit {
  lessons = input.required<Lesson[] | undefined>();
  userStore = inject(UserStore);
  progressStore = inject(ProgressStore);
  progressRepositoryService = inject(ApiProgressRespository);
  isProgressLoaded = signal<boolean>(false);

  ngOnInit(): void {
    if (!this.userStore.user()) {
      console.log('User must be logged in to access this resource');
      return;
    }

    if (!this.progressStore.progress()) {
      console.log(
        'User has no cached progress, sending an API call to fetch progress'
      );
      this.loadUserProgress();
    } else this.isProgressLoaded.set(true);
  }

  loadUserProgress() {
    this.progressRepositoryService
      .getAllbyUserId(this.userStore.user()!.id)
      .subscribe({
        next: () => {
          console.log('User progress loaded succefuly');
          this.isProgressLoaded.set(true);
        },
        error: () => console.log('Error fetching user progress'),
      });
  }
}
