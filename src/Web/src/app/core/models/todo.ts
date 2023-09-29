export interface TodoList {
  id: string,
  title: string,
  todoItems: TodoItem[],
  userId: string
}

export interface TodoItem {
  id: string,
  note: string,
  done: boolean,
  todoListId: string
  priority: Priority
}

export interface RemoveTodoListResponse {
  message: string
}

export interface CreateTodoListRequest {
  title: string
}

export interface CreateTodoItemRequest {
  note: string,
  todoListId: string,
  Priority: Priority
}

export interface GetTodoListsResponse {
  todoLists: TodoList[]
}

export enum Priority {
  Low = 0,
  Medium = 1,
  High = 2
}
