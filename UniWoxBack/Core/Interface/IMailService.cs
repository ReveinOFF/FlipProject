using AutoMapper.Internal;
using Core.DTO.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interface
{
    public interface IMailService
    {
        Task<bool> SendEmailAsync(MailDataDTO mail);
    }
}
