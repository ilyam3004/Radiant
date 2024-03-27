import {map, Observable} from "rxjs";
import {CreateTodoItemRequest, UpdateTodoItemRequest} from "src/presentation/app/core/models/todo";
import {TodoItemRepository} from "../../../domain/repositories/todoitem.repository";
import {TodoListModel} from "../../../domain/models/todolist.model";
import {TodoItemModel} from "src/domain/models/todoitem.model";
import {HttpClient} from "@angular/common/http";
import {TodoItemEntityMapper} from "./mappers/todoitem-entity.mapper";
import {TodoItemEntity} from "../../entities/todoitem-entity";
import {TodolistEntityMapper} from "../todolist/mappers/todolist-entity.mapper";
import {TodoListEntity} from "../../entities/todolist-entity";

export class TodoItemImplementationRepository extends TodoItemRepository {
  private todoItemEntityMapper: TodoItemEntityMapper;
  private todoListEntityMapper: TodolistEntityMapper;

  constructor(private httpClient: HttpClient) {
    super();
    this.todoItemEntityMapper = new TodoItemEntityMapper();
    this.todoListEntityMapper = new TodolistEntityMapper();
  }

  override addTodoItem(createRequest: CreateTodoItemRequest): Observable<TodoListModel> {
    return this.httpClient
      .post<TodoListEntity>("todo-items", createRequest)
      .pipe(map(todoItem =>
        this.todoListEntityMapper.mapFrom(todoItem)));
  }

  override removeTodoItem(todoItemId: string): Observable<TodoListModel> {
    return this.httpClient
      .delete<TodoListEntity>(`todo-items/${todoItemId}`)
      .pipe(map(todoList =>
        this.todoListEntityMapper.mapFrom(todoList)));
  }

  override updateTodoItem(updateRequest: UpdateTodoItemRequest): Observable<TodoItemModel> {
    return this.httpClient
      .put<TodoItemEntity>(`todo-items`, updateRequest)
      .pipe(map(todoItem =>
        this.todoItemEntityMapper.mapFrom(todoItem)));
  }

  override toggleTodoItem(todoItemId: string): Observable<TodoItemModel> {
    return this.httpClient
      .put<TodoItemEntity>(`todo-items/${todoItemId}/toggle`, {})
      .pipe(map(todoItem =>
        this.todoItemEntityMapper.mapFrom(todoItem)));
  }
}
