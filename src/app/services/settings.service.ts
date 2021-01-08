import { Injectable } from '@angular/core';
import { Settings } from '../models/models';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor() {}

  public setSettings(item: Settings) {
    return localStorage.setItem('settings', JSON.stringify(item));
  }
  public getSettings(): Observable<Settings> {
    const set =
      localStorage.getItem('settings') !== null
        ? JSON.parse(localStorage.getItem('settings'))
        : {
            registration: false,
            balanceAdd: false,
            balanceEdit: false,
          };
    return of(set);
  }
}
