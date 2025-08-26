import { IUserData } from './../../../shared/interfaces/iuser-data';
;
import { jwtDecode } from 'jwt-decode';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  baseUrl:string = environment.baseUrl;
  userData:IUserData = {} as IUserData;
  private readonly router = inject(Router);

  signUp(data:object):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/api/v1/auth/signup', data)
  }

  signIn(data:object):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/api/v1/auth/signin', data)
  }

  saveUserData():void{
    if(localStorage.getItem('token') !== null){
      this.userData = jwtDecode(localStorage.getItem('token') !)
    }
  }

  logOut():void{
    localStorage.removeItem('token');
    this.userData = {} as IUserData;;
    this.router.navigate(['/login'])
  }

  setVerifyEmail(data:object):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/api/v1/auth/forgotPasswords',data)
  }
  setVerifyCode(data:object):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/api/v1/auth/verifyResetCode',data)
  }
  setNewPassword(data:object):Observable<any>{
    return this.httpClient.put(this.baseUrl+'/api/v1/auth/resetPassword',data)
  }

}
