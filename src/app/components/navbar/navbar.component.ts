import { Component, OnInit } from '@angular/core';
import { DbClientsService } from '../../services/db-clients.service';
import { Ui } from '../../models/models';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/models';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  register: boolean = false;

  constructor(
    private dbs: DbClientsService,
    private settings: SettingsService
  ) {}

  ngOnInit() {
    Ui();
    this.settings.getSettings().subscribe({
      next(data) {
        console.log(data);
        this.register = data.registration;
      },
    });
    console.log(this.register);
    // ( (data)=> {
    //   data.next()

    //   console.log('i m nav', data);
    //   this.register = data.registration;
    // });

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
