import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel, LoginRequest, RegisterRequest, UserClaim} from "../models/user";
import {map, catchError, Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  public register(request: RegisterRequest): Observable<UserModel> {
    return this.http.post<UserModel>("users/register", request);
  }

  public login(request: LoginRequest): Observable<UserModel> {
    return this.http.post<UserModel>("users/login", request);
  }

  public logout(): Observable<string> {
    return this.http.get<string>("users/logout");
  }

  public loadUser(): Observable<UserClaim[]> {
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
