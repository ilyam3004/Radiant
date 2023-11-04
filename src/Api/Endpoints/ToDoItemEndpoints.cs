using Application.ToDoItems.Commands.RemoveTodoItem;
using Application.ToDoItems.Commands.ToggleTodoItem;
using Application.ToDoItems.Commands.CreateTodoItem;
using Application.ToDoItems.Commands.UpdateTodoItem;
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

        group.MapPost("", CreateTodoItem);
        group.MapDelete("{id:guid}", RemoveTodoItem);
        group.MapPut("{id:guid}/toggle", ToggleTodoListItem);
        group.MapPatch("", UpdateTodoItem);
    }

    private async Task<IResult> CreateTodoItem(ISender sender,
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

    private async Task<IResult> UpdateTodoItem(UpdateTodoItemRequest request,
        ISender sender,
        IMapper mapper)
    {
        var command = mapper.Map<UpdateTodoItemCommand>(request);

        var result = await sender.Send(command);

        return result.Match(
            value => Results.Ok(mapper.Map<TodoItemResponse>(value)),
            ApiEndpoints.Problem);
    }

    private async Task<IResult> RemoveTodoItem([FromRoute] Guid id,
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