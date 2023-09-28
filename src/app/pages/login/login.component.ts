import { Component, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { TokenServiceService } from 'src/app/service/tokenService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  authServiceSubcription : Subscription | undefined

  constructor(private authService : AuthService,private tokenService : TokenServiceService){}


  onSubmit(value : User){
    this.authServiceSubcription = this.authService.login(value).subscribe( result =>{
      // log
      //console.log(result);
      //save token
      if(result.token){
        this.tokenService.setToken(result.token)
      }
    })
  }

  ngOnDestroy(): void {
    if(this.authServiceSubcription){
      this.authServiceSubcription.unsubscribe()
    }
  }
}
