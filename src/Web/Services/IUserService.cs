using Web.Models.Requests;
using Web.Models.Responses;
using OneOf;

namespace Web.Services;

public interface IUserService
{
    Task<OneOf<RegisterResponse, ErrorResponse>> Register(RegisterRequest request);
    Task<OneOf<LoginResponse, ErrorResponse>> Login(LoginRequest request);
}