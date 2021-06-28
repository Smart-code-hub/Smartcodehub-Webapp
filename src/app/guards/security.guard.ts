import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate, CanActivateChild {
  /**
   *
   */
  userModel: any;
  constructor(private authService: AuthService, private router: Router) {
    this.authService;
    this.authService.User$.subscribe(a => {
      this.userModel = a;
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userModel.token
      ? true
      : this.router.navigateByUrl('/security/login');
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userModel.token
      ? true
      : this.router.navigateByUrl('/security/login');
  }
}
