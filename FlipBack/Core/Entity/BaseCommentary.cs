﻿using Core.Entity.UserEntitys;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Core.Entity
{
    public class BaseCommentary : BaseEntity
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
