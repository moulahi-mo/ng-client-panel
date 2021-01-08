import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Client } from 'src/app/models/models';
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
  constructor(
    private dbC: DbClientsService,
    private route: ActivatedRoute,
    private nav: Router
  ) {}

  ngOnInit(): void {
    this.client = {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      balance: null,
      created: new Date(),
    };
    // *get the id params link
    const id = this.route.snapshot.paramMap.get('id');
    //* get client by id from db
    this.dbC.getClientById(id).subscribe((doc) => {
      this.client = {
        id: doc.id,
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        email: doc.data().email,
        phone: doc.data().phone,
        balance: doc.data().balance,
        created: doc.data().created.toDate(),
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
