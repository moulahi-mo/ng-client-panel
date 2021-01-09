import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/models';
import { AuthClientsService } from 'src/app/services/auth-clients.service';

import { DbUsersService } from '../../services/db-users.service';
var list;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: User;

  listUser: User[] = [];
  constructor(private auth: AuthClientsService, private dbU: DbUsersService) {}

  ngOnInit() {
    this.profile = {
      id: null,
      name: null,
      email: null,
      password: null,
    };

    this.auth.MakeAuthstateObservable().subscribe((user) => {
      console.log('user logged in ', user.uid);
      if (user.uid) {
        this.dbU.getUser(user.uid).subscribe(function (doc) {
          this.profile = {
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            password: doc.data().password,
          };

          console.log('last', this.profile);
        });
      }
    });
  }
}
