import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import {
  NotificationService,
  NotificationType
} from '../../services/notification.service';

@Component({
  selector: 'Smartcodehub-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  loading = false;
  user = {
    email: '',
    password: ''
  };
  LoginUser() {
    this.loading = true;
    this.http
      .post<any>(`${environment.url}api/user/login`, this.user)
      .subscribe(
        a => {
          this.loading = false;
          if (!a)
            this.user = {
              email: '',
              password: ''
            };
          else {
            this.authService.SetUserCredential(a);
          }
        },
        err => {
          if (err.error.message == 'Email Not Verified')
            return this.router.navigateByUrl(
              '/security/verify/' + err.error.uid
            );
          this.loading = false;
          this.notificationService.showNotification(
            NotificationType.error,
            err.error.message
          );
        }
      );
  }
}
