using Core.Entity.MessageEntitys;
using Core.Entity.PostEntitys;
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

            modelBuilder.Entity<MessageBoxUser>(reaction =>
            {
                reaction.HasKey(x => new { x.UserId, x.MessageBoxId });

                reaction.HasOne(x => x.User)
                    .WithMany(y => y.MessageBoxs)
                    .HasForeignKey(z => z.UserId);

                reaction.HasOne(x => x.MessageBox)
                    .WithMany(y => y.Users)
                    .HasForeignKey(z => z.MessageBoxId);
            });
        }

        /* Post */
        public virtual DbSet<Post> Post { get; set; }
        public virtual DbSet<PostFiles> PostFiles { get; set; }
        public virtual DbSet<UserPost> UserPost { get; set; }
        public virtual DbSet<PostReaction> PostReaction { get; set; }
        public virtual DbSet<PostCommentary> PostCommentary { get; set; }
        public virtual DbSet<PostAnswer> PostAnswer { get; set; }

        /* User */
        public virtual DbSet<Follow> Follows { get; set; }

        /* Message */
        public virtual DbSet<Message> Message { get; set; }
        public virtual DbSet<MessageFiles> MessageFiles { get; set; }
        public virtual DbSet<MessageBox> MessageBox { get; set; }
        public virtual DbSet<MessageBoxUser> MessageBoxUsers { get; set; }
    }
}