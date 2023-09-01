using Application.Authentication.Commands;
using Application.Authentication.Queries;
using Application.Models;
using Contracts.Requests;
using Contracts.Responses;
using Mapster;

namespace Api.Common.Mapping;

public class AuthenticationMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<LoginRequest, LoginQuery>();
        
        config.NewConfig<RegisterRequest, RegisterCommand>();
        
        config.NewConfig<RegisterResult, RegisterResponse>()
            .Map(dest => dest, src => src.User);
        
        config.NewConfig<LoginResult, LoginResponse>()
            .Map(dest => dest, src => src.User);
    }
}