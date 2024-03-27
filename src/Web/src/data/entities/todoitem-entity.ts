import {Priority} from "../../domain/enums/priority";

export interface TodoItemEntity {
  id: string,
  note: string,
  done: boolean,
  todoListId: string,
  priority: Priority,
  deadline: string | null,
  createdAt: Date,
  loading: boolean
}
