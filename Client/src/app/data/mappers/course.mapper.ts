import { inject, Injectable } from '@angular/core';
import { CourseDto } from '../dtos/course.dto';
import { Course } from '../../core/domain/Models/course.model';
import { LessonMapper } from './lesson.mapper';

@Injectable()
export class CourseMapper {
  lessonMapper = inject(LessonMapper);

  toDomain(dto: CourseDto): Course {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      createdAt: new Date(dto.createdAt),
      lessons: dto.lessons.map((lessonDto) =>
        this.lessonMapper.toDomain(lessonDto)
      ),
      isEnrolled: false
    };
  }

  toDto(model: Course): Omit<CourseDto, 'id' | 'createdAt' | 'lessons'> {
    return {
      title: model.title,
      description: model.description,
    };
  }
}
