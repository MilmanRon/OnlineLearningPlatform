import { inject, Injectable } from '@angular/core';
import { AuthRepository } from '../../core/domain/repositories/auth-repository.interface';
import { map, Observable, tap } from 'rxjs';
import { AuthCredentials } from '../../core/domain/Models/auth/auth-credentials.model';
import { AuthResponse } from '../../core/domain/Models/auth/auth-response.model';
import { RegistrationData } from '../../core/domain/Models/auth/registration-data.model';
import { AuthApiService } from '../api/auth-api.service';
import { AuthMapper } from '../mappers/auth.mapper';
import { UserStore } from '../store/user.store';
import { User } from '../../core/domain/Models/user.model';

@Injectable()
export class ApiAuthRespository implements AuthRepository {
  private authApiService = inject(AuthApiService);
  private authMapper = inject(AuthMapper);
  private userStore = inject(UserStore);

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.authApiService.login(credentials).pipe(
      map((userDto) => this.authMapper.toDomain(userDto)),
      tap((authResponse) => {
        this.userStore.setUser(authResponse.user);
        this.userStore.setToken(authResponse.token);
        this.saveUserToLocalStorage(authResponse.user.id, authResponse.token);
      })
    );
  }

  register(userData: RegistrationData): Observable<AuthResponse> {
    return this.authApiService.register(userData).pipe(
      map((userDto) => this.authMapper.toDomain(userDto)),
      tap((authResponse) => {
        this.userStore.setUser(authResponse.user);
        this.userStore.setToken(authResponse.token);
        this.saveUserToLocalStorage(authResponse.user.id, authResponse.token);
      })
    );
  }

  logout() {
    this.userStore.clearUser();
    localStorage.removeItem('user');
  }

  saveUserToLocalStorage(userId: string, token: string) {
    localStorage.setItem(
      'user',
      JSON.stringify({ userId: userId, token: token })
    );
  }
}
