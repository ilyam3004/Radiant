import {TodoItemModel, UpdateTodoItemRequest} from "../../models/todoitem.model";
import {TodoItemRepository} from "../../repositories/todoitem.repository";
import {UseCase} from "../../../base/use-case";
import {Observable} from "rxjs";


export class TodoItemUpdateUseCase implements UseCase<UpdateTodoItemRequest, TodoItemModel> {
  constructor(private todoItemRepository: TodoItemRepository) { }

  execute(request: UpdateTodoItemRequest): Observable<TodoItemModel> {
    return this.todoItemRepository.updateTodoItem(request);
  }
}
