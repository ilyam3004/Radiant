using Domain.Entities;

namespace Application.Models;

public record RegisterResult(User User, string Token);