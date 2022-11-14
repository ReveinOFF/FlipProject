using Core.Entity.UserEntitys;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entity
{
    public abstract class BaseCommentary : BaseEntity
    {
        /* Information */
        [Required]
        [MaxLength(100)]
        public string Text { get; set; }
        [Required]
        public DateTime DateCreate { get; set; }

        /* The person who wrote the commentary */
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }
    }
}
