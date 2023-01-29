using Core.Helpers;
using Microsoft.AspNetCore.Http;
using System.Text.Json.Serialization;

namespace Core.DTO.Account
{
    public class RegisterDTO
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public IFormFile UserImage { get; set; }
        public string Phone { get; set; }
        [JsonConverter(typeof(DateOnlyConverter))]
        public DateOnly DateOfBirth { get; set; }
        public string Password { get; set; }

        public string RecaptchaToken { get; set; }
    }
}
