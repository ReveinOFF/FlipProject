using Core.Entity.MessageEntitys;
using Core.Entity.PostEntitys;
using Core.Entity.UserEntitys;
using Core.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Text.RegularExpressions;

namespace Infrastructure.Data
{
    public class DataBase : IdentityDbContext<User, Role, string, IdentityUserClaim<string>,
        UserRole, IdentityUserLogin<string>,
        IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        /*Constructor*/
        public DataBase(DbContextOptions options) : base(options)
        {

        }

        protected override void ConfigureConventions(ModelConfigurationBuilder builder)
        {
            /* Convert properties DateOnly to column type date */
            builder.Properties<DateOnly>()
                .HaveConversion<DateOnlyConverter>()
                .HaveColumnType("date");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            ////Default values for User
            //modelBuilder.Entity<User>(user =>
            //{
            //    user.Property(x => x.UserImage).HasDefaultValue("default.jpg");
            //    user.Property(x => x.DateCreate).HasDefaultValue(DateOnly.FromDateTime(DateTime.Now.Date));
            //    user.Property(x => x.IsVerified).HasDefaultValue(false);
            //    user.Property(x => x.IsPrivateUser).HasDefaultValue(false);
            //});

            /* Array of image for Message */
            modelBuilder.Entity<Message>()
                .Property(e => e.Images)
                .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));

            /* Array of image for Post */
            modelBuilder.Entity<Post>()
                .Property(e => e.Images)
                .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));

            /* Array of video for Post */
            modelBuilder.Entity<Post>()
                .Property(e => e.Videos)
                .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));

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
                user.HasKey(x => new { x.FollowerUserId, x.FollowingUserId });

                user.HasOne(x => x.FollowerUser)
                    .WithMany(y => y.Followers)
                    .HasForeignKey(z => z.FollowerUserId);

                user.HasOne(x => x.FollowingUser)
                    .WithMany(y => y.Followings)
                    .HasForeignKey(z => z.FollowingUserId);
            });

            /* Save post settings */
            modelBuilder.Entity<UserPost>(user =>
            {
                user.HasKey(key => new { key.UserId, key.PostId });
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

            /* Post comment settings */
            //modelBuilder.Entity<PostCommentary>(coment =>
            //{
            //    coment.HasOne(x => x.User)
            //        .WithMany(y => y.PostCommentary)
            //        .HasForeignKey(z => z.UserId);

            //    coment.HasOne(x => x.Post)
            //        .WithMany(y => y.Commentary)
            //        .HasForeignKey(z => z.PostId);
            //});

            /* Image comment settings */
            modelBuilder.Entity<ImageReaction>(reaction =>
            {
                reaction.HasKey(x => new { x.UserId, x.ImageId });

                reaction.HasOne(x => x.User)
                    .WithMany(y => y.ImageReaction)
                    .HasForeignKey(z => z.UserId);

                reaction.HasOne(x => x.Image)
                    .WithMany(y => y.Reaction)
                    .HasForeignKey(z => z.ImageId);
            });
        }

        /* Post */
        public virtual DbSet<Post> Post { get; set; }
        public virtual DbSet<UserPost> UserPost { get; set; }
        public virtual DbSet<PostReaction> PostReaction { get; set; }
        public virtual DbSet<PostCommentary> PostCommentary { get; set; }
        public virtual DbSet<PostAnswer> PostAnswer { get; set; }

        /* User */
        public virtual DbSet<UserImages> UserImages { get; set; }
        public virtual DbSet<ImageReaction> ImageReaction { get; set; }
        public virtual DbSet<ImageCommentary> ImageCommentary { get; set; }
        public virtual DbSet<ImageAnswer> ImageAnswer { get; set; }
        public virtual DbSet<Follow> Follows { get; set; }

        /* Message */
        public virtual DbSet<Message> Message { get; set; }
        public virtual DbSet<MessageBox> MessageBox { get; set; }
    }
}
