import {TodoItemRepository} from "../../repositories/todoitem.repository";
import {TodoListModel} from "../../models/todolist.model";
import {UseCase} from "../../../base/use-case";
import {Observable} from "rxjs";

export class TodoItemRemoveUseCase implements UseCase<string, TodoListModel> {
  constructor(private todoItemRepository: TodoItemRepository) { }

  execute(todoItemId: string): Observable<TodoListModel> {
    return this.todoItemRepository.removeTodoItem(todoItemId)
  }
}
