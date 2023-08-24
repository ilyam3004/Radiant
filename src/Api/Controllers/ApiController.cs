using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class ApiController : ControllerBase
{
    protected IActionResult Problem()
    {
        return Problem();
    }
}