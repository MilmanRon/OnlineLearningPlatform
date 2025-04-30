import { inject, Injectable } from '@angular/core';
import { EnrollmentRepository } from '../../core/domain/repositories/enrollment-repository.interface';
import { map, Observable, tap } from 'rxjs';
import { Enrollment } from '../../core/domain/Models/enrollment.model';
import { UserApiService } from '../api/user-api.service';
import { EnrollmentMapper } from '../mappers/enrollment.mapper';
import { EnrollmentStore } from '../store/enrollment.store';
import { EnrollmentApiService } from '../api/enrollment-api.service';
import { EnrollmentDto } from '../dtos/enrollment.dto';

@Injectable()
export class ApiEnrollmentRepository implements EnrollmentRepository {
  private userApiService = inject(UserApiService);
  private enrollmentApiService = inject(EnrollmentApiService);
  private enrollmentMapper = inject(EnrollmentMapper);
  private enrollmentStore = inject(EnrollmentStore);

  getAllEnrollmentsbyUserId(id: string): Observable<Enrollment[]> {
    return this.userApiService.getUserEnrollments(id).pipe(
      map((enrollmentsDto) =>
        enrollmentsDto.map((enrollmentDto) =>
          this.enrollmentMapper.toDomain(enrollmentDto)
        )
      ),
      tap((enrollments) => {
        // console.log(enrollments);
        this.enrollmentStore.setEnrollments(enrollments);
      })
    );
  }

  add(
    userId: string,
    enrollment: Omit<Enrollment, 'id'>
  ): Observable<Enrollment> {
    return this.userApiService.enrollUser(userId, enrollment).pipe(
      map((enrollmentDto) => this.enrollmentMapper.toDomain(enrollmentDto)),
      tap((enrollment) => this.enrollmentStore.addEnrollment(enrollment))
    );
  }

  delete(id: string): Observable<void> {
    return this.enrollmentApiService
      .deleteEnrollment(id)
      .pipe(tap(() => this.enrollmentStore.deleteEnrollment(id)));
  }
}
