import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiErrorService {

  getErrorDetails(error: any): string {
    if (error.status === 500 || error.status === 0)
      return 'An error occurred please try again later';

    return error.error.detail;
  }
}
