import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/models';
import { AuthClientsService } from '../../services/auth-clients.service';
import { DbUsersService } from '../../services/db-users.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  query: any;
  user: User;
  users: User[] = [];
  isLogged: boolean = false;
  isError: string = null;

  constructor(
    private acRoute: ActivatedRoute,
    private auth: AuthClientsService,
    private dbU: DbUsersService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.user = {
      name: null,
      email: null,
      password: null,
      cpassword: null,
    };
    this.query = this.acRoute.snapshot.queryParams;
    console.log(this.query);
  }

  public onSubmit(form: HTMLFormElement) {
    console.log(form.value);
    // * IF SIGNUP **************************************
    if (this.query.action === 'register') {
      //! register to signup auth
      this.auth.signUp(form.value.email, form.value.password).subscribe(
        (cre) => {
          //!set the user with the new uid
          this.user = {
            id: cre.user.uid,
            name: form.value.name,
            email: form.value.email,
            password: form.value.password,
            cpassword: form.value.cpassword,
          };
          this.users.unshift(this.user);
          //! add user to db
          this.dbU.addUser(this.user).subscribe((data) => {
            console.log(data, 'user add to user db');
            //! after signup success auto redirect to dashbord
            this.route.navigate(['/dashboard']);
          });

          console.log(this.user);
          // ! changing states
          this.isLogged = true;
          this.isError = null;
        },
        (err) => (this.isError = err)
      );
    }
    // * IF LOGIN **************************************
    else if (this.query.action === 'login') {
      //! login auth
      this.auth.login(form.value.email, form.value.password).subscribe(
        (cre) => {
          console.log(cre.user.uid);
          //! get the user infos db ny uid after login
          if (cre.user.uid) {
            this.dbU.getUser(cre.user.uid).subscribe((doc) => {
              console.log(doc, doc?.id, 'user login');

              // this.user = {
              //   id: doc?.id,
              //   name: doc?.data().name,
              //   email: doc?.data().email,
              //   password: doc?.data().password,
              //   cpassword: doc?.data().cpassword,
              // };
              //! after signup success auto redirect to dashbord
              this.route.navigate(['/dashboard']);
              // ! changing states
              this.isLogged = true;
              this.isError = null;
            });
          }
        },
        (err) => (this.isError = err)
      );
    }
  }
}
