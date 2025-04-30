import { Routes } from '@angular/router';
import { AuthMapper } from './data/mappers/auth.mapper';
import { ApiAuthRespository } from './data/repositories/api-auth.respository';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ApiCourseRepository } from './data/repositories/api-course.repository';
import { CourseMapper } from './data/mappers/course.mapper';
import { LessonMapper } from './data/mappers/lesson.mapper';
import { ApiEnrollmentRepository } from './data/repositories/api-enrollment.repository';
import { ApiLessonRepository } from './data/repositories/api-lesson.repository';
import { ApiProgressRespository } from './data/repositories/api-progress.repository';
import { UserStore } from './data/store/user.store';
import { inject } from '@angular/core';
import { coursesResolver } from './infrastructure/resolvers/courses.resolver';
import { enrollmentsResolver } from './infrastructure/resolvers/enrollments.resolver';
import { courseLessonsResolver } from './infrastructure/resolvers/course-lessons.resolver';
import { progressResolver } from './infrastructure/resolvers/progress.resolver';
import { authGuard } from './infrastructure/guards/auth.guard';
import { roleGuard } from './infrastructure/guards/role.guard';
import { Role } from './core/domain/Models/user.model';
import { ApiUserRepository } from './data/repositories/api-user.repository';
import { UserMapper } from './data/mappers/user.mapper';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { UnauthorizedComponent } from './core/components/unauthorized/unauthorized.component';
import { userResolver } from './infrastructure/resolvers/user.resolver';
import { UserStorageService } from './infrastructure/services/user-storage.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: () => {
      const userStore = inject(UserStore);
      const userLocalStorageService = inject(UserStorageService);
      if (userStore.user() || userLocalStorageService.currentUserFromLocalStorage()) {
        return 'dashboard';
      }
      return 'home';
    },
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    resolve: {userResolver},
    providers: [ApiUserRepository, UserMapper],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'courses',
        providers: [ApiCourseRepository, CourseMapper, LessonMapper],
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/courses/courses.component').then(
            (c) => c.CoursesComponent
          ),
        children: [
          {
            path: '',
            providers: [ApiEnrollmentRepository],
            resolve: {
              coursesLoaded: coursesResolver,
              enrollmentsLoaded: enrollmentsResolver,
            },
            loadComponent: () =>
              import(
                './features/courses/components/course-list/course-list.component'
              ).then((c) => c.CourseListComponent),
          },
          {
            path: 'add-course',
            canActivate: [roleGuard],
            data: { role: Role.Instructor },
            loadComponent: () =>
              import(
                './features/courses/components/course-add/course-add.component'
              ).then((c) => c.CourseAddComponent),
          },
          {
            path: ':courseId',
            providers: [ApiProgressRespository, ApiLessonRepository],
            resolve: {
              courseLessonLoaded: courseLessonsResolver,
              progressLoaded: progressResolver,
            },
            loadComponent: () =>
              import(
                './features/courses/components/course-details/course-details.component'
              ).then((c) => c.CourseDetailsComponent),
          },
          {
            path: ':courseId/edit',
            canActivate: [roleGuard],
            data: { role: Role.Instructor },
            loadComponent: () =>
              import(
                './features/courses/components/course-edit/course-edit.component'
              ).then((c) => c.CourseEditComponent),
          },
          {
            path: ':courseId/add-lesson',
            canActivate: [roleGuard],
            data: { role: Role.Instructor },
            providers: [ApiLessonRepository],
            loadComponent: () =>
              import('./features/lessons/lesson-add/lesson-add.component').then(
                (c) => c.LessonAddComponent
              ),
          },
          {
            path: ':courseId/lessons/:lessonId',
            providers: [ApiLessonRepository, ApiProgressRespository],
            loadComponent: () =>
              import(
                './features/lessons/lesson-details/lesson-details.component'
              ).then((c) => c.LessonDetailsComponent),
          },
          {
            path: ':courseId/lessons/:lessonId/lesson-edit',
            canActivate: [roleGuard],
            data: { role: Role.Instructor },
            providers: [ApiLessonRepository],
            loadComponent: () =>
              import(
                './features/lessons/lesson-edit/lesson-edit.component'
              ).then((c) => c.LessonEditComponent),
          },
        ],
      },
      {
        path: 'users',
        canActivate: [authGuard],
        providers: [ApiUserRepository, UserMapper],
        loadComponent: () =>
          import('./features/users/users.component').then(
            (c) => c.UsersComponent
          ),
        children: [
          { path: '', redirectTo: ':userId/edit', pathMatch: 'full' },
          {
            path: ':userId/user-edit',
            loadComponent: () =>
              import('./features/users/user-edit/user-edit.component').then(
                (c) => c.UserEditComponent
              ),
          },
        ],
      },
    ],
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    providers: [ApiAuthRespository, AuthMapper],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        //What's the diff between lazy load to regular load(ask chatGpt)
        path: 'register',
        loadComponent: () =>
          import('./features/auth/components/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      {
        //What's the diff between lazy load to regular load(ask chatGpt)
        path: 'login',
        loadComponent: () =>
          import('./features/auth/components/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
    ],
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: NotFoundComponent },
];
