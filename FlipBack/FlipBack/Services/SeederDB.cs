using Core.Entity.PostEntitys;
using Core.Entity.UserEntitys;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using FlipBack.Constans;
using System.Security.Claims;

namespace FlipBack.Services
{
    public static class SeederDB
    {
        public static void SeedDB(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
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
                        Email = "ronnieplayyt2@gmail.com",
                        PhoneNumber = "+380977852315",
                        IsVerified = true,
                        IsPrivateUser = false,
                        EmailConfirmed = true
                    };
                    var result = userManager.CreateAsync(user, "romap310103").Result;
                    result = userManager.AddToRolesAsync(user, role).Result;
                }
            }
        }
    }
}
