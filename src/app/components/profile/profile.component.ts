import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/models';
import { AuthClientsService } from 'src/app/services/auth-clients.service';
import { ProfileService } from 'src/app/services/profile.service';

import { DbUsersService } from '../../services/db-users.service';
let m: User;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: User;
  id: string = null;
  listUser: User[];
  constructor(
    private auth: AuthClientsService,
    private dbU: DbUsersService,
    private prof: ProfileService
  ) {}

  ngOnInit() {
    //! method 1 using local storage
    this.profile = this.prof.getProfile();

    //! method passing by data base getting the infos user after loggin
    // this.auth.MakeAuthstateObservable().subscribe((user) => {
    //   this.listUser = [];
    //   console.log('user logged in ', user.uid);
    //   // if (user.uid) {
    //   this.id = user.uid;
    //   if (this.id) {
    //     this.dbU.getUser(this.id).subscribe(function (doc) {
    //       m = {
    //         id: doc.id,
    //         name: doc.data().name,
    //         email: doc.data().email,
    //         password: doc.data().password,
    //       };

    //       this.listUser?.push(this.profile);
    //       // console.trace('last', this.profile, this.listUser);
    //     });
    //   }
    // });
    // if (m != null || m != undefined) {
    //   console.log(m);
    //   this.profile = m;
    // }

    // // } else {
    // this.profile = {
    //   id: null,
    //   name: null,
    //   email: null,
    //   password: null,
    // };
    // // }
  }
}
