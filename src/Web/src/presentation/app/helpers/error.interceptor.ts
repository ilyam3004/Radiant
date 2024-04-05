import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UserLogoutUseCase} from "../../../domain/usecases/user/user-logout.usecase";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private userLogOutUseCase: UserLogoutUseCase,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].includes(err.status)) {
        this.router.navigate(['account/login']);
        this.userLogOutUseCase.execute();
      }

      return throwError(err);
    }))
  }
}
