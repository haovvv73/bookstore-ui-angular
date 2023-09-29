import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseToken } from '../models/responseToken.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'http://localhost:4040/api/auth/'
  constructor(private http: HttpClient) { }

  login(user : User):Observable<ResponseToken>{
    return this.http.post<ResponseToken>(this.url + 'login',user)
  }

  register(user : User):Observable<ResponseToken>{
    return this.http.post<ResponseToken>(this.url + 'register',user)
  }

  checkToken(token : any):Observable<boolean>{
    return this.http.post<boolean>(this.url + 'check-token',{authToken:token})
  }

}
