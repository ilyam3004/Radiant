using Application.ToDoLists;
using Application.ToDoLists.Commands;
using Contracts.Responses.TodoLists;
using Domain.Entities;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

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

    [HttpPost("create/{title}")]
    public async Task<IActionResult> CreateTodoList([FromRoute]string title)
    {
        var command = new CreateTodoListCommand(title);

        var result = await _sender.Send(command);
        
        return result.Match(
            value => Ok(_mapper.Map<CreateTodoListResponse>(value)),
            Problem);
    }
}