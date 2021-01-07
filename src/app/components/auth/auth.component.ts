import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  query: any;

  constructor(private acRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.query = this.acRoute.snapshot.queryParams;
    console.log(this.query);
  }
}
