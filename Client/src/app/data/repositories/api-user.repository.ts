import { inject, Injectable } from '@angular/core';
import { UserRepository } from '../../core/domain/repositories/user-repository.interface';
import { map, Observable, tap } from 'rxjs';
import { User } from '../../core/domain/Models/user.model';
import { UserApiService } from '../api/user-api.service';
import { UserStore } from '../store/user.store';
import { UserMapper } from '../mappers/user.mapper';
import { UserEditComponent } from '../../features/users/user-edit/user-edit.component';

@Injectable({ providedIn: 'root' })
export class ApiUserRepository implements UserRepository {
  private userApiService = inject(UserApiService);
  private userStore = inject(UserStore);
  private userMapper = inject(UserMapper);

  get(userId: string): Observable<User> {
    return this.userApiService.getUserById(userId).pipe(
      map((userDto) => this.userMapper.toDomain(userDto)),
      tap((user) => this.userStore.setUser(user))
    );
  }

  update(userId: string, user: Partial<User>): Observable<User> {
    return this.userApiService.updateUser(userId, user).pipe(
      map((userDto) => this.userMapper.toDomain(userDto)),
      tap((user) => this.userStore.updateUser(user))
    );
  }

  delete(userId: string): Observable<void> {
    return this.userApiService.deleteUser(userId).pipe(
      tap(() => {
        this.userStore.clearUser();
      })
    );
  }
}
