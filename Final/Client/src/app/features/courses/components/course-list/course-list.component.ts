import { Component, inject, OnInit } from '@angular/core';
import { CourseCardComponent } from '../course-card/course-card.component';
import { CourseStore } from '../../../../data/store/course.store';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserStore } from '../../../../data/store/user.store';
import { Role } from '../../../../core/domain/Models/user.model';

@Component({
  selector: 'app-course-list',
  imports: [CourseCardComponent, RouterLink],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent implements OnInit {
  courseStore = inject(CourseStore);
  userStore = inject(UserStore);

  route = inject(ActivatedRoute);
  router = inject(Router);

  Role = Role;

  ngOnInit(): void {
    console.log(this.route);

    const coursesLoaded = this.route.snapshot.data['coursesLoaded'];
    const enrollmentsLoaded = this.route.snapshot.data['enrollmentsLoaded'];

    if (!coursesLoaded || !enrollmentsLoaded) {
      console.log('Resolvers failed, redirecting from component');
      this.router.navigate(['/dashboard'], {
        state: {
          errorMessage: 'API Error, please try again.',
        },
      });
    }
  }

}
