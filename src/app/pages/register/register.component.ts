import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { TokenServiceService } from 'src/app/service/tokenService.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgToastService} from 'ng-angular-popup';
import { ResponseToken } from 'src/app/models/responseToken.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy, OnInit {
  authServiceSubcription : Subscription | undefined
  registerForm!: FormGroup;

  constructor(
    private authService : AuthService,
    private tokenService : TokenServiceService,
    private router : Router,
    private toast: NgToastService
  ){}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email : new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',[Validators.required,Validators.minLength(6)]),
      phone : new FormControl('',[Validators.required,Validators.pattern('^[0-9]{9}$')]),
      name : new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")])
    })
  }

  get email(){
    return this.registerForm.get('email')
  }

  get password(){
    return this.registerForm.get('password')
  }

  get phone(){
    return this.registerForm.get('phone')
  }

  get name(){
    return this.registerForm.get('name')
  }

  private getForm() : User{
    return {
      email: this.registerForm.value.email,
      password : this.registerForm.value.password,
      phone : this.registerForm.value.phone,
      name : this.registerForm.value.name
    }
  }

  clearForm(){
    this.registerForm.get('email')?.setValue('')
    this.registerForm.get('password')?.setValue('')
    this.registerForm.get('phone')?.setValue('')
    this.registerForm.get('name')?.setValue('')
  }

  onSubmit(){
    if(!this.registerForm.invalid){
      this.authServiceSubcription = this.authService.register(this.getForm()).subscribe({
        next :(result : ResponseToken) =>{
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
          if(error.status == 409 && error.ok == false){
            this.toast.error({detail:"ERROR", summary:error.error.error, duration:5000})
            this.clearForm()
          }
          // console.warn(error);
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
