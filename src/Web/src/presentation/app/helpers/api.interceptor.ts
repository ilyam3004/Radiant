import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = request
      .clone({url: `${environment.apiBaseUrl}/${request.url}`,
        withCredentials: true});

    return next.handle(apiReq);
  }
}
