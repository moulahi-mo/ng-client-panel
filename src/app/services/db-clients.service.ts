import { ErrorHandler, Injectable, OnInit } from '@angular/core';
import { Client, db } from '../models/models';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DbClientsService implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit() {}

  public getClientById(id: string): Observable<any> {
    return from(db.collection('clients').doc(id).get());
  }

  public getClients(): Observable<{}> {
    return from(
      db
        .collection('clients')
        .orderBy('created', 'asc')
        .get()
        .then((snaps) => {
          return snaps;
        })
    ).pipe(catchError(this.hundleErrors));
  }
  public addClient(client: Client): Observable<any> {
    return from(db.collection('clients').add(client)).pipe(
      catchError(this.hundleErrors)
    );
  }
  public deleteClient(id: string): Observable<any> {
    return from(db.collection('clients').doc(id).delete()).pipe(
      catchError(this.hundleErrors)
    );
  }
  public updateClient(client: Client): Observable<any> {
    return from(db.collection('clients').doc(client.id).update(client)).pipe(
      catchError(this.hundleErrors)
    );
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
