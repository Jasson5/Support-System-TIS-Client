
import { FinalGrade } from 'src/app/models/final-grade';
import { GradeAverage } from 'src/app/models/grade-average';
import { Semester } from '../../models/semester';
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
    role: string;
    semesters: Semester[];
    finalGrade: FinalGrade;
    gradeAverage: GradeAverage;
}