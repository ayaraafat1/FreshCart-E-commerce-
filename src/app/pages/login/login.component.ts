import { Component, inject } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import {  fadeInLeft, fadeInRight } from 'ng-animate';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('fadeInLeft', [transition('* => *', useAnimation(fadeInLeft))]),
    trigger('fadeInRight', [transition('* => *', useAnimation(fadeInRight))]),
  ],

})
export class LoginComponent {
  fadeInLeft: any;
  fadeInRight:any;
  message: any;
  messageErr: any;

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly formBuilder = inject(FormBuilder)

  loginForm:FormGroup = this.formBuilder.group({
    email: [null,[Validators.required,Validators.email]],
    password: [null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]],
    })

    logInForm():void{
          if(this.loginForm.valid){
            this.authService.signIn(this.loginForm.value).subscribe({
              next:(res)=>{
                this.message = res.message;
                if(res.message === "success"){
                  // 1) save token
                  localStorage.setItem('token',res.token)
                  // 2) decode token
                  this.authService.saveUserData()

                  console.log(this.authService.userData);
                  setTimeout(() => {
                    this.router.navigate(['/home'])
                  }, 750);
                }
              },
              error:(err:HttpErrorResponse) =>{
                  this.messageErr = err.error.message;
              },
            })
          }
          else{
            this.loginForm.markAllAsTouched();
          }
      }
}
