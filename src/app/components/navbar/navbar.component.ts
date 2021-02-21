import { Component, OnDestroy, OnInit } from '@angular/core';
import { DbClientsService } from '../../services/db-clients.service';
import { Ui } from '../../models/models';
import { SettingsService } from '../../services/settings.service';
import { Settings, User } from '../../models/models';
import { AuthClientsService } from '../../services/auth-clients.service';
import { Router } from '@angular/router';
import { DbUsersService } from 'src/app/services/db-users.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  register: boolean;
  isLogin: boolean;
  data: Settings;
  profile: User;
  unsb: Subscription;
  constructor(
    private dbs: DbClientsService,
    private settings: SettingsService,
    private auth: AuthClientsService,
    private route: Router,
    private dbU: DbUsersService,
    private prof: ProfileService
  ) {}

  ngOnInit() {
    this.isLogin = this.auth.authState();
    this.auth.autoAuth();
    this.authVerif();
    Ui();
    // ! get register value from setting localstorage service
    this.data = this.settings.getLocalSet();
    this.register = this.data.registration;
    console.log(this.register);
  }
  public authVerif() {
    this.unsb = this.auth.isAuthListener.subscribe((user) => {
      if (user.auth) {
        this.isLogin = user.auth;
        this.dbU.getUser(user.uid).subscribe((doc) => {
          console.log(doc.id, doc.email, 'person here');
          console.log(user, 'user is logged in');
          this.profile = {
            id: doc._id,
            name: doc.name,
            email: doc.email,
            password: doc.password,
          };
          this.prof.setProfile(this.profile);
        });
      } else {
        console.log(user, 'user is loggoud out');
        this.isLogin = user.auth;
      }
    });
  }
  public logout() {
    this.auth.logout();
    this.prof.removeProfile();
    this.isLogin = false;
    console.log('user is logout');
    this.route.navigate(['/']);
  }
  public initClients() {
    this.dbs.getClients().subscribe((data) => {
      console.log(data);
    });
  }

  ngOnDestroy() {
    this.unsb.unsubscribe();
  }
}
