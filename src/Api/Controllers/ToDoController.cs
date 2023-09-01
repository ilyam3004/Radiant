using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Authorize]
[Route("todos")]
public class ToDoController : ApiController
{
    [HttpPost]
    public IActionResult CreateTodoList()
    {
        return Ok();
    }
}