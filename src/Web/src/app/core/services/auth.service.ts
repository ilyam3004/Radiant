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
    return this.http.post<AuthResponse>("register", request);
  }

  public login(request: LoginRequest) {
    return this.http.post<AuthResponse>("users/login", request,
      { withCredentials: true });
  }

  public logout() {
    return this.http.get("user/logout");
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
