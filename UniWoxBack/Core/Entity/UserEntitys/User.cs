using Core.Entity.MessageEntitys;
using Core.Entity.PostEntitys;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.UserEntitys
{
    [Index(nameof(UserImage), IsUnique = true),
     Index(nameof(UserName), IsUnique = true),
     Index(nameof(Email), IsUnique = true),
     Index(nameof(PhoneNumber), IsUnique = true)]
    public class User : IdentityUser
    {
        /* Information */
        public string UserImage { get; set; }
        [Required]
        [MaxLength(10)]
        public string Name { get; set; }
        [Required]
        [MaxLength(15)]
        public string Surname { get; set; }
        public string Description { get; set; }
        [Required]
        public DateOnly DateCreate { get; set; }
        public DateOnly DateOfBirth { get; set; }
        [Required]
        public bool IsVerified { get; set; }
        [Required]
        public bool IsPrivateUser { get; set; }

        /* NotMapped */
        [NotMapped]
        public string FullName
        {
            get
            {
                return Surname + " " + Name;
            }
        }

        /* Communication Room */
        public virtual ICollection<MessageBox> MessageBoxs { get; set; }

        /* All user messages */
        public virtual ICollection<Message> Message { get; set; }

        /* All created posts */
        public virtual ICollection<Post> CreatedPosts { get; set; }

        /* All user roles */
        public virtual ICollection<UserPost> SavedPosts { get; set; }

        /* All post reactions (like/dislike) */
        public virtual ICollection<PostReaction> PostReaction { get; set; }

        /* All post comments */
        public virtual ICollection<PostCommentary> PostCommentary { get; set; }

        /* All post answer */
        public virtual ICollection<PostAnswer> PostAnswer { get; set; }

        /* All created posts */
        public virtual ICollection<UserRole> UserRoles { get; set; }

        /* The list of images in the user */
        public virtual ICollection<UserImages> UserImages { get; set; }

        /* All image reactions (like/dislike) */
        public virtual ICollection<ImageReaction> ImageReaction { get; set; }

        /* All image comments */
        public virtual ICollection<ImageCommentary> ImageCommentary { get; set; }

        /* All image answer */
        public virtual ICollection<ImageAnswer> ImageAnswer { get; set; }

        /* Friends */
        public virtual ICollection<Follow> Followers { get; set; }
        public virtual ICollection<Follow> Followings { get; set; }
    }
}
