import { Component, OnInit } from '@angular/core';
import { DbClientsService } from '../../services/db-clients.service';
import { Ui } from '../../models/models';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private dbs: DbClientsService) {}

  ngOnInit() {
    Ui();
    // this.initClients();
  }

  public initClients() {
    this.dbs.getClients().subscribe((data) => {
      console.log(data);
    });

    // changes.forEach((change) => {
    //   console.log(
    //     change.doc.id,
    //     change.doc.data().firstName,
    //     change.doc.data().lastName
    //   );
    // });

    // data.forEach((doc) => {
    //   console.log(doc.id, doc.data().firstName, doc.data().lastName);
    // });
  }
}
