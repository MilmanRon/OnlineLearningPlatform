import { inject, Injectable } from '@angular/core';
import { ProgressRepository } from '../../core/domain/repositories/progress-repository.interface';
import { map, Observable, tap } from 'rxjs';
import { Progress } from '../../core/domain/Models/progress.model';
import { UserApiService } from '../api/user-api.service';
import { ProgressMapper } from '../mappers/progress.mapper';
import { ProgressApiService } from '../api/progress-api.service';
import { ProgressStore } from '../store/progress.store';

@Injectable()
export class ApiProgressRespository implements ProgressRepository {
  private userApiService = inject(UserApiService);
  private progressMapper = inject(ProgressMapper);
  private progressApiSerivce = inject(ProgressApiService);
  private progressStore = inject(ProgressStore);

  getAllbyUserId(id: string): Observable<Progress[]> {
    return this.userApiService.getUserProgress(id).pipe(
      map((progressDto) =>
        progressDto.map((progressDto) =>
          this.progressMapper.toDomain(progressDto)
        )
      ),
      tap((progress) => {
        this.progressStore.setProgress(progress);
      })
    );
  }

  add(userId: string, progress: Omit<Progress, 'id'>): Observable<Progress> {
    return this.userApiService.addProgress(userId, progress).pipe(
      map((progressDto) => this.progressMapper.toDomain(progressDto)),
      tap((progress) => {
        this.progressStore.addProgress(progress);
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.progressApiSerivce
      .deleteProgress(id)
      .pipe(tap(() => this.progressStore.deleteProgress(id)));
  }
}
