import { Semester } from "./semester";

export class Announcement {
    Id: number;
    dateCreation: Date;
    description: string;    
    documentUrl: string;   
    semester: Semester;  
}