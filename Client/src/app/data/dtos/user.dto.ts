import { Role } from "../../core/domain/Models/user.model";

export interface UserDto {
    id: string;
    name: string;
    email: string;
    role: Role;
    token: string;
}