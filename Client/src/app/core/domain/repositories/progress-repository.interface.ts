import { Observable } from 'rxjs';
import { Progress } from '../Models/progress.model';

export interface ProgressRepository {
  getAllbyUserId(id: string): Observable<Progress[]>;
  add(userId: string, progress: Omit<Progress, 'id'>): Observable<Progress>;
  delete(id: string): Observable<void>;
}
