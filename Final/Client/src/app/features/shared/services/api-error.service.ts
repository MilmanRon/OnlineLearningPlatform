import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiErrorService {
  //TODO: Create api error model
  private errorSubject = new Subject<any>();

  public error$ = this.errorSubject.asObservable();

  notifyError(error: any) {
    this.errorSubject.next(error);
  }

  getErrorDetails(error: any): string {
    if (error.status === 500 || error.status === 0)
      return 'An error occurred please try again later';

    return error.error.detail;
  }
}
