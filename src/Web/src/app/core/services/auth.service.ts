import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, LoginRequest, RegisterRequest, UserClaim } from "../models/user";
import { map, catchError, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>("users/register", request);
  }

  public login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>("users/login", request);
  }

  public logout() {
    return this.http.get("users/logout");
  }

  public loadUser() {
    return this.http.get<UserClaim[]>("users/user");
  }

  public isAuthenticated(): Observable<boolean> {
    return this.loadUser().pipe(
      map((userClaims) => {
        const hasClaims = userClaims.length > 0;
        return hasClaims;
      }),
      catchError((error) => {
        return of(false);
      })
    )
  }
}
