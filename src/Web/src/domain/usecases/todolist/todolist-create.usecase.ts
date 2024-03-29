import {CreateTodoListRequest, TodoListModel} from "../../models/todolist.model";
import {TodolistRepository} from "../../repositories/todolist.repository";
import {UseCase} from "../../../base/use-case";
import {Observable} from "rxjs";

export class TodolistCreateUseCase implements UseCase<CreateTodoListRequest, TodoListModel> {
  constructor(private todoListRepository: TodolistRepository) { }

  execute(request: CreateTodoListRequest): Observable<TodoListModel> {
    return this.todoListRepository.createTodoList(request);
  }
}
