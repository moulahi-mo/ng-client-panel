import { ErrorHandler, Injectable, OnInit } from '@angular/core';
import { Client, db } from '../models/models';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DbClientsService {
  constructor(private http: HttpClient) {}

  // public getClientById(id: string): Observable<any> {
  //   return from(db.collection('clients').doc(id).get()).pipe(
  //     catchError(this.hundleErrors)
  //   );
  // }

  // public getClients(): Observable<{}> {
  //   return from(
  //     db
  //       .collection('clients')
  //       .orderBy('created', 'asc')
  //       .get()
  //       .then((snaps) => {
  //         return snaps;
  //       })
  //   ).pipe(catchError(this.hundleErrors));
  // }
  // public addClient(client: Client): Observable<any> {
  //   return from(db.collection('clients').add(client)).pipe(
  //     catchError(this.hundleErrors)
  //   );
  // }
  //! add client
  public addClient(client: Client): Observable<any> {
    return this.http
      .post<Client>(environment.apiUrl + 'clients', client)
      .pipe(catchError(this.hundleErrors));
  }
  //! get clients

  public getClients(): Observable<any> {
    return this.http.get<Client[]>(environment.apiUrl + 'clients').pipe(
      // map((data: any) => {
      //   return data.map((client) => {
      //     return { ...client, id: client._id };
      //   });
      // }),
      catchError(this.hundleErrors)
    );
  }
  // ! get by id
  public getClientById(id: string): Observable<any> {
    return this.http
      .get<Client>(environment.apiUrl + 'clients/' + id)
      .pipe(catchError(this.hundleErrors));
  }

  //! delete
  // public deleteClient(id: string): Observable<any> {
  //   return from(db.collection('clients').doc(id).delete()).pipe(
  //     catchError(this.hundleErrors)
  //   );
  // }

  public deleteClient(id: string): Observable<any> {
    return this.http
      .delete<any>(environment.apiUrl + 'clients/' + id)
      .pipe(catchError(this.hundleErrors));
  }

  // public updateClient(client: Client): Observable<any> {
  //   return from(db.collection('clients').doc(client.id).update(client)).pipe(
  //     catchError(this.hundleErrors)
  //   );
  // }
  //! update
  public updateClient(client: Client): Observable<any> {
    return this.http
      .put<Client>(environment.apiUrl + 'clients/' + client.id, client)
      .pipe(catchError(this.hundleErrors));
  }

  public updateBalance(id: string, balance: number): Observable<any> {
    return from(
      db.collection('clients').doc(id).update({ balance: balance })
    ).pipe(catchError(this.hundleErrors));
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
