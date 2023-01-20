using Core.Entity.UserEntitys;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using System.Data;
using UniWoxBack.Constans;

namespace UniWoxBack.Services
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
                        Name = Roles.Manager
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
                    string[] role = { Roles.Admin, Roles.Manager, Roles.User };

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

                    var user2 = new User
                    {
                        Name = "Roman1",
                        UserName = "ronnieplay2",
                        DateCreate = DateOnly.FromDateTime(DateTime.Now.Date),
                        Email = "ronnieplayyt2@gmail.com",
                        PhoneNumber = "+380977852312",
                        IsVerified = true,
                        IsPrivateUser = false,
                        EmailConfirmed = true
                    };
                    var result2 = userManager.CreateAsync(user2).Result;
                    result2 = userManager.AddPasswordAsync(user2, "romap310103").Result;
                    result2 = userManager.AddToRolesAsync(user2, role).Result;

                    var user3 = new User
                    {
                        Name = "Roman3",
                        UserName = "ronnieplay3",
                        DateCreate = DateOnly.FromDateTime(DateTime.Now.Date),
                        Email = "ronnieplayyt3@gmail.com",
                        PhoneNumber = "+380977852318",
                        IsVerified = true,
                        IsPrivateUser = false,
                        EmailConfirmed = true
                    };
                    var result3 = userManager.CreateAsync(user3).Result;
                    result3 = userManager.AddPasswordAsync(user3, "romap310103").Result;
                    result3 = userManager.AddToRolesAsync(user3, role).Result;
                }
            }
        }
    }
}
