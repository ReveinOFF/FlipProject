using Core.DTO.Twilio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Twilio.Rest.Api.V2010.Account;

namespace Core.Interface
{
    public interface ITwilioService
    {
        Task<MessageResource> SendSmsAsync(TwilioMessage message);
    }
}
