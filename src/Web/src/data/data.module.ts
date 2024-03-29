import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRepository} from "../domain/repositories/user.repository";
import {HttpClientModule} from "@angular/common/http";
import {UserImplementationRepository} from "./repositories/user/user-implementation.repository";
import {TodolistRepository} from "../domain/repositories/todolist.repository";
import {TodolistImplementationRepository} from "./repositories/todolist/todolist-implementation.repository";
import {TodoItemRepository} from "../domain/repositories/todoitem.repository";
import {TodoItemImplementationRepository} from "./repositories/todoitem/todoitem-implementation.repository";
import {userLoginUseCaseProvider, userRegisterUseCaseProvider} from "./di/user.dependencies";
import {
  todolistCreateUseCaseProvider,
  todolistGetAllUseCaseProvider,
  todolistRemoveUseCaseProvider, todolistTodayUseCaseProvider
} from "./di/todolist.dependencies";


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    userLoginUseCaseProvider,
    userRegisterUseCaseProvider,
    todolistCreateUseCaseProvider,
    todolistRemoveUseCaseProvider,
    todolistGetAllUseCaseProvider,
    todolistTodayUseCaseProvider,
    {provide: UserRepository, useClass: UserImplementationRepository},
    {provide: TodolistRepository, useClass: TodolistImplementationRepository},
    {provide: TodoItemRepository, useClass: TodoItemImplementationRepository}
  ]
})

export class DataModule { }
