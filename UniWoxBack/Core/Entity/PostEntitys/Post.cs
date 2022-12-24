﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Core.Entity.UserEntitys;

namespace Core.Entity.PostEntitys
{
    [Index(nameof(Images), IsUnique = true),
     Index(nameof(Videos), IsUnique = true)]
    public class Post : BaseEntity
    {
        /* Information */
        [Required]
        [MaxLength(20)]
        public string Description { get; set; }
        public string[] Images { get; set; }
        public string[] Videos { get; set; }
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

        /* All users who saved their post */
        public virtual ICollection<UserPost> Saveds { get; set; }

        /* All user reactions (like/dislike) */
        public virtual ICollection<PostReaction> Reactions { get; set; }

        /* All user comments */
        public virtual ICollection<PostCommentary> Commentary { get; set; }
    }
}
