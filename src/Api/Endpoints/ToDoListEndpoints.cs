using Application.ToDoLists.Commands.CreateTodoList;
using Application.ToDoLists.Commands.RemoveTodoList;
using Application.ToDoLists.Queries;
using Contracts.Responses.TodoLists;
using Microsoft.AspNetCore.Mvc;
using MapsterMapper;
using MediatR;
using Carter;

namespace Api.Endpoints;

public class ToDoListController : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("todo-lists")
            .RequireAuthorization();

        group.MapGet("", GetUserTodoLists);
        group.MapPost("{title}", CreateTodoList);
        group.MapDelete("{id:guid}", RemoveTodoList);
    }
    
    private async Task<IResult> GetUserTodoLists(ISender sender,
        IMapper mapper)
    {
        var query = new GetTodoListsQuery();

        var result = await sender.Send(query);

        return result.Match(
            value => Results.Ok(
                mapper.Map<GetTodoListsResponse>(value)),
            ApiEndpoints.Problem);
    }
    
    private async Task<IResult> CreateTodoList([FromRoute]string title,
        ISender sender,
        IMapper mapper)
    {
        var command = new CreateTodoListCommand(title);

        var result = await sender.Send(command);
        
        return result.Match(
            value => Results.Ok(
                mapper.Map<TodoListResponse>(value)),
            ApiEndpoints.Problem);
    }
    
    private async Task<IResult> RemoveTodoList([FromRoute] Guid id,
        ISender sender,
        IMapper mapper)
    {
        var command = new RemoveTodoListCommand(id);

        var result = await sender.Send(command);
        
        return result.Match(
            value => Results.Ok(
                mapper.Map<RemoveTodoListResponse>(value)),
            ApiEndpoints.Problem);
    }
}