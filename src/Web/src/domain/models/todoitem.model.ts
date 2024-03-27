import {Priority} from "../enums/priority";

export interface TodoItemModel {
  id: string,
  note: string,
  done: boolean,
  todoListId: string,
  priority: Priority,
  deadline: string | null,
  createdAt: Date,
  loading: boolean
}

export interface CreateTodoItemRequest {
  note: string,
  todoListId: string,
  priority: Priority,
  deadline: string | null,
}

export interface UpdateTodoItemRequest {
  id: string,
  note: string,
  done: boolean,
  priority: Priority,
  deadline: string | null,
}
