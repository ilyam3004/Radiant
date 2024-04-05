import {UserRepository} from "../../repositories/user.repository";
import {UseCase} from "../../../base/use-case";
import {Observable} from "rxjs";

export class UserLogoutUseCase implements UseCase<void, string> {
  constructor(private userRepository: UserRepository) { }

  execute(param: void): Observable<string> {
    return this.userRepository.logout();
  }
}
