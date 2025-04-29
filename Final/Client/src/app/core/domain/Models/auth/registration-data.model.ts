import { Role } from "../user.model";

export interface RegistrationData {
    name: string;
    email: string;
    password: string;
    role: Role;
}