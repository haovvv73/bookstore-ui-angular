import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenServiceService } from 'src/app/service/tokenService.service';
import { UserDaoService } from 'src/app/service/user-dao.service';
import { Subscription } from 'rxjs';
import { ResponseUser } from 'src/app/models/responseUser.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userName: string = ''
  userDaoSubcription: Subscription | undefined

  constructor(
    private router: Router,
    private userDao: UserDaoService,
    private token: TokenServiceService
  ) { }



  ngOnInit(): void {
    this.userDaoSubcription = this.userDao.getUserInfo().subscribe({
      next: (result: ResponseUser) => {
        if (result.data && result.data.length > 0 && result.data[0].name) {
          this.userName = result.data[0].name
        }
      },
      error: (error: any) => {
        // console.log(error);
      }
    })
  }

  logout() {
    this.token.removeToken()
    this.router.navigate(['login'])
  }

  ngOnDestroy(): void {
    if (this.userDaoSubcription) {
      this.userDaoSubcription.unsubscribe()
    }
  }
}
