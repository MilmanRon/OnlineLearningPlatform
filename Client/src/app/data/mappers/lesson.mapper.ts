import { Injectable } from '@angular/core';
import { LessonDto } from '../dtos/lesson.dto';
import { Lesson } from '../../core/domain/Models/lesson.model';

@Injectable()
export class LessonMapper {
  toDomain(dto: LessonDto): Lesson {
    return {
      id: dto.id,
      courseId: dto.courseId,
      title: dto.title,
      videoUrl: dto.videoUrl,
      isCompleted: false
    };
  }

  toDto(model: Lesson): Omit<LessonDto, 'id'> {
    return {
      title: model.title,
      courseId: model.courseId,
      videoUrl: model.videoUrl,
    };
  }
}
