import {TodolistRepository} from "../../../domain/repositories/todolist.repository";
import {TodoListEntity} from "../../entities/todolist-entity";
import {CreateTodoListRequest, TodoListModel} from "../../../domain/models/todolist.model";
import {TodolistEntityMapper} from "./mappers/todolist-entity.mapper";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Injectable} from "@angular/core";


@Injectable()
export class TodolistImplementationRepository extends TodolistRepository {
  private todolistEntityMapper: TodolistEntityMapper;

  constructor(private http: HttpClient) {
    super();
    this.todolistEntityMapper = new TodolistEntityMapper();
  }

  override createTodoList(request: CreateTodoListRequest): Observable<TodoListModel> {
    return this.http
      .post<TodoListEntity>("todo-lists", request)
      .pipe(map(todoList =>
      {
        console.log(todoList)
        return this.todolistEntityMapper.mapFrom(todoList)
      }));
  }

  override removeTodoList(todoListId: string): Observable<void> {
    return this.http
      .delete<void>(`todo-lists/${todoListId}`);
  }

  override getTodoLists(): Observable<TodoListModel[]> {
    return this.http
      .get<TodoListEntity[]>("todo-lists")
      .pipe(map(todoLists => {
        return todoLists.map(todoList =>
          this.todolistEntityMapper.mapFrom(todoList))
      }));
  }

  override getTodayTodoList(): Observable<TodoListModel> {
    return this.http
      .get<TodoListEntity>("todo-lists/today")
      .pipe(map(todolist =>
        this.todolistEntityMapper.mapFrom(todolist)));
  }
}
