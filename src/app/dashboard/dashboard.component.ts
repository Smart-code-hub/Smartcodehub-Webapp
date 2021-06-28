import { Component, ViewChild, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
//import { PlyrComponent } from 'ngx-plyr';
import {
  NotificationService,
  NotificationType
} from '../services/notification.service';
declare var Plyr: any;
@Component({
  selector: 'Smartcodehub-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private notificationService: NotificationService) {}
  //@ViewChild(PlyrComponent, { static: true })
  //plyr: PlyrComponent;

  // or get it from plyrInit event
  player: any;

  vimeoSources = [
    {
      src: 'https://vimeo.com/366025193',
      provider: 'vimeo'
    }
  ];
  ngOnInit(): void {
    this.notificationService.showNotification(
      NotificationType.warn,
      'Welcome To Smartcodehub'
    );
  }

  played(event: any) {}

  play(): void {
   // this.player.play(); // or this.plyr.player.play()
  }
}
