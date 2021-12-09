
import { Semester } from 'src/app/models/Semester';
import { Role } from './role'

export class User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    oldPassword: string;
    confirmPassword: string;
    givenName: string;
    isEnabled: Boolean;
    roles: Role[];
    semesters: Semester[];
}