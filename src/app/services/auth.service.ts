import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Router } from '@angular/router';
const userKey = 'USER_DETAIL';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subject = new BehaviorSubject<any>(this.GetUserCredential());

  User$: Observable<any> = this.subject.asObservable();
  constructor(private router: Router) {}

  SetUserCredential(model: any) {
    localStorage.setItem(userKey, JSON.stringify(model));
    this.subject.next(model);
    this.router.navigateByUrl('/');
  }
  ClearUserCredential() {
    localStorage.removeItem(userKey);
    this.subject.next({
      email: '',
      name: '',
      _id: '',
      token: '',
      userType: 'user'
    });
  }
  GetUserCredential() {
    const userstring = localStorage.getItem(userKey);
    userstring;

    if (userstring) return JSON.parse(userstring);
    return {
      email: '',
      name: '',
      _id: '',
      token: '',
      userType: ''
    };
  }
}
