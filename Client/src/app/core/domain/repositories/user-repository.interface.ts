import { Observable } from 'rxjs';
import { User } from '../Models/user.model';

export interface UserRepository {
  update(id: string, user: Partial<User>): Observable<User>;
  delete(id: string): Observable<void>;
}
