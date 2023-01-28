using Core.DTO.Mail;

namespace Core.Interface
{
    public interface IMailService
    {
        Task<bool> SendEmailAsync(MailDataDTO mail);
    }
}
