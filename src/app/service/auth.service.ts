import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseToken } from '../models/responseToken.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(user : User):Observable<ResponseToken>{
    return this.http.post<ResponseToken>(environment.apiUrl + 'auth/login',user)
  }

  register(user : User):Observable<ResponseToken>{
    return this.http.post<ResponseToken>(environment.apiUrl + 'auth/register',user)
  }

  checkToken(token : any):Observable<boolean>{
    return this.http.post<boolean>(environment.apiUrl + 'auth/check-token',{authToken:token})
  }

}
