import {UserLoginUseCase} from "../domain/usecases/user-login.usecase";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserRepository} from "../domain/repositories/user.repository";
import {UserRegisterUseCase} from "../domain/usecases/user-register.usecase";
import {HttpClientModule} from "@angular/common/http";
import {UserImplementationRepository} from "./repositories/user/user-implementation.repository";

const userLoginUseCaseFactory = (userRepository: UserRepository) =>
    new UserLoginUseCase(userRepository);

export const userLoginUseCaseProvider = {
  provide: UserLoginUseCase,
  useFactory: userLoginUseCaseFactory,
  deps: [UserRepository]
};

const userRegisterUseCaseFactory = (userRepository: UserRepository) =>
  new UserRegisterUseCase(userRepository);

export const userRegisterUseCaseProvider = {
  provide: UserRegisterUseCase,
  useFactory: userRegisterUseCaseFactory,
  deps: [UserRepository]
};

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    userLoginUseCaseProvider,
    userRegisterUseCaseProvider,
    { provide: UserRepository, useClass: UserImplementationRepository }
  ]
})

export class DataModule { }
