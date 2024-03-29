﻿using Core.Entity.History;
using Core.Entity.MessageEntitys;
using Core.Entity.Notification;
using Core.Entity.PostEntitys;
using Core.Entity.ReelsEntity;
using Core.Entity.UserEntitys;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class DataBase : IdentityDbContext<User, Role, string, IdentityUserClaim<string>,
        UserRole, IdentityUserLogin<string>,
        IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public DataBase(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            /* Role settings */
            modelBuilder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(r => r.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(r => r.UserId)
                    .IsRequired();
            });

            /* Friend settings */
            modelBuilder.Entity<Follow>(user =>
            {
                user.HasKey(x => new { x.FollowingId, x.FollowerId });

                user.HasOne(x => x.Following)
                    .WithMany(x => x.Followers)
                    .HasForeignKey(x => x.FollowerId)
                    .OnDelete(DeleteBehavior.Restrict);

                user.HasOne(x => x.Follower)
                    .WithMany(x => x.Followings)
                    .HasForeignKey(x => x.FollowingId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            /* Save post settings */
            modelBuilder.Entity<UserPost>(user =>
            {
                user.HasKey(key => new { key.UserId, key.PostId });
            });

            /* Save reels settings */
            modelBuilder.Entity<UserReels>(user =>
            {
                user.HasKey(key => new { key.UserId, key.ReelsId });
            });

            /* Setting up post reactions */
            modelBuilder.Entity<PostReaction>(reaction =>
            {
                reaction.HasKey(x => new { x.UserId, x.PostId });

                reaction.HasOne(x => x.User)
                    .WithMany(y => y.PostReaction)
                    .HasForeignKey(z => z.UserId);

                reaction.HasOne(x => x.Post)
                    .WithMany(y => y.Reactions)
                    .HasForeignKey(z => z.PostId);
            });

            /* Setting up reels reactions */
            modelBuilder.Entity<ReelsReaction>(reaction =>
            {
                reaction.HasKey(x => new { x.UserId, x.ReelsId });

                reaction.HasOne(x => x.User)
                    .WithMany(y => y.ReelsReaction)
                    .HasForeignKey(z => z.UserId);

                reaction.HasOne(x => x.Reels)
                    .WithMany(y => y.Reactions)
                    .HasForeignKey(z => z.ReelsId);
            });

            /* Setting up history reactions */
            modelBuilder.Entity<HistoryReaction>(reaction =>
            {
                reaction.HasKey(x => new { x.UserId, x.HistoryId });

                reaction.HasOne(x => x.User)
                    .WithMany(y => y.HistoryReactions)
                    .HasForeignKey(z => z.UserId);

                reaction.HasOne(x => x.History)
                    .WithMany(y => y.Reactions)
                    .HasForeignKey(z => z.HistoryId);
            });

            /* Setting up notification */
            modelBuilder.Entity<Notification>(reaction =>
            {
                reaction.HasOne(x => x.Sender)
                    .WithMany(y => y.SendNotifications)
                    .HasForeignKey(z => z.SenderId);

                reaction.HasOne(x => x.Recipient)
                    .WithMany(y => y.ReceivedNotifications)
                    .HasForeignKey(z => z.RecipientId);

            });

            /* Setting up notification */
            modelBuilder.Entity<ReactionCommentary>(reaction =>
            {
                reaction.HasKey(x => new { x.UserId, x.CommentaryId });

                reaction.HasOne(x => x.Commentary)
                    .WithMany(y => y.ReactionCommentary)
                    .HasForeignKey(z => z.CommentaryId);

                reaction.HasOne(x => x.User)
                    .WithMany(y => y.ReactionCommentary)
                    .HasForeignKey(z => z.UserId);

            });
        }

        /* Post */
        public virtual DbSet<Post> Post { get; set; }
        public virtual DbSet<PostFiles> PostFiles { get; set; }
        public virtual DbSet<UserPost> UserPost { get; set; }
        public virtual DbSet<PostReaction> PostReaction { get; set; }
        public virtual DbSet<ReactionCommentary> ReactionCommentaries { get; set; }
        public virtual DbSet<PostCommentary> PostCommentary { get; set; }
        public virtual DbSet<PostAnswer> PostAnswer { get; set; }

        /* Reels */
        public virtual DbSet<Reels> Reels { get; set; }
        public virtual DbSet<ReelsFiles> ReelsFiles { get; set; }
        public virtual DbSet<UserReels> UserReels { get; set; }
        public virtual DbSet<ReelsReaction> ReelsReaction { get; set; }
        public virtual DbSet<ReelsCommentary> ReelsCommentary { get; set; }
        public virtual DbSet<ReelsAnswer> ReelsAnswer { get; set; }

        /* User */
        public virtual DbSet<Follow> Follows { get; set; }
        public virtual DbSet<RefreshToken> RefreshTokens { get; set; }
        public virtual DbSet<UsersAuthentications> Authentications { get; set; }

        /* Message */
        public virtual DbSet<Message> Message { get; set; }
        public virtual DbSet<MessageFiles> MessageFiles { get; set; }
        public virtual DbSet<MessageBox> MessageBox { get; set; }

        /* History */
        public virtual DbSet<History> Histories { get; set; }
        public virtual DbSet<HistoryReaction> HistoryReactions { get; set; }

        /* Notification */
        public virtual DbSet<Notification> Notification { get; set; }
    }
}