
import { Company } from "src/app/models/company";
import { Role } from "./role";

export class User {
    user_id: number;
    username: string;
    last_name: string;
    first_name: string;
    email: string;
    password: string;
    roles: Role[];
    company: Company;
}