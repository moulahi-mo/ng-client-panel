import { Injectable } from '@angular/core';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root',
})
//! using local storage for storing user data and fetsh it again for profile
export class ProfileService {
  profile: User;

  constructor() {}

  public setProfile(item: User) {
    return localStorage.setItem('profile', JSON.stringify(item));
  }
  public getProfile() {
    const data =
      localStorage.getItem('profile') !== null
        ? JSON.parse(localStorage.getItem('profile'))
        : {
            id: null,
            name: null,
            email: null,
            password: null,
          };
    return data;
  }
  public removeProfile() {
    localStorage.removeItem('profile');
  }
}
