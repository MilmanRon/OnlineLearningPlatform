import { Lesson } from "./lesson.model";

export interface Course {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
    createdAt: Date;
    
    isEnrolled: boolean;
}