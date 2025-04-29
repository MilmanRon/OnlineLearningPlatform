import { signal } from "@angular/core";

export class BaseAlert {
    isVisible = signal<boolean>(true);
    
    closeAlert() {
        this.isVisible.set(false);
      }
}