import {TodoItemModel} from "./todoitem.model";

export interface TodoListModel {
  id: string,
  title: string,
  todoItems: TodoItemModel[],
  userId: string,
  createdAt: Date,
  isTodayTodoList: boolean
}

export interface RemoveTodoListResponse {
  message: string
}

export interface CreateTodoListRequest {
  title: string
}

export interface GetTodoListsResponse {
  todoLists: TodoListModel[]
}
