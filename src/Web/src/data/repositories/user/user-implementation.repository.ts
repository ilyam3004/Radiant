import {catchError, map, Observable, of} from "rxjs";
import {RegisterRequest, LoginRequest, UserClaim, UserModel} from "src/domain/models/user.model";
import {UserRepository} from "../../../domain/repositories/user.repository";
import {HttpClient} from "@angular/common/http";
import {UserEntity} from "../../entities/user-entity";
import {UserClaimEntityMapper} from "./mappers/user-claim-entity.mapper";
import {UserEntityMapper} from "./mappers/user-entity.mapper";
import {Injectable} from "@angular/core";


@Injectable()
export class UserImplementationRepository implements UserRepository {

  userMapper = new UserEntityMapper()
  userClaimMapper = new UserClaimEntityMapper()

  constructor(private http: HttpClient) { }

  public register(request: RegisterRequest): Observable<UserModel> {
    return this.http
      .post<UserEntity>("users/register", request)
      .pipe(map(this.userMapper.mapFrom));
  }

  public login(request: LoginRequest): Observable<UserModel> {
    return this.http
      .post<UserEntity>("users/login", request)
      .pipe(map(this.userMapper.mapFrom));
  }

  public logout(): Observable<string> {
    return this.http.get<string>("users/logout");
  }

  public loadUser(): Observable<UserClaim[]> {
    return this.http.get<UserClaim[]>("users/user")
      .pipe(map(userClaims =>
        userClaims.map(claim => this.userClaimMapper.mapFrom(claim))));
  }

  public isAuthenticated()
    :
    Observable<boolean> {
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
