import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Course } from '../../../../core/domain/Models/course.model';
import { CourseStore } from '../../../../data/store/course.store';
import { LessonListComponent } from '../../../lessons/lesson-list/lesson-list.component';
import { ProgressStore } from '../../../../data/store/progress.store';
import { Role } from '../../../../core/domain/Models/user.model';
import { UserStore } from '../../../../data/store/user.store';

@Component({
  selector: 'app-course-details',
  imports: [LessonListComponent, RouterLink],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  Role = Role;
  progressStore = inject(ProgressStore);
  courseStore = inject(CourseStore);
  userStore = inject(UserStore);

  route = inject(ActivatedRoute);
  router = inject(Router);

  courseId = this.route.snapshot.paramMap.get('courseId');
  course = signal<Course | undefined>(
    this.courseId ? this.courseStore.getCourseById(this.courseId) : undefined
  );
  courseProgressPercentage = computed<number | undefined>(() => {
    if (!this.course()) return undefined;

    const lessons = this.course()?.lessons || [];

    if (lessons.length === 0) return 0;

    const completedCount = lessons.filter((lesson) =>
      this.progressStore.progress()?.some((p) => p.lessonId === lesson.id)
    ).length;

    return (completedCount / lessons.length) * 100;
  });

  ngOnInit(): void {
    const courseLessonLoaded = this.route.snapshot.data['courseLessonLoaded'];
    const progressLoaded = this.route.snapshot.data['progressLoaded'];

    if (!courseLessonLoaded || !progressLoaded) {
      console.log('Resolvers failed, redirecting from component');
      this.router.navigate(['/courses'], {
        state: {
          errorMessage: 'API Error, please try again.',
        },
      });
    }
  }
}
