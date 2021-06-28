import { Injectable } from '@angular/core';
declare var feather, $: any;
export enum NotificationType {
  error,
  success,
  warn
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  showNotification(notificationType: NotificationType, message) {
    const type = [
      '',
      'info',
      'danger',
      'success',
      'warning',
      'rose',
      'primary'
    ];

    let color =
      notificationType == NotificationType.error
        ? 'danger'
        : notificationType == NotificationType.success
        ? 'success'
        : 'rose';

    $.notify(
      {
        icon: 'add_alert',
        message: message
      },
      {
        type: color,
        timer: 3000,
        placement: {
          from: 'top',
          align: 'right'
        }
      }
    );
  }
  constructor() {}
}
