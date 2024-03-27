import {UserLoginUseCase} from "../domain/usecases/user-login.usecase";
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRepository} from "../domain/repositories/user.repository";
import {UserRegisterUseCase} from "../domain/usecases/user-register.usecase";
import {HttpClientModule} from "@angular/common/http";
import {UserImplementationRepository} from "./repositories/user/user-implementation.repository";
import {TodolistRepository} from "../domain/repositories/todolist.repository";
import {TodolistImplementationRepository} from "./repositories/todolist/todolist-implementation.repository";
import {TodoItemRepository} from "../domain/repositories/todoitem.repository";
import {TodoItemImplementationRepository} from "./repositories/todoitem/todoitem-implementation.repository";
import {TodolistCreateUseCase} from "../domain/usecases/todolist-create.usecase";

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

const todolistCreateUseCaseFactory = (todolistRepository: TodolistRepository) =>
  new TodolistCreateUseCase(todolistRepository);

export const todolistCreateUseCaseProvider = {
  provide: TodolistCreateUseCase,
  useFactory: userRegisterUseCaseFactory,
  deps: [TodolistRepository]
};

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    userLoginUseCaseProvider,
    userRegisterUseCaseProvider,
    todolistCreateUseCaseProvider,
    {provide: UserRepository, useClass: UserImplementationRepository},
    {provide: TodolistRepository, useClass: TodolistImplementationRepository},
    {provide: TodoItemRepository, useClass: TodoItemImplementationRepository}
  ]
})

export class DataModule {
}
