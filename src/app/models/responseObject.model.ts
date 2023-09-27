import { Book } from "./book.model";

export interface RespronseObject{
    message: string,
    status : boolean,
    data? : Book[]
}