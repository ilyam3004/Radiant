import {UserLoginUseCase} from "../../domain/usecases/user/user-login.usecase";
import {UserRepository} from "../../domain/repositories/user.repository";
import {UserRegisterUseCase} from "../../domain/usecases/user/user-register.usecase";


export const userLoginUseCaseProvider = {
  provide: UserLoginUseCase,
  useFactory: (userRepository: UserRepository) => new UserLoginUseCase(userRepository),
  deps: [UserRepository]
};

export const userRegisterUseCaseProvider = {
  provide: UserRegisterUseCase,
  useFactory: (userRepository: UserRepository) => new UserRegisterUseCase(userRepository),
  deps: [UserRepository]
};

export const userUseCases = [
  userLoginUseCaseProvider,
  userRegisterUseCaseProvider
];
