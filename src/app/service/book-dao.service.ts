import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespronseObject } from '../models/responseObject.model';
import { Book } from '../models/book.model';
import { TokenServiceService } from './tokenService.service';

@Injectable({
  providedIn: 'root'
})
export class BookDAOService {
  private url: string = 'http://localhost:4040/api/books/'

  constructor(private http: HttpClient,private tokenService : TokenServiceService) { }

  private getHeadersWithToken(): HttpHeaders {
    const accessToken = this.tokenService.getToken()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    })

    return headers
  }

  getBooks(): Observable<RespronseObject> {
    const headers = this.getHeadersWithToken();
    return this.http.get<RespronseObject>(this.url,{headers : headers})
  }

  deleteBook(id: number): Observable<RespronseObject> {
    const headers = this.getHeadersWithToken();
    return this.http.delete<RespronseObject>(this.url + `delete/${id}`,{headers : headers})
  }

  createBook(book: Book): Observable<RespronseObject> {
    const headers = this.getHeadersWithToken();
    return this.http.post<RespronseObject>(this.url + `create`, book,{headers : headers})
  }

  getBookById(id: number):Observable<RespronseObject> {
    const headers = this.getHeadersWithToken();
    return this.http.get<RespronseObject>(this.url +`book/${id}`,{headers : headers})
  }

  updateBook(book : Book):Observable<RespronseObject>{
    const headers = this.getHeadersWithToken();
    return this.http.put<RespronseObject>(this.url + `update`, book,{headers : headers})
  }
}
