import {Observable} from "rxjs";
import {UseCase} from "../../../base/use-case";
import {UserRepository} from "../../repositories/user.repository";

export class UserAuthenticationUseCase implements UseCase<void, boolean> {
  constructor(private userRepository: UserRepository) { }

  execute(param: void): Observable<boolean> {
    return this.userRepository.isAuthenticated();
  }
}
