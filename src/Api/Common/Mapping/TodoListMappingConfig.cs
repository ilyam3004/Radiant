using Contracts.Responses.TodoLists;
using Application.Models.TodoLists;
using Mapster;

namespace Api.Common.Mapping;

public class TodoListMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<TodoListResult, TodoListResponse>()
            .Map(dest => dest, src => src.TodoList)
            .Map(dest => dest.TodoItems, src => src.TodoList.TodoItems);

        config.NewConfig<TodoItemResult, TodoItemResponse>()
            .Map(dest => dest, src => src.TodoItem);
    }
}