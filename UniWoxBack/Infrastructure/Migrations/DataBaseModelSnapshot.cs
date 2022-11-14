﻿// <auto-generated />
using System;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(DataBase))]
    partial class DataBaseModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Core.Entity.MessageEntitys.Message", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("text");

                    b.Property<string>("Audio")
                        .HasColumnType("text");

                    b.Property<DateTime>("DateSender")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Images")
                        .HasColumnType("text");

                    b.Property<bool>("IsEdited")
                        .HasColumnType("boolean");

                    b.Property<string>("MessageBoxId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("MessageText")
                        .HasColumnType("text");

                    b.Property<string>("SenderName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Audio")
                        .IsUnique();

                    b.HasIndex("Id")
                        .IsUnique();

                    b.HasIndex("Images")
                        .IsUnique();

                    b.HasIndex("MessageBoxId");

                    b.HasIndex("UserId");

                    b.ToTable("Message");
                });

            modelBuilder.Entity("Core.Entity.MessageEntitys.MessageBox", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("text");

                    b.Property<string>("Image")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.HasIndex("Image")
                        .IsUnique();

                    b.ToTable("MessageBox");
                });

            modelBuilder.Entity("Core.Entity.PostEntitys.Post", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("text");

                    b.Property<DateTime>("DatePosted")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("Images")
                        .HasColumnType("text");

                    b.Property<bool>("IsBlocked")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsPremium")
                        .HasColumnType("boolean");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Videos")
                        .HasColumnType("text");

                    b.Property<int>("Views")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.HasIndex("Images")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.HasIndex("Videos")
                        .IsUnique();

                    b.ToTable("Post");
                });

            modelBuilder.Entity("Core.Entity.PostEntitys.PostAnswer", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("text");

                    b.Property<string>("CommentaryId")
                        .HasColumnType("text");

                    b.Property<DateTime>("DateCreate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CommentaryId");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("PostAnswer");
                });

            modelBuilder.Entity("Core.Entity.PostEntitys.PostCommentary", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("text");

                    b.Property<DateTime>("DateCreate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("PostId")
                        .HasColumnType("text");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.HasIndex("PostId");

                    b.HasIndex("UserId");

                    b.ToTable("PostCommentary");
                });

            modelBuilder.Entity("Core.Entity.PostEntitys.PostReaction", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("PostId")
                        .HasColumnType("text");

                    b.Property<bool>("IsLike")
                        .HasColumnType("boolean");

                    b.HasKey("UserId", "PostId");

                    b.HasIndex("PostId");

                    b.ToTable("PostReaction");
                });

            modelBuilder.Entity("Core.Entity.PostEntitys.UserPost", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("PostId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "PostId");

                    b.HasIndex("PostId");

                    b.ToTable("UserPost");
                });

            modelBuilder.Entity("Core.Entity.UserEntitys.Follow", b =>
                {
                    b.Property<string>("FollowerUserId")
                        .HasColumnType("text");

                    b.Property<string>("FollowingUserId")
                        .HasColumnType("text");

                    b.HasKey("FollowerUserId", "FollowingUserId");

                    b.HasIndex("FollowingUserId");

                    b.ToTable("Follows");
                });

            modelBuilder.Entity("Core.Entity.UserEntitys.ImageAnswer", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("text");

                    b.Property<string>("CommentaryId")
                        .HasColumnType("text");

                    b.Property<DateTime>("DateCreate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CommentaryId");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("ImageAnswer");
                });

            modelBuilder.Entity("Core.Entity.UserEntitys.ImageCommentary", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("text");

                    b.Property<DateTime>("DateCreate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("ImageId")
                        .HasColumnType("text");

                    b.Property<string>("ImagesId")
                        .HasColumnType("text");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.HasIndex("ImagesId");

                    b.HasIndex("UserId");

                    b.ToTable("ImageCommentary");
                });

            modelBuilder.Entity("Core.Entity.UserEntitys.ImageReaction", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("ImageId")
                        .HasColumnType("text");

                    b.Property<bool>("IsLike")
                        .HasColumnType("boolean");

                    b.HasKey("UserId", "ImageId");

                    b.HasIndex("ImageId");

                    b.ToTable("ImageReaction");
                });

            modelBuilder.Entity("Core.Entity.UserEntitys.Role", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Core.Entity.UserEntitys.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<DateTime>("DateCreate")
                        .HasColumnType("date");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("date");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsPrivateUser")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsVerified")
                        .HasColumnType("boolean");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("character varying(15)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("UserGif")
                        .HasColumnType("text");

                    b.Property<string>("UserImage")
                        .HasColumnType("text");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.HasIndex("PhoneNumber")
                        .IsUnique();

                    b.HasIndex("UserGif")
                        .IsUnique();

                    b.HasIndex("UserImage")
                        .IsUnique();

                    b.HasIndex("UserName")
                        .IsUnique();

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Core.Entity.UserEntitys.UserImages", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Views")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.HasIndex("Image")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("UserImages");
                });

            modelBuilder.Entity("Core.Entity.UserEntitys.UserRole", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("MessageBoxUser", b =>
                {
                    b.Property<string>("MessageBoxsId")
                        .HasColumnType("text");

                    b.Property<string>("UsersId")
                        .HasColumnType("text");

                    b.HasKey("MessageBoxsId", "UsersId");

                    b.HasIndex("UsersId");

                    b.ToTable("MessageBoxUser");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("text");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("Core.Entity.MessageEntitys.Message", b =>
                {
                    b.HasOne("Core.Entity.MessageEntitys.MessageBox", "MessageBox")
                        .WithMany("Messages")
                        .HasForeignKey("MessageBoxId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entity.UserEntitys.User", "User")
                        .WithMany("Message")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("MessageBox");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entity.PostEntitys.Post", b =>
                {
                    b.HasOne("Core.Entity.UserEntitys.User", "User")
                        .WithMany("CreatedPosts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entity.PostEntitys.PostAnswer", b =>
                {
                    b.HasOne("Core.Entity.PostEntitys.PostCommentary", "Commentary")
                        .WithMany("PostAnswers")
                        .HasForeignKey("CommentaryId");

                    b.HasOne("Core.Entity.UserEntitys.User", "User")
                        .WithMany("PostAnswer")
                        .HasForeignKey("UserId");

                    b.Navigation("Commentary");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entity.PostEntitys.PostCommentary", b =>
                {
                    b.HasOne("Core.Entity.PostEntitys.Post", "Post")
                        .WithMany("Commentary")
                        .HasForeignKey("PostId");

                    b.HasOne("Core.Entity.UserEntitys.User", "User")
                        .WithMany("PostCommentary")
                        .HasForeignKey("UserId");

                    b.Navigation("Post");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entity.PostEntitys.PostReaction", b =>
                {
                    b.HasOne("Core.Entity.PostEntitys.Post", "Post")
                        .WithMany("Reactions")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entity.UserEntitys.User", "User")
                        .WithMany("PostReaction")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entity.PostEntitys.UserPost", b =>
                {
                    b.HasOne("Core.Entity.PostEntitys.Post", "Post")
                        .WithMany("Saveds")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entity.UserEntitys.User", "User")
                        .WithMany("SavedPosts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entity.UserEntitys.Follow", b =>
                {
                    b.HasOne("Core.Entity.UserEntitys.User", "FollowerUser")
                        .WithMany("Followers")
                        .HasForeignKey("FollowerUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entity.UserEntitys.User", "FollowingUser")
                        .WithMany("Followings")
                        .HasForeignKey("FollowingUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FollowerUser");

                    b.Navigation("FollowingUser");
                });

            modelBuilder.Entity("Core.Entity.UserEntitys.ImageAnswer", b =>
                {
                    b.HasOne("Core.Entity.UserEntitys.ImageCommentary", "Commentary")
                        .WithMany("ImageAnswers")
                        .HasForeignKey("CommentaryId");

                    b.HasOne("Core.Entity.UserEntitys.User", "User")
                        .WithMany("ImageAnswer")
                        .HasForeignKey("UserId");

                    b.Navigation("Commentary");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entity.UserEntitys.ImageCommentary", b =>
                {
                    b.HasOne("Core.Entity.UserEntitys.UserImages", "Images")
                        .WithMany("Commentary")
                        .HasForeignKey("ImagesId");

                    b.HasOne("Core.Entity.UserEntitys.User", "User")
                        .WithMany("ImageCommentary")
                        .HasForeignKey("UserId");

                    b.Navigation("Images");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entity.UserEntitys.ImageReaction", b =>
                {
                    b.HasOne("Core.Entity.UserEntitys.UserImages", "Image")
                        .WithMany("Reaction")
                        .HasForeignKey("ImageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entity.UserEntitys.User", "User")
                        .WithMany("ImageReaction")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Image");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entity.UserEntitys.UserImages", b =>
                {
                    b.HasOne("Core.Entity.UserEntitys.User", "User")
                        .WithMany("UserImages")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entity.UserEntitys.UserRole", b =>
                {
                    b.HasOne("Core.Entity.UserEntitys.Role", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entity.UserEntitys.User", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("MessageBoxUser", b =>
                {
                    b.HasOne("Core.Entity.MessageEntitys.MessageBox", null)
                        .WithMany()
                        .HasForeignKey("MessageBoxsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entity.UserEntitys.User", null)
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Core.Entity.UserEntitys.Role", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Core.Entity.UserEntitys.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Core.Entity.UserEntitys.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Core.Entity.UserEntitys.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Core.Entity.MessageEntitys.MessageBox", b =>
                {
                    b.Navigation("Messages");
                });

            modelBuilder.Entity("Core.Entity.PostEntitys.Post", b =>
                {
                    b.Navigation("Commentary");

                    b.Navigation("Reactions");

                    b.Navigation("Saveds");
                });

            modelBuilder.Entity("Core.Entity.PostEntitys.PostCommentary", b =>
                {
                    b.Navigation("PostAnswers");
                });

            modelBuilder.Entity("Core.Entity.UserEntitys.ImageCommentary", b =>
                {
                    b.Navigation("ImageAnswers");
                });

            modelBuilder.Entity("Core.Entity.UserEntitys.Role", b =>
                {
                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("Core.Entity.UserEntitys.User", b =>
                {
                    b.Navigation("CreatedPosts");

                    b.Navigation("Followers");

                    b.Navigation("Followings");

                    b.Navigation("ImageAnswer");

                    b.Navigation("ImageCommentary");

                    b.Navigation("ImageReaction");

                    b.Navigation("Message");

                    b.Navigation("PostAnswer");

                    b.Navigation("PostCommentary");

                    b.Navigation("PostReaction");

                    b.Navigation("SavedPosts");

                    b.Navigation("UserImages");

                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("Core.Entity.UserEntitys.UserImages", b =>
                {
                    b.Navigation("Commentary");

                    b.Navigation("Reaction");
                });
#pragma warning restore 612, 618
        }
    }
}
