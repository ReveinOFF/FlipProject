using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace FlipBack.Helpers
{
    public class CustomUserIdProvider : IUserIdProvider
    {
        public virtual string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.FindFirst("UserId")?.Value;
        }
    }
}
