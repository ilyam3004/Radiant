namespace Application.Models.Authentication;

public record AuthRequest(
    string Email, 
    Guid UserId);