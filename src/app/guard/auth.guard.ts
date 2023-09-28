import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core';
import { TokenServiceService } from '../service/tokenService.service';
import { UserDaoService } from '../service/user-dao.service';

export const authGuard: CanActivateFn = (route, state) => {

  const path = route.url[0].path
  // inject 
  const router = inject(Router)
  const tokenService = inject(TokenServiceService)
  const userDao = inject(UserDaoService)

  // check path 
  if( !(path === 'dashboard') ) return false


  return true;
};
