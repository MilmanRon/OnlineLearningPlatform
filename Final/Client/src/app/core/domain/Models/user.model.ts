export enum Role{
    Instructor = 0,
    Student = 1,
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
}