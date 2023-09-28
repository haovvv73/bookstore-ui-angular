import { Component, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { TokenServiceService } from 'src/app/service/tokenService.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  authServiceSubcription : Subscription | undefined

  constructor(private authService : AuthService,private tokenService : TokenServiceService){}

  onSubmit(value : User){
    console.log(value);
    
    this.authServiceSubcription = this.authService.register(value).subscribe( result =>{
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
