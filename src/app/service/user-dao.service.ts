import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { TokenServiceService } from './tokenService.service';

@Injectable({
  providedIn: 'root'
})
export class UserDaoService {
  private url: string = 'http://localhost:4040/api/user/'
  constructor(private http : HttpClient,private tokenService : TokenServiceService) { }

  private getHeadersWithToken(): HttpHeaders {
    const accessToken = this.tokenService.getToken()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    })

    return headers
  }

  getUserInfo():Observable<Array<User>>{
    const headers = this.getHeadersWithToken()
    return this.http.get<Array<User>>(this.url,{headers : headers})
  }

}
