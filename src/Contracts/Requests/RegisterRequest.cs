namespace Contracts.Requests;

public record RegisterRequest(
    string Email,
    string Password,
    string Username);