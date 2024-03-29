﻿using Core.Entity.History;
using Core.Entity.MessageEntitys;
using Core.Entity.PostEntitys;
using Core.Entity.ReelsEntity;
using Core.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Core.Entity.UserEntitys
{
    [Index(nameof(UserImage), IsUnique = true),
     Index(nameof(UserName), IsUnique = true),
     Index(nameof(Name), IsUnique = true),
     Index(nameof(Email), IsUnique = true),
     Index(nameof(PhoneNumber), IsUnique = true)]
    public class User : IdentityUser
    {
        /* Information */
        public string UserImage { get; set; }
        public string UserImagePath { get; set; }
        [Required]
        [MaxLength(15)]
        public string Name { get; set; }
        [MaxLength(50)]
        public string Description { get; set; }
        [Required]
        [JsonConverter(typeof(DateOnlyConverter))]
        public DateOnly DateCreate { get; set; }
        [Required]
        [JsonConverter(typeof(DateOnlyConverter))]
        public DateOnly DateOfBirth { get; set; }
        public bool IsVerified { get; set; }
        public bool IsPrivateUser { get; set; }


        /* Messages */
        public virtual ICollection<MessageBox> MessageBoxs { get; set; }
        public virtual ICollection<Message> Message { get; set; }

        /* Post */
        public virtual ICollection<Post> CreatedPosts { get; set; }
        public virtual ICollection<UserPost> SavedPosts { get; set; }
        public virtual ICollection<PostReaction> PostReaction { get; set; }
        public virtual ICollection<ReactionCommentary> ReactionCommentary { get; set; }
        public virtual ICollection<PostCommentary> PostCommentary { get; set; }
        public virtual ICollection<PostAnswer> PostAnswer { get; set; }

        /* Reels */
        public virtual ICollection<Reels> CreatedReels { get; set; }
        public virtual ICollection<UserReels> SavedReels { get; set; }
        public virtual ICollection<ReelsReaction> ReelsReaction { get; set; }
        public virtual ICollection<ReelsCommentary> ReelsCommentary { get; set; }
        public virtual ICollection<ReelsAnswer> ReelsAnswer { get; set; }

        /* User */
        public virtual ICollection<RefreshToken> RefreshTokens { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
        public virtual ICollection<Follow> Followers { get; set; }
        public virtual ICollection<Follow> Followings { get; set; }
        public virtual ICollection<User> Blocked { get; set; }
        public virtual ICollection<UsersAuthentications> Authentications { get; set; }

        /* History */
        public virtual ICollection<History.History> Histories { get; set; }
        public virtual ICollection<HistoryReaction> HistoryReactions { get; set; }

        /* Notification */
        public virtual ICollection<Notification.Notification> SendNotifications { get; set; }
        public virtual ICollection<Notification.Notification> ReceivedNotifications { get; set; }
    }
}
