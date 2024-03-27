import {Injectable} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {AuthService} from "../core/services/auth.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private accountService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = request
      .clone({url: `${environment.apiBaseUrl}/${request.url}`,
        withCredentials: true});

    return next.handle(apiReq);
  }
}
