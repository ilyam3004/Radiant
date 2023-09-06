namespace Web.Models.Response;

public class ErrorResponse
{
    public string Type { get; init; }
    public string Title { get; init; }
    public int Status { get; init; }
    public string TraceId { get; init; }
    public Dictionary<string, string[]> Errors { get; init; }
}
