import { Component, inject } from '@angular/core';
import {AbstractControl,  FormBuilder,  FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { trigger, transition, useAnimation } from '@angular/animations';
import {  fadeInLeft, fadeInRight } from 'ng-animate';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: [
    trigger('fadeInLeft', [transition('* => *', useAnimation(fadeInLeft))]),
    trigger('fadeInRight', [transition('* => *', useAnimation(fadeInRight))]),
  ],
})
export class RegisterComponent {
  fadeInLeft: any;
  fadeInRight:any;
  message:string="";
  messageErr:string="";

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)
  private readonly formBuilder = inject(FormBuilder)


  registerForm:FormGroup = this.formBuilder.group({
    name: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      email: [null,[Validators.required,Validators.email]],
      password: [null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]],
      rePassword: [null],
      phone: [null,[Validators.required,Validators.pattern(/^01[0-2,5]\d{8}$/)]]
  },{validators:this.confirmPassword})



  submitRegisterForm():void{
      if(this.registerForm.valid){
        this.authService.signUp(this.registerForm.value).subscribe({
          next:(res)=>{
            this.message = res.message;
            if(res.message === "success"){
              setTimeout(() => {
                this.router.navigate(['/login'])
              }, 750);
            }
          },
          error:(err:HttpErrorResponse) =>{
              this.messageErr = err.error.message;
          },
        })
      }
      else{
        this.registerForm.markAllAsTouched();
      }
  }

  confirmPassword(group:AbstractControl){
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : {mismatch:true};
  }
}
  