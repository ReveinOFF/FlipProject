using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Core.Entity.UserEntitys
{
    [Index(nameof(Image), IsUnique = true)]
    public class UserImages : BaseEntity
    {
        /* Information */
        [Required]
        public string Image { get; set; }
        public string Description { get; set; }
        [Required]
        public int Views { get; set; }

        /* Who owns the image */
        [Required]
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        /* All image reactions (like/dislike) */
        public virtual ICollection<ImageReaction> Reaction { get; set; }

        /* All user comments */
        public virtual ICollection<ImageCommentary> Commentary { get; set; }
    }
}
