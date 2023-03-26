using Core.Entity.UserEntitys;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.History
{
    public class History : BaseEntity
    {
        [Required]
        public DateTime Expires { get; set; }
        [Required]
        public DateTime DateCreate { get; set; }
        [Required]
        public string PathName { get; set; }
        [Required]
        public string FileName { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        public virtual ICollection<HistoryReaction> Reactions { get; set; }
    }
}
