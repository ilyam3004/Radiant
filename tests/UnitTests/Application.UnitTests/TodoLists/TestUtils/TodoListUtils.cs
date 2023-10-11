using Application.ToDoLists.Queries.GetTodayTodoList;
using Domain.Entities;

namespace Application.UnitTests.TodoLists.TestUtils;

public static class TodoListUtils
{
    public static List<TodoList> CreatUserTodoLists(int todoListCount = 1) =>
        Enumerable.Range(0, todoListCount).Select(index => 
            new TodoList()).ToList();
}