import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core';
import { TokenServiceService } from '../service/tokenService.service';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const path = route.url[0].path
  // inject 
  const router = inject(Router)
  const tokenService = inject(TokenServiceService)
  const authService = inject(AuthService)

  // check path 
  if( !(path === 'dashboard') ){
    router.navigate(['login'])
    return false
  }

  // check token in local
  if( !tokenService.getToken() ){
    router.navigate(['login'])
    return false
  }

  // check token is expired
  const token = tokenService.getToken()
  authService.checkToken(token).subscribe({
    next: (result : boolean) =>{
      if(result){
        // valid token
        router.navigate(['dashboard']);
      }else{
        // expired token
        tokenService.removeToken()
        router.navigate(['login']);
      }
    },
    error :(error : any)=>{
      // console.error('Error validating token:', error);
      tokenService.removeToken()
      router.navigate(['login']);
    }
  })

  return true
};
