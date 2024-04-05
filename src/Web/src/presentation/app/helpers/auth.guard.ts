import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {UserAuthenticationUseCase} from "../../../domain/usecases/user/user-authentication.usecase";

@Injectable(
  {providedIn: 'root'}
)
export class AuthGuard {
  constructor(
    private router: Router,
    private userAuthenticationUseCase: UserAuthenticationUseCase,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userAuthenticationUseCase.execute()
      .pipe(map((isAuthenticated) => {
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
