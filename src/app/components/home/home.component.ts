import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthClientsService } from 'src/app/services/auth-clients.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isAuth: boolean = false;
  constructor(private auth: AuthClientsService, private route: Router) {}
  unsb: Subscription;

  ngOnInit(): void {
    this.unsb = this.auth.isAuthListener.subscribe((user) => {
      if (user.auth) {
        this.isAuth = true;

        this.route.navigate(['/dashboard']);
      } else {
        this.isAuth = false;
      }
    });
  }
  ngOnDestroy() {
    this.unsb.unsubscribe();
  }
}
