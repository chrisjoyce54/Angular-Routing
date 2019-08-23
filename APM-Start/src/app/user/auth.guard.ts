import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, CanLoad, UrlSegment, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad  {

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLoggedIn(route.path);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.checkLoggedIn(state.url);
  }
  constructor(private authService: AuthService,
      private router: Router) {

      }
      checkLoggedIn(url: string): boolean {
        if (this.authService.isLoggedIn) {
          return true;
        } else {
          this.authService.redirectUrl = url;
          this.router.navigate(['/login']);
          return false;
        }
      }
}
