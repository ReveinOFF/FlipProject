using Core.Entity.UserEntitys;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.History
{
    public class HistoryReaction
    {
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        [ForeignKey("History")]
        public string HistoryId { get; set; }
        public virtual History History { get; set; }
    }
}
