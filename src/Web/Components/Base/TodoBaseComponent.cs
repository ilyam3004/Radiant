using Microsoft.AspNetCore.Components;
using Contracts.Requests;
using Contracts.Responses.TodoLists;
using Web.Models;
using Web.Models.Response;
using Web.Services;

namespace Web.Components.Base;

public class TodoBaseComponent : ComponentBase
{
    [Inject] 
    public NavigationManager NavigationManager { get; set; } = null!;

    [Inject] 
    public ITodoListService TodoListService { get; set; } = null!;

    [Inject] 
    public ITodoItemService TodoItemService { get; set; } = null!;

    protected List<TodoListResponse> TodoLists = new();

    protected ErrorResponse _errorResponse;
    protected bool IsError;

    protected string Message = "";
    protected bool IsSuccess = false;

    protected string TodoListTitle = "";
    
    protected override async Task OnInitializedAsync()
    {
        await GetUserTodoLists();
    }
    
    private async Task GetUserTodoLists() 
    {
        var response = await TodoListService.GetUserTodoLists();

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

        TodoLists = response.AsT0.TodoLists;
    }

    protected async Task CreateTodoList()
    {
        ResetErrorsAndSuccessMessages();
        var response = await TodoListService
            .CreateTodoList(TodoListTitle);

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
        TodoLists.Add(todoList);
    }

    protected async Task RemoveTodoList(TodoListResponse todoList) 
    {
        ResetErrorsAndSuccessMessages();
        
        var response = await TodoListService
            .RemoveTodoList(todoList.Id);
        
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

        TodoLists.Remove(todoList);

        Message = response.AsT0.Message;
        IsSuccess = true;
    }

    protected async Task AddTodoItem(CreateTodoItemRequest request)
    {
        ResetErrorsAndSuccessMessages();
        
        var response = await TodoItemService.AddTodoItem(request);
        
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
        var todoListIndex = TodoLists.FindIndex(tl => tl.Id == todoList.Id);
        TodoLists[todoListIndex] = todoList;
        
        ShowSuccessAlert(Messages.TodoItemAdded);
    }
    
    protected async Task RemoveTodoItem(Guid todoItemId)
    {
        ResetErrorsAndSuccessMessages();
        
        var response = await TodoItemService.RemoveTodoItem(todoItemId);
        
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
        UpdateTodolist(todoList);
        ShowSuccessAlert(Messages.TodoItemRemoved);
    }

    public async Task ToggleTodoItem(Guid todoItemId)
    {
        ResetErrorsAndSuccessMessages();

        var response = await TodoItemService.ToggleTodoItem(todoItemId);
        
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

        var todoItem = response.AsT0;
        UpdateTodoItem(todoItem);
    }
    
    private void UpdateTodolist(TodoListResponse todoList)
    {
        var todoListIndex = TodoLists.FindIndex(tl => tl.Id == todoList.Id);
        TodoLists[todoListIndex] = todoList;
    }
    
    private void UpdateTodoItem(TodoItemResponse todoItem)
    {
        var todoListIndex = TodoLists.FindIndex(tl => tl.Id == todoItem.TodoListId);
        var todoItemIndex = TodoLists[todoListIndex].TodoItems.FindIndex(ti => ti.Id == todoItem.Id);
        TodoLists[todoListIndex].TodoItems[todoItemIndex] = todoItem;
    }

    private void ResetErrorsAndSuccessMessages()
    {
        IsError = false;
        IsSuccess = false;
        Message = "";
    }
    
    private void ShowSuccessAlert(string message)
    {
        IsSuccess = true;
        Message = message;
    }
}
