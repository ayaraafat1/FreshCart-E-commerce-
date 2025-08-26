import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  step:number = 1;
  message:any;
  
  private readonly authService = inject(AuthService);
  private readonly router = inject (Router)

  verifyEmail:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })

  verifyCode:FormGroup = new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6}$/)])
  })

  resetPassword:FormGroup = new FormGroup({
    email:new FormControl(null ,[Validators.required,Validators.email]),
    newPassword:new FormControl (null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)])
  })


  forgotPassword():void{
    this.authService.setVerifyEmail(this.verifyEmail.value).subscribe({
      next:(res)=>{
        if(res.statusMsg === 'success'){
            this.step = 2
            let emailAddress = this.verifyEmail.get("email")?.value
            this.resetPassword.get('email')?.patchValue(emailAddress)
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
  }
  verifyRestCode():void{
    this.authService.setVerifyCode(this.verifyCode.value).subscribe({
      next:(res)=>{
        if(res.status === 'Success'){
          this.step = 3
      }
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
  resetNewPassword():void{
    this.authService.setNewPassword(this.resetPassword.value).subscribe({
      next:(res)=>{

          localStorage.setItem('token',res.token)
          this.authService.saveUserData()
          this.router.navigate(['/home'])
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
}
