import { Semester } from "./semester";

export class Offer {
    Id: number;
    dateEnd: Date;
    description: string;
    documentOfferUrl: string;
    minUsers: number;
    maxUsers: number;   
    semester: Semester; 
}