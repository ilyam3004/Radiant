namespace Web.Models.Response;

public record ErrorResponse(
    string Type, 
    string Title, 
    int Status, 
    string TraceId, 
    string? Detail,
    Dictionary<string, string[]>? Errors);
