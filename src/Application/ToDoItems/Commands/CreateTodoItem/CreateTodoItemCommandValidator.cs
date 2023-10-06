using FluentValidation;

namespace Application.ToDoItems.Commands.CreateTodoItem;

public class CreateTodoItemCommandValidator : AbstractValidator<CreateTodoItemCommand>
{
    public CreateTodoItemCommandValidator()
    {
        RuleFor(x => x.Priority)
            .NotEmpty()
            .NotNull()
            .WithMessage("Priority is required");

        RuleFor(x => x.Note)
            .NotEmpty()
            .NotNull()
            .MaximumLength(255)
            .WithMessage("Note should be not empty and less than 255 characters");
    }
}