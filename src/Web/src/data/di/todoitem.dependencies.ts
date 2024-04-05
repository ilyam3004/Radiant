import {TodoItemRepository} from "../../domain/repositories/todoitem.repository";
import {TodoItemCreateUseCase} from "../../domain/usecases/todoitem/todoitem-create.usecase";
import {TodoItemToggleUseCase} from "../../domain/usecases/todoitem/todoitem-toggle.usecase";
import {TodoItemRemoveUseCase} from "../../domain/usecases/todoitem/todoitem-remove.usecase";
import {TodoItemUpdateUseCase} from "../../domain/usecases/todoitem/todoitem-update.usecase";

export const todoItemCreateUseCaseProvider = {
  provide: TodoItemCreateUseCase,
  useFactory: (todolistRepository: TodoItemRepository) =>
    new TodoItemCreateUseCase(todolistRepository),
  deps: [TodoItemRepository]
};

export const todoItemUpdateUseCaseProvider = {
  provide: TodoItemUpdateUseCase,
  useFactory: (todolistRepository: TodoItemRepository) =>
    new TodoItemUpdateUseCase(todolistRepository),
  deps: [TodoItemRepository]
};

export const todoItemToggleUseCaseProvider = {
  provide: TodoItemToggleUseCase,
  useFactory: (todolistRepository: TodoItemRepository) =>
    new TodoItemToggleUseCase(todolistRepository),
  deps: [TodoItemRepository]
};

export const todoItemRemoveUseCaseProvider = {
  provide: TodoItemRemoveUseCase,
  useFactory: (todolistRepository: TodoItemRepository) =>
    new TodoItemRemoveUseCase(todolistRepository),
  deps: [TodoItemRepository]
}

export const todoItemUseCases = [
  todoItemCreateUseCaseProvider,
  todoItemToggleUseCaseProvider,
  todoItemRemoveUseCaseProvider,
  todoItemUpdateUseCaseProvider
];
