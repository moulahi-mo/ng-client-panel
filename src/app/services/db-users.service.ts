import { Injectable, OnInit } from '@angular/core';
import { db } from '../models/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DbUsersService implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit() {}
}
