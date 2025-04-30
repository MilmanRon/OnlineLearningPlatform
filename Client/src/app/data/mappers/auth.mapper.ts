import { Injectable } from "@angular/core";
import { UserDto } from "../dtos/user.dto";
import { AuthResponse } from "../../core/domain/Models/auth/auth-response.model";

@Injectable()
export class AuthMapper {
    toDomain(dto: UserDto): AuthResponse {
        return {
            user: {
                id: dto.id,
                name: dto.name,
                email: dto.email,
                role: dto.role
            },
            token: dto.token
        }
    }
}