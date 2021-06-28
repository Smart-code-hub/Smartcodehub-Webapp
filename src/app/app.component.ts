import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

import { Router } from '@angular/router';
import {
  NotificationService,
  NotificationType
} from './services/notification.service';
declare var feather, $: any;
@Component({
  selector: 'Smartcodehub-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) {}
  title = 'admin';
  loading = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  User$: Observable<any>;
  ngAfterViewInit(): void {
    feather.replace();
  }
  LogOut() {
    this.authService.ClearUserCredential();
    this.router.navigateByUrl('/security/login');
  }

  ngOnInit(): void {
    this.authService;

    this.User$ = this.authService.User$;
  }
}
