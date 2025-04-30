import { inject, Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { Observable } from 'rxjs';
import { RegistrationData } from '../../core/domain/Models/auth/registration-data.model';
import { UserDto } from '../dtos/user.dto';
import { AuthCredentials } from '../../core/domain/Models/auth/auth-credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
    private path = 'auth';
    private apiClient = inject(ApiClientService);

    register(data: RegistrationData): Observable<UserDto> {
        return this.apiClient.post<UserDto>(`${this.path}/register`, data);
    }

    login(credentials: AuthCredentials): Observable<UserDto> { 
        return this.apiClient.post<UserDto>(`${this.path}/login`, credentials);
    }
    
}
