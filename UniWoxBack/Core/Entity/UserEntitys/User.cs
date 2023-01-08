using Core.Entity.MessageEntitys;
using Core.Entity.PostEntitys;
using Core.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
        public string UserImagePath { get; set; }
        [Required]
        [MaxLength(10)]
        public string Name { get; set; }
        [Required]
        [MaxLength(15)]
        public string Surname { get; set; }
        public string Description { get; set; }
        [Required]
        [JsonConverter(typeof(DateOnlyConverter))]
        public DateOnly DateCreate { get; set; }
        [JsonConverter(typeof(DateOnlyConverter))]
        public DateOnly DateOfBirth { get; set; }
        [Required]
        public bool IsVerified { get; set; }
        [Required]
        public bool IsPrivateUser { get; set; }
        public string RefreshToken { get; set; }

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
        public virtual ICollection<MessageBoxUser> MessageBoxs { get; set; }

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

        /* Friends */
        public virtual ICollection<Follow> Followers { get; set; }
        public virtual ICollection<Follow> Followings { get; set; }
    }
}
