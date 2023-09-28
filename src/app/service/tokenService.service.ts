import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {
  private readonly ACCESS_TOKEN = "W73DLJ~5-V?E'v1"

  constructor(private cookieService: CookieService) { }

  getToken(): string {
    return this.cookieService.get(this.ACCESS_TOKEN);
  }

  setToken(token: string): void {
    this.cookieService.set(this.ACCESS_TOKEN, token);
  }

  removeToken(): void {
    this.cookieService.delete(this.ACCESS_TOKEN);
  }
}
