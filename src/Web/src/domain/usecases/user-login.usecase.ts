import {UserRepository} from "../repositories/user.repository";
import {LoginRequest, UserModel} from "../models/user.model";
import {UseCase} from "../../base/use-case";
import {Observable} from "rxjs";


export class UserLoginUseCase implements UseCase<LoginRequest, UserModel> {
  constructor(private userRepository: UserRepository) { }

  execute(request: LoginRequest): Observable<UserModel> {
    return this.userRepository.login(request);
  }
}
