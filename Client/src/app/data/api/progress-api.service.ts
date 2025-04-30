import { inject, Injectable } from "@angular/core";
import { ApiClientService } from "./api-client.service";
import { ProgressMapper } from "../mappers/progress.mapper";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProgressApiService {
    private path = 'progress'
    apiClient = inject(ApiClientService);

    deleteProgress(id: string): Observable<void>{
        return this.apiClient.delete<void>(`${this.path}/${id}`);
    }
}