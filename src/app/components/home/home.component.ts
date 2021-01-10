import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthClientsService } from 'src/app/services/auth-clients.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isAuth: boolean = false;
  constructor(private auth: AuthClientsService, private route: Router) {}

  ngOnInit(): void {
    this.auth.MakeAuthstateObservable().subscribe((user) => {
      if (user) {
        this.isAuth = true;

        this.route.navigate(['/dashboard']);
      } else {
        this.isAuth = false;
      }
    });
  }
}
