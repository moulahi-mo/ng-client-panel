import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Client } from 'src/app/models/models';
import { AuthClientsService } from 'src/app/services/auth-clients.service';
import { DbClientsService } from 'src/app/services/db-clients.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  client: Client;
  isDeleted: boolean = false;
  isError: string = null;
  isBalanced: boolean = false;
  isUpBalanced: boolean = false;
  uid: string = null;
  constructor(
    private dbC: DbClientsService,
    private route: ActivatedRoute,
    private nav: Router,
    private auth: AuthClientsService
  ) {}

  ngOnInit(): void {
    this.uid = this.auth.getUid();
    this.client = {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      balance: null,
      created: new Date(),
      creator: null,
    };
    // *get the id params link
    const id = this.route.snapshot.paramMap.get('id');
    //* get client by id from db
    this.dbC.getClientById(id).subscribe((doc: any) => {
      this.client = {
        id: doc._id,
        firstName: doc.firstName,
        lastName: doc.lastName,
        email: doc.email,
        phone: doc.phone,
        balance: doc.balance,
        created: doc.createdAt,
        creator: doc.creator,
      };
    });
  }

  //! delete client
  public deleteClient() {
    if (confirm('Are you sure ??!!')) {
      this.dbC.deleteClient(this.client.id).subscribe(
        () => {
          this.isDeleted = true;
          setTimeout(() => {
            this.isDeleted = false;
            this.nav.navigate(['/dashboard']);
          }, 2000);
          console.log('client deleted');

          this.isError = null;
        },
        (err) => (this.isError = err)
      );
    }
  }
  public updateBalance() {
    this.dbC.updateBalance(this.client.id, this.client.balance).subscribe(
      (data) => {
        console.log('balance updated', data);
        this.isUpBalanced = true;
        this.isBalanced = false;
        setTimeout(() => {
          this.isUpBalanced = false;

          // this.nav.navigate(['/dashboard']);
        }, 3000);
      },
      (err) => (this.isError = err)
    );
  }
}
