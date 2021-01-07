import { Injectable, OnInit } from '@angular/core';
import { db } from '../models/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DbClientsService implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit() {}
  public getClients() {
    return db.collection('clients').onSnapshot();

    // return from(
    //   db
    //     .collection('clients')
    //     .get()
    //     .then((snaps) => {
    //       return snaps.docs;
    //     })
    // );
  }
}
