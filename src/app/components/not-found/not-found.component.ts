import { Component, OnInit } from '@angular/core';
import { Ui } from '../../models/models';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    Ui();
  }
}
