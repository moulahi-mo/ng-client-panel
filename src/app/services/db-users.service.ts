import { Injectable, OnInit } from '@angular/core';
import { db, User } from '../models/models';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DbUsersService implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit() {}
  public addUser(user: User): Observable<unknown> {
    // return from(
    //   db
    //     .collection('users')
    //     .doc(user.id)
    //     .set(user)
    return this.http
      .post<User>(environment.apiUrl + 'auth', user)
      .pipe(catchError(this.hundleErrors));
    // );
  }
  public getUser(id: string): Observable<any> {
    // return from(db.collection('users').doc(id).get());
    return this.http
      .get<User>(environment.apiUrl + `auth/${id}`)
      .pipe(catchError(this.hundleErrors));
  }
  public getUsers(): Observable<any> {
    // return from(db.collection('users').get());
    return this.http
      .get<User[]>(environment.apiUrl)
      .pipe(catchError(this.hundleErrors));
  }

  //! hundle errors
  private hundleErrors(error: HttpErrorResponse) {
    let message = 'Something bad happened; please try again later.!!';
    if (error.error instanceof ErrorEvent) {
      message = error.error.message;
    }
    return throwError(message);
  }
}
