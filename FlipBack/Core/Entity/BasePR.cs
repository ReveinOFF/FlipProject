using Core.Entity.UserEntitys;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Core.Entity
{
    public class BasePR : BaseEntity
    {
        /* Information */
        [Required]
        [MaxLength(20)]
        public string Description { get; set; }
        [Required]
        public DateTime DatePosted { get; set; }
        [Required]
        public int Views { get; set; }

        /* Role */
        [Required]
        public bool IsPremium { get; set; }
        [Required]
        public bool IsBlocked { get; set; }

        /* Creator */
        [Required]
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }
    }
}
