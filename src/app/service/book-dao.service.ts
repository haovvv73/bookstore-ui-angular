import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespronseObject } from '../models/responseObject.model';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookDAOService {
  private url: string = 'http://localhost:4040/api/books/'

  constructor(private http: HttpClient) { }

  getBooks(): Observable<RespronseObject> {
    return this.http.get<RespronseObject>(this.url)
  }

  deleteBook(id: number): Observable<RespronseObject> {
    return this.http.delete<RespronseObject>(this.url + `delete/${id}`)
  }

  createBook(book: Book): Observable<RespronseObject> {
    return this.http.post<RespronseObject>(this.url + `create`, book)
  }

  getBookById(id: number):Observable<RespronseObject> {
    return this.http.get<RespronseObject>(this.url +`book/${id}`)
  }

  updateBook(book : Book):Observable<RespronseObject>{
    return this.http.put<RespronseObject>(this.url + `update`, book)
  }
}
