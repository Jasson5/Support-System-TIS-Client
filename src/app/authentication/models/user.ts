import { Company } from "./company";
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