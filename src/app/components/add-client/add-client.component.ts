import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbClientsService } from 'src/app/services/db-clients.service';
import { SettingsService } from '../../services/settings.service';
import { Client, Settings } from '../../models/models';

declare var firebase: any;
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {
  @ViewChild('f') form: any;
  client: Client;
  isError: string = null;
  isAdd: boolean = false;
  query: object;
  id: string;
  isEdited: boolean = false;
  balanceAdd: boolean = false;
  balanceEdit: boolean = false;
  dataLocalStorage: Settings;
  constructor(
    private dbC: DbClientsService,
    private route: ActivatedRoute,
    private nav: Router,
    private settings: SettingsService
  ) {}

  ngOnInit() {
    // this.settings.getSettings().subscribe({
    //   next(data) {
    //     this.balanceAdd = data.balanceAdd;
    //     this.balanceEdit = data.balanceEdit;
    //     console.log(this.balanceAdd, this.balanceEdit);
    //   },
    // });
    //! get params
    this.query = this.route.snapshot.queryParams;
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.query);
    this.client = {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      balance: null,
      created: new Date(),
    };

    //!get local storage normal way
    this.dataLocalStorage = this.settings.getLocalSet();
    this.balanceAdd = this.dataLocalStorage.balanceAdd;
    this.balanceEdit = this.dataLocalStorage.balanceEdit;
    console.log(this.balanceAdd, this.balanceEdit);
    //* if edit button clicked grap query + id and get the client
    if (this.query && this.id) {
      this.dbC.getClientById(this.id).subscribe(
        (doc) => {
          this.client = {
            id: doc._id,
            firstName: doc.firstName,
            lastName: doc.lastName,
            email: doc.email,
            phone: doc.phone,

            created: doc.createdAt,

            balance: !this.balanceEdit ? this.query.balance : 0,
            // created: firebase.firestore.Timestamp.fromDate(new Date()),
          };
        },
        (err) => (this.isError = err)
      );
    }
  }
  public onSubmit() {
    if (this.form.valid) {
      //! if edit page
      if (this.query.action == 'edit') {
        this.dbC.updateClient(this.client).subscribe(
          (data) => {
            console.log(data, 'client updated');
            this.isEdited = true;
            setTimeout(() => {
              this.isEdited = false;
              this.nav.navigate(['/client', this.client.id]);
            }, 3000);
            this.form.reset();
          },
          (err) => {
            this.isError = err;
            this.isEdited = false;
          }
        );
      }
      //! if add page
      else {
        this.client = {
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          email: this.form.value.email,
          phone: this.form.value.phone,
          balance: !this.balanceAdd ? this.form.value.balance : 0,
          created: firebase.firestore.Timestamp.fromDate(new Date()),
        };
        console.log(this.client);
        //* add to db client
        this.dbC.addClient(this.client).subscribe(
          (data) => {
            console.log(data, 'data added');
            this.isAdd = true;

            setTimeout(() => {
              this.isAdd = false;
            }, 3000);
            this.form.reset();
          },
          (err) => {
            this.isError = err;
            this.isEdited = false;
          }
        );
      }
    }
  }
}
