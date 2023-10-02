import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  constructor(private cookieService: CookieService) { }

  getToken(): string {
    return this.cookieService.get(environment.ACCESS_TOKEN);
  }

  setToken(token: string): void {
    this.cookieService.set(environment.ACCESS_TOKEN, token);
  }

  removeToken(): void {
    this.cookieService.delete(environment.ACCESS_TOKEN);
  }
}
