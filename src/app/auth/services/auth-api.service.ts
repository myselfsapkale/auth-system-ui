import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { VoidResult204, SignInResponse, SignInUser, SignUpUser, VerifyForgetPasswordOtp } from '../interfaces/auth-interface';
import { CommonHelperService } from '../../common/services/common-helper.service';


@Injectable({
  providedIn: 'root'
})


export class AuthApiService {
  _http: HttpClient = inject(HttpClient);
  _commonHelper: CommonHelperService = inject(CommonHelperService);

  constructor() { }


  // For log in user
  signIn(SignInUser: SignInUser): Observable<SignInResponse> {
    let url = `${environment.apiUrl}/${environment.apiVersion}/sign_in`,
        headers = { 'nonce': this._commonHelper.generateCorrelationId() };
    return this._http.post<SignInResponse>(url, SignInUser, { headers });
  }


  // For sending otp to email
  forgetPassword(user_email: string): Observable<VoidResult204> {
    let url = `${environment.apiUrl}/${environment.apiVersion}/forget_password`,
        params = new HttpParams().set('user_email', user_email),
        headers = { 'nonce': this._commonHelper.generateCorrelationId() };
    return this._http.get<VoidResult204>(url, { params, headers });
  }


  // For verifing otp
  verifyForgetPasswordOtp(user_email: string, otp: string): Observable<VerifyForgetPasswordOtp> {
    let url = `${environment.apiUrl}/${environment.apiVersion}/verify_forget_password_otp`,
        params = new HttpParams().set('user_email', user_email).set('otp', otp),
        headers = { 'nonce': this._commonHelper.generateCorrelationId() };
    return this._http.get<VerifyForgetPasswordOtp>(url, { params, headers });
  }


  // For changing password with secret
  changePasswordWithSecret(obj: { user_email: string, new_password: string, forgot_pass_secret: string }): Observable<VoidResult204> {
    let url = `${environment.apiUrl}/${environment.apiVersion}/change_password_with_secret`,
        headers = { 'nonce': this._commonHelper.generateCorrelationId() };
    return this._http.post<VoidResult204>(url, obj, { headers });
  }


  // For register user
  register(register: SignUpUser): Observable<SignInResponse> {
    let url = `${environment.apiUrl}/${environment.apiVersion}/register`,
        headers = { 'nonce': this._commonHelper.generateCorrelationId() };
    return this._http.post<SignInResponse>(url, register, { headers });
  }


  // For signing out from currnet device
  signOut(obj: { refresh_token: string, access_token: string }): Observable<VoidResult204> {
    let url = `${environment.apiUrl}/${environment.apiVersion}/sign_out`,
        headers = { 'nonce': this._commonHelper.generateCorrelationId() };
    return this._http.post<VoidResult204>(url, obj, { headers });
  }
  

  // For signing out from all the device
  signOutAll(obj: { refresh_token: string, access_token: string }): Observable<VoidResult204> {
    let url = `${environment.apiUrl}/${environment.apiVersion}/sign_out_all`,
        headers = { 'nonce': this._commonHelper.generateCorrelationId() };
    return this._http.post<VoidResult204>(url, obj, { headers });
  }
  

}
