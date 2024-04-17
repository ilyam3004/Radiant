using FluentValidation;

namespace Application.ToDoLists.Commands.CreateTodoList;

public class CreateTodoListCommandValidator : AbstractValidator<CreateTodoListCommand>
{
    public CreateTodoListCommandValidator()
    {
        RuleFor(x => x.Title)
            .NotNull()
            .NotEmpty()
            .MaximumLength(40)
            .WithMessage("Title should be not empty and less than 40 characters");
    }
}