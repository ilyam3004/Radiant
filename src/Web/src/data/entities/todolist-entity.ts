import {TodoItemEntity} from "./todoitem-entity";

export interface TodoListEntity{
  id: string,
  title: string,
  todoItems: TodoItemEntity[];
  userId: string,
  createdAt: Date,
  isTodayTodoList: boolean
}
