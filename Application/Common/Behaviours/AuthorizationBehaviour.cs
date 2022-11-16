using BarbershopBooking.Application.Common.Exceptions;
using BarbershopBooking.Application.Common.Interfaces;
using BarbershopBooking.Application.Common.Security;
using MediatR;
using System.Reflection;

namespace BarbershopBooking.Application.Common.Behaviours;

public class AuthorizationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull, IRequest<TResponse>
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IIdentityService _identityService;

    public AuthorizationBehaviour(ICurrentUserService currentUserService, IIdentityService identityService)
    {
        _currentUserService = currentUserService;
        _identityService = identityService;
    }

    public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
    {
        var authorizeAttributes = request.GetType().GetCustomAttributes<AuthorizeAttribute>();

        if (!authorizeAttributes.Any())
        {
            return await next();
        }

        if (_currentUserService.UserId == null)
        {
            throw new UnauthorizedAccessException();
        }

        await AuthorizeWithRoles(authorizeAttributes);
        await AuthorizeWithPolicies(authorizeAttributes);

        return await next();
    }

    private async Task AuthorizeWithPolicies(IEnumerable<AuthorizeAttribute> authorizeAttributes)
    {
        var authorizeAttributesWithPolicies = authorizeAttributes.Where(a => !string.IsNullOrWhiteSpace(a.Policy));

        if (authorizeAttributesWithPolicies.Any())
        {
            foreach (var policy in authorizeAttributesWithPolicies.Select(a => a.Policy))
            {
                var authorized = await _identityService.AuthorizeAsync(_currentUserService.UserId, policy);

                if (!authorized)
                    throw new ForbiddenAccessException();
            }
        }
    }

    private async Task AuthorizeWithRoles(IEnumerable<AuthorizeAttribute> authorizeAttributes)
    {
        var authorizeAttributesWithRoles = authorizeAttributes.Where(a => !string.IsNullOrWhiteSpace(a.Roles));

        if (authorizeAttributesWithRoles.Any())
        {
            var authorized = false;

            foreach (var roles in authorizeAttributesWithRoles.Select(a => a.Roles.Split(',', StringSplitOptions.TrimEntries)))
            {
                foreach (var role in roles)
                {
                    var isInRole = await _identityService.IsInRoleAsync(_currentUserService.UserId, role);
                    if (isInRole)
                    {
                        authorized = true;
                        break;
                    }
                }

                if (!authorized)
                    throw new ForbiddenAccessException();
            }
        }
    }
}
