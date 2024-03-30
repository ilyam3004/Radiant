import {TodoItemRepository} from "../../repositories/todoitem.repository";
import {CreateTodoItemRequest} from "../../models/todoitem.model";
import {TodoListModel} from "../../models/todolist.model";
import {UseCase} from "../../../base/use-case";
import {Observable} from "rxjs";

export class TodoItemCreateUseCase implements UseCase<CreateTodoItemRequest, TodoListModel> {
  constructor(private todoItemRepository: TodoItemRepository) { }

  execute(request: CreateTodoItemRequest): Observable<TodoListModel> {
    return this.todoItemRepository.addTodoItem(request)
  }
}
