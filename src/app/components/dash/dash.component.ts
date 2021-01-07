import { Component, OnInit } from '@angular/core';
import { Ui } from 'src/app/models/models';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
})
export class DashComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    Ui();
  }
}
