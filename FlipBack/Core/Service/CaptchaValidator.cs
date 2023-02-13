using Core.DTO.Account;
using Core.Interface;
using Microsoft.Extensions.Configuration;
using System.Net;

namespace Core.Service
{
    public class CaptchaValidator : ICaptchaValidator
    {
        private readonly IConfiguration _configuration;

        public CaptchaValidator(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public bool IsCaptchaPassedAsync(string token)
        {
            var client = new WebClient();

            string PrivateKey = _configuration.GetValue<string>("ReCaptcha:SecretKey");
            string requestComm = string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", PrivateKey, token);
            var GoogleReply = client.DownloadString(requestComm);

            var captchaResponse = Newtonsoft.Json.JsonConvert.DeserializeObject<RecaptchaResponseDTO>(GoogleReply);

            if (captchaResponse.Success)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
