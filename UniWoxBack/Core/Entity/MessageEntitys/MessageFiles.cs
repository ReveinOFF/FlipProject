using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.MessageEntitys
{
    public class MessageFiles : BaseFiles
    {
        [ForeignKey("Message")]
        public string MessageId { get; set; }
        public Message Message { get; set; }
    }
}
