import {TodolistRepository} from "../../repositories/todolist.repository";
import {TodoListModel} from "../../models/todolist.model";
import {UseCase} from "../../../base/use-case";
import {Observable} from "rxjs";

export class TodolistTodayUseCase implements UseCase<void, TodoListModel> {
  constructor(private todolistRepository: TodolistRepository) {}

  execute(param: void): Observable<TodoListModel> {
    return this.todolistRepository.getTodayTodoList();
  }
}
