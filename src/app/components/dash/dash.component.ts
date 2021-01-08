import { Component, OnInit } from '@angular/core';
import { Client, Ui } from 'src/app/models/models';
import { DbClientsService } from 'src/app/services/db-clients.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
})
export class DashComponent implements OnInit {
  client: Client;
  clients: Array<Client>;
  total: number;
  term: string = null;
  isCard: boolean = false;
  constructor(private dbS: DbClientsService) {}

  ngOnInit(): void {
    this.total = 0;
    this.clients = [];

    this.client = {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      balance: null,
      created: new Date(),
    };
    Ui();
    this.initClients();
  }
  //! get clients from db
  public initClients() {
    this.dbS.getClients().subscribe((data) => {
      data.docs.forEach((doc) => {
        this.client = {
          id: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          email: doc.data().email,
          phone: doc.data().phone,
          balance: doc.data().balance,
          created: doc.data().created.toDate(),
        };
        this.clients.unshift(this.client);
        this.totalBalance();
      });
    });
  }
  //! calc balance total
  public totalBalance() {
    this.total = this.clients.reduce((acc, cur) => {
      return acc + cur.balance;
    }, 0);
    return this.total;
  }

  //! search client
  public onSearch() {
    console.log(this.term);
    this.clients.filter((client, index) => {
      if (
        client.email.includes(this.term.toLowerCase()) ||
        client.firstName.includes(this.term.toLowerCase()) ||
        client.lastName.includes(this.term.toLowerCase())
      ) {
        document.getElementById(String(index)).classList.remove('d-none');
      } else {
        document.getElementById(String(index)).classList.add('d-none');
      }
    });
  }
}
