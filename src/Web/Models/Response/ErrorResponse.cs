namespace Web.Models.Response;

public class ErrorResponse
{
    public string Type { get; init; }  = null!;
    public string Title { get; init; }  = null!;
    public int Status { get; init; }
    public string TraceId { get; init; } = null!;
    public string? Detail { get; init; }
    public Dictionary<string, string[]>? Errors { get; init; }
}
