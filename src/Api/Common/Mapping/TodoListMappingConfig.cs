using Application.Models.TodoLists;
using Contracts.Responses.TodoLists;
using Mapster;

namespace Api.Common.Mapping;

public class TodoListMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<CreateTodoListResult, TodoListResponse>()
            .Map(dest => dest, src => src.TodoList)
            .Map(dest => dest.TodoItems, src => src.TodoList.TodoItems);
    }
}