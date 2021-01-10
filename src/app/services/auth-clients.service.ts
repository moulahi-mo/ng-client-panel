import { Injectable } from '@angular/core';
import { auth, User } from '../models/models';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, from, throwError, Observer } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { importType } from '@angular/compiler/src/output/output_ast';
@Injectable({
  providedIn: 'root',
})
export class AuthClientsService {
  constructor() {}

  public signUp(email: string, pass: string): Observable<any> {
    return from(auth.createUserWithEmailAndPassword(email, pass));
  }
  public login(email: string, pass: string): Observable<any> {
    return from(auth.signInWithEmailAndPassword(email, pass)).pipe(
      catchError(this.hundleErrors)
    );
  }
  public logout() {
    return auth.signOut();
  }
  public authState(): Observable<any> {
    return auth.onAuthStateChanged();
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
