import { Injectable } from "@angular/core";
import { EnrollmentDto } from "../dtos/enrollment.dto";
import { Enrollment } from "../../core/domain/Models/enrollment.model";

@Injectable(
    {providedIn: 'root'}
)
export class EnrollmentMapper {
    toDomain(dto: EnrollmentDto): Enrollment {
        return {
            id: dto.id,
            courseId: dto.courseId
        }
    }

    toDto(model: Omit<Enrollment, 'id'>): Omit<EnrollmentDto, 'id' | 'enrolledAt'> {
        return {
            courseId: model.courseId
        }
    }
}