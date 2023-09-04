using Domain.Entities;

namespace Application.Models.TodoLists;

public record GetTodoListsResult(List<TodoList> TodoLists);