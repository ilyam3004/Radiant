import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from "../core/services/auth.service";
import { Injectable } from '@angular/core';
import {map, Observable } from 'rxjs';


@Injectable(
  { providedIn: 'root' }
)
export class AuthGuard  {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['account/login']);
          return false;
        }
      })
    );
  }
}
