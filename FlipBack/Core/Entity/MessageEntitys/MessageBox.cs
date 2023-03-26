using Core.Entity.UserEntitys;
using Microsoft.EntityFrameworkCore;

namespace Core.Entity.MessageEntitys
{
    public class MessageBox : BaseEntity
    {
        public DateTime LastSendMessage { get; set; }
        /* Users who are in Chat */
        public ICollection<User> Users { get; set; }

        /* Messages who are in Chat */
        public ICollection<Message> Messages { get; set; }
    }
}
