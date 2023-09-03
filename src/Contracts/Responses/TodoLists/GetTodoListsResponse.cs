namespace Contracts.Responses.TodoLists;

public record GetTodoListsResponse(
    List<TodoListResponse> TodoLists);