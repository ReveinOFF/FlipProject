using Core.Entity.PostEntitys;
using Core.Entity.UserEntitys;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using FlipBack.Constans;

namespace FlipBack.Services
{
    public static class SeederDB
    {
        public static void SeedDB(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<DataBase>();

                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();

                if (!roleManager.Roles.Any())
                {
                    var result = roleManager.CreateAsync(new Role
                    {
                        Name = Roles.User
                    }).Result;
                    result = roleManager.CreateAsync(new Role
                    {
                        Name = Roles.Premium
                    }).Result;
                    result = roleManager.CreateAsync(new Role
                    {
                        Name = Roles.Admin
                    }).Result;
                    result = roleManager.CreateAsync(new Role
                    {
                        Name = Roles.Blocked
                    }).Result;
                }
                if (!userManager.Users.Any())
                {
                    string[] role = { Roles.Admin, Roles.User };

                    var user = new User
                    {
                        Name = "Roman",
                        UserName = "ronnieplay",
                        DateCreate = DateOnly.FromDateTime(DateTime.Now.Date),
                        Email = "ronnieplayyt@gmail.com",
                        PhoneNumber = "+380977852315",
                        IsVerified = true,
                        IsPrivateUser = false,
                        EmailConfirmed = true
                    };
                    var result = userManager.CreateAsync(user).Result;
                    result = userManager.AddPasswordAsync(user, "romap310103").Result;
                    result = userManager.AddToRolesAsync(user, role).Result;
                }
                if (!context.Post.Any())
                {
                    var post = new Post
                    {
                        DatePosted = DateTime.UtcNow,
                        Description = "Hello guys!",
                        Views = 5,
                        UserId = userManager.Users.First().Id,
                        Files = new List<PostFiles> {
                            new PostFiles
                            {
                                PathName = "C:\\Users\\ronni\\OneDrive\\Рабочий стол\\UniWoxProject\\UniWoxBack\\UniWoxBack\\Resources\\PostFiles\\Default\\326220733_101528259503704_5705990945816496097_n.jpg",
                                FileName = "326220733_101528259503704_5705990945816496097_n.jpg"
                            }
                        }
                    };
                    var post2 = new Post
                    {
                        DatePosted = DateTime.UtcNow,
                        Description = "Hello people!",
                        Views = 64,
                        UserId = userManager.Users.First().Id,
                        Files = new List<PostFiles> {
                            new PostFiles
                            {
                                PathName = "C:\\Users\\ronni\\OneDrive\\Рабочий стол\\UniWoxProject\\UniWoxBack\\UniWoxBack\\Resources\\PostFiles\\Default\\326220733_101528259503704_5705990945816496097_n.jpg",
                                FileName = "326220733_101528259503704_5705990945816496097_n.jpg"
                            }
                        }
                    };
                    var post3 = new Post
                    {
                        DatePosted = DateTime.UtcNow,
                        Description = "My new post!",
                        Views = 1,
                        UserId = userManager.Users.First().Id,
                        Files = new List<PostFiles> {
                            new PostFiles
                            {
                                PathName = "C:\\Users\\ronni\\OneDrive\\Рабочий стол\\UniWoxProject\\UniWoxBack\\UniWoxBack\\Resources\\PostFiles\\Default\\326220733_101528259503704_5705990945816496097_n.jpg",
                                FileName = "326220733_101528259503704_5705990945816496097_n.jpg"
                            }
                        }
                    };

                    context.Post.AddRange(post, post2, post3);
                    context.SaveChanges();
                }
            }
        }
    }
}
