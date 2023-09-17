namespace Web.Models.Responses;

public record GetTodoListsResponse(
    List<TodoListResponse> TodoLists);