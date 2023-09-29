import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { TokenServiceService } from 'src/app/service/tokenService.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import {NgToastService} from 'ng-angular-popup';
import { ResponseToken } from 'src/app/models/responseToken.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy, OnInit {
  authServiceSubcription : Subscription | undefined
  loginForm!: FormGroup;

  constructor(
    private authService : AuthService,
    private tokenService : TokenServiceService,
    private router : Router,
    private toast: NgToastService
  ){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }
  
  private getForm() : User{
    return {
      email: this.loginForm.value.email,
      password : this.loginForm.value.password
    }
  }

  clearForm(){
    this.loginForm.get('email')?.setValue('')
    this.loginForm.get('password')?.setValue('')
  }

  get email(){
    return this.loginForm.get('email')
  }

  get password(){
    return this.loginForm.get('password')
  }

  onSubmit(){
    if(!this.loginForm.invalid){
      this.authServiceSubcription = this.authService.login(this.getForm()).subscribe({
        next : (result : ResponseToken) =>{
          // log
          // console.log(result);
          //save token
          if(result.token){
            this.toast.success({detail:"SUCCESS", summary:'Welcome to Fahasha', duration:3000})
            this.tokenService.setToken(result.token)
            this.router.navigate(['dashboard'])
          }
        },
        error:(error : any)=>{
          if(error.status == 401 && error.ok == false){
            this.toast.error({detail:"ERROR", summary:error.error.message, duration:5000})
            this.clearForm()
          }
          // console.log(error);
        }
      })
    }
  }

  ngOnDestroy(): void {
    if(this.authServiceSubcription){
      this.authServiceSubcription.unsubscribe()
    }
  }
}
