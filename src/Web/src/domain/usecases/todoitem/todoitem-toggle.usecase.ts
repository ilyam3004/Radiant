import {TodoItemRepository} from "../../repositories/todoitem.repository";
import {UseCase} from "../../../base/use-case";
import {TodoItemModel} from "../../models/todoitem.model";
import {Observable} from "rxjs";

export class TodoItemToggleUseCase implements UseCase<string, TodoItemModel> {
  constructor(private todoItemRepository: TodoItemRepository) { }

  execute(todoItemId: string): Observable<TodoItemModel> {
    return this.todoItemRepository.toggleTodoItem(todoItemId);
  }
}
