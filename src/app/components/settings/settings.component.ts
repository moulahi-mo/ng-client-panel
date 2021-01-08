import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/models/models';
import { SettingsService } from '../../services/settings.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  set: Settings;
  isSet: boolean = false;
  constructor(private setLocal: SettingsService) {}

  ngOnInit(): void {
    this.set = {
      registration: false,
      balanceAdd: false,
      balanceEdit: false,
    };
    this.getSet();
  }
  public getSet() {
    this.setLocal.getSettings().subscribe((data) => (this.set = data));
  }

  public onEdit(f: HTMLFormElement) {
    console.log(f.value);
    this.set = f.value;
    this.setLocal.setSettings(this.set);

    this.isSet = true;
    setTimeout(() => {
      this.isSet = false;
    }, 2000);
  }
}
