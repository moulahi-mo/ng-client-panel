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
  constructor(private http: HttpClient) {}

  public getToken() {
    return this.token;
  }
  public signUp(user: User): Observable<any> {
    // return from(auth.createUserWithEmailAndPassword(email, pass));
    return this.http
      .post<User>(environment.apiUrl + 'auth/signup', user)
      .pipe(catchError(this.hundleErrors));
  }
  public login(email: string, password: string): Observable<any> {
    // return from(auth.signInWithEmailAndPassword(email, pass))
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
            this.isAuthListener.next({ auth: true, uid: data.userInfos._id });
          }
        }),
        catchError(this.hundleErrors)
      );
  }
  public logout() {
    this.token = null;
    this.isAuthListener.next({ auth: false, uid: null });
    this.isAuth = false;
    // return auth.signOut();
  }
  public authState() {
    // return auth.onAuthStateChanged();
    return this.isAuth;
  }

  //! auth tracking state changed
  MakeAuthstateObservable(): Observable<any> {
    const authState = Observable.create((observer: Observer<any>) => {
      auth.onAuthStateChanged(
        (user) => observer.next(user),
        (error) => observer.error(error),
        () => observer.complete()
      );
    });
    return authState;
  }
  //! hundle errors
  private hundleErrors(error: HttpErrorResponse) {
    if (error) {
      return throwError(error.message);
    }
  }
}
