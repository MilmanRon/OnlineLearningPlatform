import { Injectable } from '@angular/core';
import { ProgressDto } from '../dtos/progress.dto';
import { Progress } from '../../core/domain/Models/progress.model';

@Injectable(
    {providedIn: 'root'}
)
export class ProgressMapper {
  toDomain(dto: ProgressDto): Progress {
    return {
      id: dto.id,
      lessonId: dto.lessonId,
    };
  }

  toDto(model: Omit<Progress, 'id'>): Omit<ProgressDto,'watchedAt' | 'id'> {
    return {
        lessonId: model.lessonId
    }
  }
}
