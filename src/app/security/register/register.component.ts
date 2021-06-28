import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  NotificationService,
  NotificationType
} from '../../services/notification.service';


@Component({
  selector: 'Smartcodehub-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  loading = false;
  user = {
    email: '',
    password: '',
    phone: 0,
    name: ''
  };
  RegisterUser() {
    if (!this.user.email) {
      alert('Email Is Required');
      return;
    }
    this.loading = true;
    this.http.post<any>(`${environment.url}api/user`, this.user).subscribe(
      a => {
        this.loading = false;
        if (!a)
          this.user = {
            email: '',
            password: '',
            phone: 0,
            name: ''
          };
        else {
          this.router.navigateByUrl('/security/login');
        }
      },
      err => {
        this.loading = false;
        this.notificationService.showNotification(
          NotificationType.error,
          err.message
        );
      }
    );
  }
}
