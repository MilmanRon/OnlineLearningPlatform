import { Observable } from "rxjs";
import { AuthCredentials } from "../Models/auth/auth-credentials.model";
import { AuthResponse } from "../Models/auth/auth-response.model";
import { RegistrationData } from "../Models/auth/registration-data.model";

export interface AuthRepository {
    login(credentials: AuthCredentials): Observable<AuthResponse>;
    register(userData: RegistrationData): Observable<AuthResponse>;
}
