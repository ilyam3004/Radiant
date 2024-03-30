import {
  CreateTodoItemRequest,
  TodoItemModel,
  UpdateTodoItemRequest
} from "../models/todoitem.model";
import {TodoListModel} from "../models/todolist.model";
import {Observable} from "rxjs";

export abstract class TodoItemRepository {
  abstract addTodoItem(createRequest: CreateTodoItemRequest): Observable<TodoListModel>;
  abstract removeTodoItem(todoItemId: string): Observable<TodoListModel>;
  abstract updateTodoItem(updateRequest: UpdateTodoItemRequest): Observable<TodoItemModel>;
  abstract toggleTodoItem(todoItemId: string): Observable<TodoItemModel>;
}
