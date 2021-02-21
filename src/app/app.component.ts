import { Component, OnInit } from '@angular/core';
import { AuthClientsService } from './services/auth-clients.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthClientsService) {}

  ngOnInit() {
    this.auth.autoAuth();
  }
  title = 'client-panel';
}
