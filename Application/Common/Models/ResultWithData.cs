namespace BarbershopBooking.Application.Common.Models;

public class ResultWithData<T> : Result
{
    public T? Data { get; set; }
    
    public ResultWithData(bool succeeded, IEnumerable<string> errors, T data) : base(succeeded, errors)
    {
        Data = data;
    }

    public static ResultWithData<T> Success(T data)
    {
        return new ResultWithData<T>(true, Array.Empty<string>(), data);
    }

    public new static ResultWithData<T> Failure(IEnumerable<string> errors)
    {
        return new ResultWithData<T>(false, errors, default);
    }

    public CommandResult<T> ToCommandResult()
    {
        return Succeeded ? CommandResult<T>.Success(Data) : CommandResult<T>.Failure(Errors);
    }
}
