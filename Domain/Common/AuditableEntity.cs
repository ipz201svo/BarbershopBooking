namespace BarbershopBooking.Domain.Common;

public abstract class AuditableEntity
{
    public DateTime Created { get; init; }

    public string? CreatedBy { get; init; }

    public DateTime? LastModified { get; init; }

    public string? LastModifiedBy { get; init; }
}
