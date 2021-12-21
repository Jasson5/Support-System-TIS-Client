import { Semester } from "./semester";

export class Offer {
    id: number;
    dateCreation: Date;
    dateEnd: Date;
    description: string;
    documentOfferUrl: string;
    minUsers: number;
    maxUsers: number;   
    semester: Semester; 
}