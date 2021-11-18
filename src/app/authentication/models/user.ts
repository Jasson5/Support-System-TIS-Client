
import { Company } from "src/app/models/company";
import { Role } from "./role";

export class User {
    userId: number;
    name: '';
    lastName: '';
    email: '';
    password:'';
    roles: Role[];
    company: Company;
}