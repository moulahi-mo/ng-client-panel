import { Component, OnInit } from '@angular/core';
import { DbClientsService } from '../../services/db-clients.service';
import { Ui } from '../../models/models';
import { SettingsService } from '../../services/settings.service';
import { Settings, User } from '../../models/models';
import { AuthClientsService } from '../../services/auth-clients.service';
import { Router } from '@angular/router';
import { DbUsersService } from 'src/app/services/db-users.service';
import { ProfileService } from 'src/app/services/profile.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  register: boolean;
  isLogin: boolean;
  data: Settings;
  profile: User;
  constructor(
    private dbs: DbClientsService,
    private settings: SettingsService,
    private auth: AuthClientsService,
    private route: Router,
    private dbU: DbUsersService,
    private prof: ProfileService
  ) {}

  ngOnInit() {
    this.authVerif();
    Ui();
    // ! get register value from setting localstorage service
    this.data = this.settings.getLocalSet();
    this.register = this.data.registration;
    console.log(this.register);
  }
  public authVerif() {
    this.auth.MakeAuthstateObservable().subscribe((user) => {
      if (user) {
        this.dbU.getUser(user.uid).subscribe((doc) => {
          console.log(doc.id, doc.data().email, 'person here');
          this.profile = {
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            password: doc.data().password,
          };
          this.prof.setProfile(this.profile);
        });
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
}
