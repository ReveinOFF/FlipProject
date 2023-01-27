using Core.DTO.Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace Core.Interface
{
    public interface ITwilioService
    {
        Task<MessageResource> SendSmsAsync(TwilioMessage message);
    }
}
