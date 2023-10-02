import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespronseObject } from '../models/responseObject.model';
import { Book } from '../models/book.model';
import { TokenServiceService } from './tokenService.service';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BookDAOService {

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
    return this.http.get<RespronseObject>(environment.apiUrl + 'books',{headers : headers})
  }

  deleteBook(id: number): Observable<RespronseObject> {
    const headers = this.getHeadersWithToken();
    return this.http.delete<RespronseObject>(environment.apiUrl + `books/${id}`,{headers : headers})
  }

  createBook(book: Book): Observable<RespronseObject> {
    const headers = this.getHeadersWithToken();
    return this.http.post<RespronseObject>(environment.apiUrl + `books`, book,{headers : headers})
  }

  getBookById(id: number):Observable<RespronseObject> {
    const headers = this.getHeadersWithToken();
    return this.http.get<RespronseObject>(environment.apiUrl +`books/${id}`,{headers : headers})
  }

  updateBook(book : Book):Observable<RespronseObject>{
    const headers = this.getHeadersWithToken();
    return this.http.put<RespronseObject>(environment.apiUrl + `books`, book,{headers : headers})
  }
}
