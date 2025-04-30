import { Injectable, signal } from '@angular/core';
import { Progress } from '../../core/domain/Models/progress.model';

@Injectable({ providedIn: 'root' })
export class ProgressStore {
  private progressSignal = signal<Progress[] | null>(null);

  readonly progress = this.progressSignal.asReadonly();

  setProgress(progress: Progress[]): void {
    console.log('progress store', progress);
    this.progressSignal.set(progress);
  }

  addProgress(newProgress: Progress): void {
    this.progressSignal.update((progress) => {
      if (!progress) return [newProgress];

      return [...progress, newProgress];
    });
  }

  deleteProgress(progressId: string): void {
    this.progressSignal.update((progress) => {
      if (!progress) return null;

      return progress.filter((progress) => progress.id !== progressId);
    });
  }

  clear(){
    this.progressSignal.set(null);
  }
}
