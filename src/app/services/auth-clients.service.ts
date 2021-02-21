import { Injectable } from '@angular/core';
import { auth, User } from '../models/models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Observable,
  from,
  throwError,
  Observer,
  BehaviorSubject,
  of,
} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { importType } from '@angular/compiler/src/output/output_ast';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthClientsService {
  isAuthListener = new BehaviorSubject<{ auth: boolean; uid: string }>({
    auth: false,
    uid: null,
  });
  isAuth: boolean = false;
  token: string = null;
  uid: string = null;
  clearTime: any;
  constructor(private http: HttpClient) {}

  public getUid() {
    return this.uid;
  }
  public authState() {
    return this.isAuth;
  }
  public getToken() {
    return this.token;
  }
  public signUp(user: User): Observable<any> {
    return this.http
      .post<User>(environment.apiUrl + 'auth/signup', user)
      .pipe(catchError(this.hundleErrors));
  }
  public login(email: string, password: string): Observable<any> {
    return this.http
      .post<{ email: string; password: string }>(
        environment.apiUrl + 'auth/login',
        { email, password }
      )
      .pipe(
        tap((data: any) => {
          this.token = data.token;

          if (data.token) {
            this.isAuth = true;
            this.uid = data.userInfos._id;
            this.isAuthListener.next({ auth: true, uid: data.userInfos._id });
            //! perssiste token
            const now = new Date();
            const duration = new Date(now.getTime() + data.expires * 1000);
            this.setLocalStorage(this.token, duration, this.uid);
            this.timeOut(duration);
          }
        }),
        catchError(this.hundleErrors)
      );
  }
  public logout() {
    this.token = null;
    this.isAuthListener.next({ auth: false, uid: null });
    this.isAuth = false;
    this.uid = null;
    this.clearLocalStorage();
    clearTimeout(this.clearTime);
  }

  //! clear local storage
  public clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    localStorage.removeItem('uid');
  }

  //! set local storage
  public setLocalStorage(token: string, expires: Date, uid: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expires', expires.toString());
    localStorage.setItem('uid', uid);
  }

  //! get local storage
  public getLocalStorage() {
    const token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : null;
    const expires = localStorage.getItem('expires')
      ? localStorage.getItem('expires')
      : null;
    const uid = localStorage.getItem('uid')
      ? localStorage.getItem('uid')
      : null;

    if (token && expires && uid) {
      return {
        token,
        expires,
        uid,
      };
    } else {
      return;
    }
  }

  public timeOut(dur: Date) {
    this.clearTime = setTimeout(() => {
      this.logout;
    }, dur.getTime() * 1000);
  }

  public autoAuth() {
    const authState = this.getLocalStorage();
    console.log(authState);
    if (authState.token) {
      const now = new Date();
      const diffDur = new Date(authState.expires).getTime() - now.getTime();
      console.log(diffDur, 'difference');
      if (diffDur > 0) {
        this.token = authState.token;
        this.isAuthListener.next({ auth: true, uid: this.uid });
        this.isAuth = true;
        this.timeOut(new Date(diffDur / 1000));
      }
    } else {
      return;
    }
  }

  //! hundle errors
  private hundleErrors(error: HttpErrorResponse) {
    if (error) {
      return throwError(error.message);
    }
  }
}
