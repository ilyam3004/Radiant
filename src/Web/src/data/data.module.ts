import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRepository} from "../domain/repositories/user.repository";
import {HttpClientModule} from "@angular/common/http";
import {UserImplementationRepository} from "./repositories/user/user-implementation.repository";
import {TodolistRepository} from "../domain/repositories/todolist.repository";
import {TodolistImplementationRepository} from "./repositories/todolist/todolist-implementation.repository";
import {TodoItemRepository} from "../domain/repositories/todoitem.repository";
import {TodoItemImplementationRepository} from "./repositories/todoitem/todoitem-implementation.repository";
import {userUseCases} from "./di/user.dependencies";
import {todolistUseCases} from "./di/todolist.dependencies";
import {todoItemUseCases} from "./di/todoitem.dependencies";


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    userUseCases,
    todolistUseCases,
    todoItemUseCases,
    {provide: UserRepository, useClass: UserImplementationRepository},
    {provide: TodolistRepository, useClass: TodolistImplementationRepository},
    {provide: TodoItemRepository, useClass: TodoItemImplementationRepository}
  ]
})

export class DataModule {
}
