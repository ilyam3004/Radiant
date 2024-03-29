import {TodolistCreateUseCase} from "../../domain/usecases/todolist/todolist-create.usecase";
import {TodolistRepository} from "../../domain/repositories/todolist.repository";
import {TodolistRemoveUseCase} from "../../domain/usecases/todolist/todolist-remove.usecase";
import {TodolistGetAllUseCase} from "../../domain/usecases/todolist/todolist-get-all.usecase";
import {TodolistTodayUseCase} from "../../domain/usecases/todolist/todolist-today.usecase";


export const todolistCreateUseCaseProvider = {
  provide: TodolistCreateUseCase,
  useFactory: (todolistRepository: TodolistRepository) =>
    new TodolistCreateUseCase(todolistRepository),
  deps: [TodolistRepository]
};

export const todolistRemoveUseCaseProvider = {
  provide: TodolistRemoveUseCase,
  useFactory: (todolistRepository: TodolistRepository) =>
    new TodolistRemoveUseCase(todolistRepository),
  deps: [TodolistRepository]
};

export const todolistGetAllUseCaseProvider = {
  provide: TodolistGetAllUseCase,
  useFactory: (todolistRepository: TodolistRepository) =>
    new TodolistGetAllUseCase(todolistRepository),
  deps: [TodolistRepository]
};

export const todolistTodayUseCaseProvider = {
  provide: TodolistTodayUseCase,
  useFactory: (todolistRepository: TodolistRepository) =>
    new TodolistTodayUseCase(todolistRepository),
  deps: [TodolistRepository]
};
