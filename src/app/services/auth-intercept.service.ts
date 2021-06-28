import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptService implements HttpInterceptor {
  user: any;
  constructor(private authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.user = this.authService.GetUserCredential();
    request = request.clone({
      setHeaders: {
        Authorization: `${this.user.token}`
      }
    });
    return next.handle(request);
  }
}
