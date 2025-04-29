import { LessonDto } from "./lesson.dto";

export interface CourseDto {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    lessons: LessonDto[];
}