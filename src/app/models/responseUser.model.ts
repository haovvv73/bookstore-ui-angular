import { User } from "./user.model";

export interface ResponseUser{
    message: string,
    status : boolean,
    data? : User[]
}