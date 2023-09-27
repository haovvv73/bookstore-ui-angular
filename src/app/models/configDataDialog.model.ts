import { Book } from "./book.model";

export interface ConfigDialog{
    reRender: boolean,
    data: Book | null
}