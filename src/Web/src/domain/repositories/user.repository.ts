import {RegisterRequest, LoginRequest, UserModel} from "../models/user.model";
import {UserClaimModel} from "../models/user-claim.model";
import {Observable} from "rxjs";

export abstract class UserRepository {
  abstract register(request: RegisterRequest): Observable<UserModel>;
  abstract login(request: LoginRequest): Observable<UserModel>;
  abstract logout(): Observable<string>;
  abstract loadUser(): Observable<UserClaimModel[]>;
  abstract isAuthenticated(): Observable<boolean>;
}
