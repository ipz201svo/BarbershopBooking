namespace BarbershopBooking.Application.Common.Models;

public class CommandResult<T>
{
    public T? Data { get; }

    public IEnumerable<string>? Errors { get; }
    
    public bool Succeeded => !Errors?.Any() ?? true;

    public static CommandResult<T> Failure(IEnumerable<string> errors) => new(errors);

    public static CommandResult<T> Success(T data) => new(data);

    private CommandResult(IEnumerable<string> errors) => Errors = errors;
    
    private CommandResult(T data) => Data = data;
}
