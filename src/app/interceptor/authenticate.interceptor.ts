import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {NgToastService} from 'ng-angular-popup';

@Injectable()
export class AuthenticateInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toast : NgToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        
        // token is expired
        if (error.status === 403) {
          this.toast.error({detail:"Your workspace is expired", summary:'Please login angain', duration:5000})
          this.router.navigate(['login'])
        }

        // missing token
        if(error.status === 401 && error.error.message === "MISSING authentication token"){
          this.toast.error({detail:"Your workspace is expired", summary:'Please login angain', duration:5000})
          this.router.navigate(['login'])
        }

        return throwError(() => error);
      })
    );
  }
}
