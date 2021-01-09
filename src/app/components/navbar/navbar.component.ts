import { Component, OnInit } from '@angular/core';
import { DbClientsService } from '../../services/db-clients.service';
import { Ui } from '../../models/models';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/models';
import { AuthClientsService } from '../../services/auth-clients.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  register: boolean = false;
  isLogin: boolean;
  data: object;
  constructor(
    private dbs: DbClientsService,
    private settings: SettingsService,
    private auth: AuthClientsService,
    private route: Router
  ) {}

  ngOnInit() {
    this.authVerif();
    Ui();
    this.settings.getSettings().subscribe({
      next(data) {
        console.log(data);

        this.register = data.registration;
      },
    });
    console.log(this.data);
  }
  public authVerif() {
    this.auth.MakeAuthstateObservable().subscribe((user) => {
      if (user) {
        console.log(user, 'user is logged in');
        this.isLogin = true;
      } else {
        console.log(user, 'user is loggoud out');
        this.isLogin = false;
      }
    });
  }
  public logout() {
    this.auth.logout();
    this.isLogin = false;
    console.log('user is logout');
    this.route.navigate(['/']);
  }
  public initClients() {
    this.dbs.getClients().subscribe((data) => {
      console.log(data);
    });
  }
}
