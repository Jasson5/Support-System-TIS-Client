import { User } from "../authentication/models/user";
import { Semester } from "./Semester";

export class Company {
    companyId: number;
    shortName: string;
    longName: string;
    society: string;
    address: string;
    telephone: number;
    companyEmail: string; 
    cmpanyStatus: number; 
    semester: Semester;
    members: User[];   
}