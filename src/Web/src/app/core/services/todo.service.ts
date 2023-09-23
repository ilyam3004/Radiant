import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {CreateTodoListRequest, RemoveTodoListResponse, TodoList} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  public createTodoList(request: CreateTodoListRequest): Observable<TodoList> {
    return this.http.post<TodoList>("todo-lists", request);
  }

  public getTodoLists(): Observable<TodoList[]> {
    return this.http.get<TodoList[]>("todo-lists");
  }

  public removeTodoList(todoListId: string): Observable<RemoveTodoListResponse> {
    return this.http.delete<RemoveTodoListResponse>(`todo-lists/${todoListId}`);
  }
}
