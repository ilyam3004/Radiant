import {RegisterRequest, UserModel} from "../models/user.model";
import {UserRepository} from "../repositories/user.repository";
import {UseCase} from "../../base/use-case";
import {Observable} from "rxjs";

export class UserRegisterUseCase implements UseCase<RegisterRequest, UserModel> {

  constructor(private userRepository: UserRepository) { }

  execute(request: RegisterRequest): Observable<UserModel> {
    return this.userRepository.register(request);
  }
}
