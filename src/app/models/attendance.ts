import { User } from "../authentication/models/user";

export class Attendance {
    Id: number;
    dateCreation: Date;
    attendanceDate: Date; 
    attendanceStatus: number;
    attendanceGrade: number;
    companyName: number;
    user: User;       
}