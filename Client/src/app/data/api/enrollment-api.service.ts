import { inject, Injectable } from "@angular/core";
import { ApiClientService } from "./api-client.service";
import { EnrollmentMapper } from "../mappers/enrollment.mapper";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EnrollmentApiService {
    private path = 'enrollment'
    apiClient = inject(ApiClientService);
    enrollmentMapper = inject(EnrollmentMapper);

    deleteEnrollment(id: string): Observable<void>{
        return this.apiClient.delete<void>(`${this.path}/${id}`);
    }
}