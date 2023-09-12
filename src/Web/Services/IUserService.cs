using Contracts.Responses;
using Web.Models.Requests;
using Web.Models.Response;
using OneOf;

namespace Web.Services;

public interface IUserService
{
    Task<OneOf<RegisterResponse, ErrorResponse>> Register(RegisterRequest request);
    Task<OneOf<LoginResponse, ErrorResponse>> Login(LoginRequest request);
}