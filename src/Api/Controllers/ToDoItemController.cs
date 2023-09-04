using Application.ToDoItems.Commands.RemoveTodoItem;
using Application.ToDoItems.Commands.ToggleTodoItem;
using Application.ToDoItems.Commands;
using Microsoft.AspNetCore.Authorization;
using Contracts.Responses.TodoLists;
using Microsoft.AspNetCore.Mvc;
using Contracts.Requests;
using MapsterMapper;
using MediatR;

namespace Api.Controllers;

[Authorize]
[Route("todo-items")]
public class ToDoItemController : ApiController
{
    private readonly IMapper _mapper;
    private readonly ISender _sender;

    public ToDoItemController(IMapper mapper, ISender sender)
    {
        _mapper = mapper;
        _sender = sender;
    }
    
    [HttpPost("create")]
    public async Task<IActionResult> CreateTodoListItem(CreateTodoItemRequest request)
    {
        var command = _mapper.Map<CreateTodoItemCommand>(request);
        var result = await _sender.Send(command);
        
        return result.Match(
            value => Ok(_mapper.Map<TodoListResponse>(value)),
            Problem);
    }

    [HttpDelete("remove/{id}")]
    public async Task<IActionResult> RemoveTodoListItem([FromRoute] Guid id)
    {
        var command = new RemoveTodoItemCommand(id);

        var result = await _sender.Send(command);

        return result.Match(
            value => Ok(_mapper.Map<TodoListResponse>(value)),
            Problem);
    }
    
    [HttpPut("{id}/toggle")]
    public async Task<IActionResult> ToggleTodoListItem([FromRoute] Guid id)
    {
        var command = new ToggleTodoItemCommand(id);

        var result = await _sender.Send(command);

        return result.Match(
            value => Ok(_mapper.Map<TodoItemResponse>(value)),
            Problem);
    } 
}