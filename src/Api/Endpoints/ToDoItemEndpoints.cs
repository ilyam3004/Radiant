using Application.ToDoItems.Commands.RemoveTodoItem;
using Application.ToDoItems.Commands.ToggleTodoItem;
using Application.ToDoItems.Commands;
using Application.ToDoItems.Commands.CreateTodoItem;
using Contracts.Responses.TodoLists;
using Microsoft.AspNetCore.Mvc;
using Contracts.Requests;
using MapsterMapper;
using MediatR;
using Carter;

namespace Api.Endpoints;

public class ToDoItemEndpoints : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("todo-items").RequireAuthorization();

        group.MapPost("", CreateTodoListItem);
        group.MapDelete("{id:guid}", RemoveTodoListItem);
        group.MapPut("{id:guid}/toggle", ToggleTodoListItem);
    }
    
    private async Task<IResult> CreateTodoListItem(ISender sender,
        IMapper mapper,
        CreateTodoItemRequest request)
    {
        var command = mapper.Map<CreateTodoItemCommand>(request);
        var result = await sender.Send(command);
        
        return result.Match(
            value => Results.Ok(
                mapper.Map<TodoListResponse>(value)),
            ApiEndpoints.Problem);
    }
    
    private async Task<IResult> RemoveTodoListItem([FromRoute] Guid id,
        ISender sender,
        IMapper mapper)
    {
        var command = new RemoveTodoItemCommand(id);

        var result = await sender.Send(command);

        return result.Match(
            value => Results.Ok(mapper.Map<TodoListResponse>(value)),
            ApiEndpoints.Problem);
    }
    
    private async Task<IResult> ToggleTodoListItem([FromRoute] Guid id,
        ISender sender,
        IMapper mapper)
    {
        var command = new ToggleTodoItemCommand(id);

        var result = await sender.Send(command);

        return result.Match(
            value => Results.Ok(mapper.Map<TodoItemResponse>(value)),
            ApiEndpoints.Problem);
    }
}