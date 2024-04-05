import {UserLoginUseCase} from "../../domain/usecases/user/user-login.usecase";
import {UserRepository} from "../../domain/repositories/user.repository";
import {UserRegisterUseCase} from "../../domain/usecases/user/user-register.usecase";
import {UserLogoutUseCase} from "../../domain/usecases/user/user-logout.usecase";
import {UserAuthenticationUseCase} from "../../domain/usecases/user/user-authentication.usecase";


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

export const userLogOutUseCaseProvider = {
  provide: UserLogoutUseCase,
  useFactory: (userRepository: UserRepository) => new UserLogoutUseCase(userRepository),
  deps: [UserRepository]
};

export const userAuthenticationUseCaseProvider = {
  provide: UserAuthenticationUseCase,
  useFactory: (userRepository: UserRepository) => new UserAuthenticationUseCase(userRepository),
  deps: [UserRepository]
};

export const userUseCases = [
  userLoginUseCaseProvider,
  userRegisterUseCaseProvider,
  userLogOutUseCaseProvider,
  userAuthenticationUseCaseProvider
];
