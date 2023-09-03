using Application.ToDoLists.Commands.CreateTodoList;
using Application.ToDoLists.Commands.RemoveTodoList;
using Microsoft.AspNetCore.Authorization;
using Application.ToDoLists.Queries;
using Contracts.Responses.TodoLists;
using Microsoft.AspNetCore.Mvc;
using MapsterMapper;
using MediatR;

namespace Api.Controllers;

[Authorize]
[Route("todos")]
public class ToDoController : ApiController
{
    private readonly IMapper _mapper;
    private readonly ISender _sender;

    public ToDoController(IMapper mapper, ISender sender)
    {
        _mapper = mapper;
        _sender = sender;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetUserTodoLists()
    {
        var query = new GetTodoListsQuery();

        var result = await _sender.Send(query);

        return result.Match(
            value => Ok(_mapper.Map<GetTodoListsResponse>(value)),
            Problem);
    }

    [HttpPost("create/{title}")]
    public async Task<IActionResult> CreateTodoList([FromRoute]string title)
    {
        var command = new CreateTodoListCommand(title);

        var result = await _sender.Send(command);
        
        return result.Match(
            value => Ok(_mapper.Map<TodoListResponse>(value)),
            Problem);
    }

    [HttpDelete("remove/{id}")]
    public async Task<IActionResult> RemoveTodoList([FromRoute] Guid id)
    {
        var command = new RemoveTodoListCommand(id);

        var result = await _sender.Send(command);
        
        return result.Match(
            value => Ok(_mapper.Map<RemoveTodoListResponse>(value)),
            Problem);
    }
}