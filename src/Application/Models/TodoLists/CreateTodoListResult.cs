using Domain.Entities;

namespace Application.Models.TodoLists;

public record CreateTodoListResult(
    TodoList TodoList);