import {
  CreateTodoItemRequest,
  TodoItem,
  TodoList, UpdateTodoItemRequest
} from "../../presentation/app/core/models/todo";
import {Observable} from "rxjs";
import {TodoListModel} from "../models/todolist.model";
import {TodoItemModel} from "../models/todoitem.model";

export abstract class TodoItemRepository {
  abstract addTodoItem(createRequest: CreateTodoItemRequest): Observable<TodoListModel>;
  abstract removeTodoItem(todoItemId: string): Observable<TodoListModel>;
  abstract updateTodoItem(updateRequest: UpdateTodoItemRequest): Observable<TodoItemModel>;
  abstract toggleTodoItem(todoItemId: string): Observable<TodoItemModel>;
}
