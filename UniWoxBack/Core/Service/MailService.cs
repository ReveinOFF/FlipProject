using Core.DTO.Mail;
using Core.Interface;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Core.Service
{
    public class MailService : IMailService
    {
        private readonly MailSettingsDTO _mailSettings;

        public MailService(IOptions<MailSettingsDTO> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }

        public async Task<bool> SendEmailAsync(MailDataDTO mail)
        {
            try
            {
                var email = new MimeMessage();
                var builder = new BodyBuilder();

                email.From.Add(MailboxAddress.Parse(_mailSettings.From));
                email.To.Add(MailboxAddress.Parse(mail.To));
                email.Subject = mail.Subject;
                
                builder.HtmlBody = mail.Body;
                email.Body = builder.ToMessageBody();

                using var smtp = new SmtpClient();

                smtp.Connect(_mailSettings.Host, _mailSettings.Port, true);
                smtp.Authenticate(_mailSettings.From, _mailSettings.Password);

                await smtp.SendAsync(email);
                smtp.Disconnect(true);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
