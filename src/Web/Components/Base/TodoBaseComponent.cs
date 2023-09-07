using Microsoft.AspNetCore.Components;
using Web.Services;
using Web.Models.Response;

namespace Web.Components.Base;

public class TodoBaseComponent : ComponentBase
{
    [Inject] 
    public NavigationManager NavigationManager { get; set; }
    
    [Inject]
    public ITodoListService _todoListService { get; set; }
    
    protected List<TodoListResponse> todoLists = new();

    protected ErrorResponse _errorResponse;
    protected bool IsError;

    protected string todoListTitle = "";
    
    protected override async Task OnInitializedAsync()
    {
        await GetUserTodoLists();
    }
    
    private async Task GetUserTodoLists() 
    {
        var response = await _todoListService.GetUserTodoLists();

        if (response.IsT1) 
        {
            _errorResponse = response.AsT1;
            if (_errorResponse.Status == 401)
            {
                NavigationManager.NavigateTo("./login");
            }
            IsError = true;

            return;
        }

        todoLists = response.AsT0.TodoLists;
    }

    protected async Task CreateTodoList()
    {
        var response = await _todoListService
            .CreateTodoList(todoListTitle);

        if (response.IsT1) 
        {
            _errorResponse = response.AsT1;
            if (_errorResponse.Status == 401)
            {
                NavigationManager.NavigateTo("./login");
            }
            IsError = true;

            return;
        }
    
        var todoList = response.AsT0;
        todoLists.Add(todoList);
    }
}
