import { inject, Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { Observable } from 'rxjs';
import { Enrollment } from '../../core/domain/Models/enrollment.model';
import { Progress } from '../../core/domain/Models/progress.model';
import { EnrollmentDto } from '../dtos/enrollment.dto';
import { UserDto } from '../dtos/user.dto';
import { ProgressDto } from '../dtos/progress.dto';
import { EnrollmentMapper } from '../mappers/enrollment.mapper';
import { ProgressMapper } from '../mappers/progress.mapper';
import { User } from '../../core/domain/Models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private path = 'users';
  apiClient = inject(ApiClientService);
  enrollmentMapper = inject(EnrollmentMapper);
  progressMapper = inject(ProgressMapper);

  getUserById(id: string): Observable<UserDto> {
    return this.apiClient.get<UserDto>(`${this.path}/${id}`);
  }

  updateUser(userId: string, user: Partial<User>): Observable<UserDto> {
    return this.apiClient.put<UserDto>(`${this.path}/${userId}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.apiClient.delete<void>(`${this.path}/${id}`);
  }

  getUserEnrollments(id: string): Observable<EnrollmentDto[]> {
    return this.apiClient.get<EnrollmentDto[]>(
      `${this.path}/${id}/enrollments`
    );
  }

  getUserProgress(id: string): Observable<ProgressDto[]> {
    return this.apiClient.get<ProgressDto[]>(`${this.path}/${id}/progress`);
  }

  enrollUser(
    id: string,
    enrollment: Omit<Enrollment, 'id'>
  ): Observable<EnrollmentDto> {
    return this.apiClient.post<EnrollmentDto>(
      `${this.path}/${id}/enrollments`,
      this.enrollmentMapper.toDto(enrollment)
    );
  }

  addProgress(
    id: string,
    progress: Omit<Progress, 'id'>
  ): Observable<ProgressDto> {
    return this.apiClient.post<ProgressDto>(
      `${this.path}/${id}/progress`,
      this.progressMapper.toDto(progress)
    );
  }
}
