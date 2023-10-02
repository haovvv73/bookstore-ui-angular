import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { TokenServiceService } from './tokenService.service';
import { ResponseUser } from '../models/responseUser.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDaoService {
  constructor(private http : HttpClient,private tokenService : TokenServiceService) { }

  private getHeadersWithToken(): HttpHeaders {
    const accessToken = this.tokenService.getToken()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    })

    return headers
  }

  getUserInfo():Observable<ResponseUser>{
    const headers = this.getHeadersWithToken()
    return this.http.get<ResponseUser>(environment.apiUrl + 'user',{headers : headers})
  }

}
