namespace Web.Models.Response;

public record GetTodoListsResponse(
    List<TodoListResponse> TodoLists);