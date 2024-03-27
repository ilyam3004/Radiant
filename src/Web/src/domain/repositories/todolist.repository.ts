import {
  CreateTodoListRequest,
  GetTodoListsResponse,
  RemoveTodoListResponse,
  TodoList
} from "../../presentation/app/core/models/todo";
import {Observable} from "rxjs";
import {TodoListModel} from "../models/todolist.model";

export abstract class TodolistRepository {
  abstract createTodoList(request: CreateTodoListRequest): Observable<TodoListModel>;
  abstract removeTodoList(todoListId: string): Observable<void>;
  abstract getTodoLists(): Observable<TodoListModel[]>;
  abstract getTodayTodoList(): Observable<TodoList>;
}
