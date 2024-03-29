import {Observable} from "rxjs";
import {UseCase} from "../../../base/use-case";
import {TodoListModel} from "../../models/todolist.model";
import {TodolistRepository} from "../../repositories/todolist.repository";

export class TodolistGetAllUseCase implements UseCase<void, TodoListModel[]> {
  constructor(private todolistRepository: TodolistRepository) { }

  execute(param: void): Observable<TodoListModel[]> {
    return this.todolistRepository.getTodoLists();
  }
}
