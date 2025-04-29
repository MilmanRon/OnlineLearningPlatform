import { Observable } from 'rxjs';
import { Enrollment } from '../Models/enrollment.model';
import { EnrollmentDto } from '../../../data/dtos/enrollment.dto';

export interface EnrollmentRepository {
  getAllEnrollmentsbyUserId(id: string): Observable<Enrollment[]>;

  add(userId: string, enrollment: Omit<Enrollment, 'id'>): Observable<Enrollment>;

  delete(id: string): Observable<void>;
}
