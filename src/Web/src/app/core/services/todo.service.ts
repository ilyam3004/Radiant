import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateTodoItemRequest,
  CreateTodoListRequest,
  GetTodoListsResponse,
  RemoveTodoListResponse, TodoItem,
  TodoList
} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) { }

  public createTodoList(request: CreateTodoListRequest): Observable<TodoList> {
    return this.http.post<TodoList>("todo-lists", request);
  }

  public getTodoLists(): Observable<GetTodoListsResponse> {
    return this.http.get<GetTodoListsResponse>("todo-lists");
  }

  public getTodayTodoList(): Observable<TodoList> {
    return this.http.get<TodoList>("todo-lists/today");
  }
  public removeTodoList(todoListId: string): Observable<RemoveTodoListResponse> {
    return this.http.delete<RemoveTodoListResponse>(`todo-lists/${todoListId}`);
  }

  public addTodoItem(createRequest: CreateTodoItemRequest): Observable<TodoList> {
    return this.http.post<TodoList>("todo-items", createRequest);
  }

  public removeTodoItem(todoItemId: string): Observable<TodoList> {
    return this.http.delete<TodoList>(`todo-items/${todoItemId}`);
  }

  public toggleTodoItem(todoItemId: string): Observable<TodoItem> {
    return this.http.put<TodoItem>(`todo-items/${todoItemId}/toggle`, {});
  }
}
