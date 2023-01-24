using Core.DTO.Twilio;
using Core.Interface;
using Twilio.Clients;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace Core.Service
{
    public class TwilioService : ITwilioService
    {
        private readonly ITwilioRestClient _client;

        public TwilioService(ITwilioRestClient client)
        {
            _client = client;
        }

        public async Task<MessageResource> SendSmsAsync(TwilioMessage message)
        {
            var result = await MessageResource.CreateAsync(
                to: new PhoneNumber(message.To),
                from: new PhoneNumber(message.From),
                body: message.Message,
                client: _client);

            return result;
        }
    }
}
