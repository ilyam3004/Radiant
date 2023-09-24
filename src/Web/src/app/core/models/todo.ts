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
}

export interface RemoveTodoListResponse {
  message: string
}

export interface CreateTodoListRequest {
  title: string
}

export interface CreateTodoItemRequest {
  note: string,
  todoListId: string
}

export interface GetTodoListsResponse {
  todoLists: TodoList[]
}