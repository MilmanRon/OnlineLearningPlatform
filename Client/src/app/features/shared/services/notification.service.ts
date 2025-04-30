import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    private errorSubject = new Subject<string>();
    private successSubject = new Subject<string>();

    public error$ = this.errorSubject.asObservable();
    public success$ = this.successSubject.asObservable();

    notifyError(errorMessage: string){
        this.errorSubject.next(errorMessage)
    }

    notifySuccess(successMessage: string){
        this.successSubject.next(successMessage)
    }
}
