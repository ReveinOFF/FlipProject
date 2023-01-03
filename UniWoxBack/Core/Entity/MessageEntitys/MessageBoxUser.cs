using Core.Entity.UserEntitys;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.MessageEntitys
{
    public class MessageBoxUser
    {
        [ForeignKey("MessageBox")]
        public string MessageBoxId { get; set; }
        public MessageBox MessageBox { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
