import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {
  NotificationService,
  NotificationType
} from '../../services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'Smartcodehub-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.scss']
})
export class VerifyemailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private http: HttpClient
  ) {}
  email;
  resendEmail() {
    this.http
      .get(`${environment.url}api/user/resendEmail/${this.email}`)
      .subscribe(
        a => {
          this.notificationService.showNotification(
            NotificationType.success,
            'Please check your Email'
          );
        },
        err => {
          this.notificationService.showNotification(
            NotificationType.success,
            err.error.message
          );
        }
      );
  }
  ngOnInit() {
    this.route.params.subscribe(a => (this.email = a['id']));
  }
}
