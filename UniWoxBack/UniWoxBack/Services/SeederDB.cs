using Core.Entity.UserEntitys;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
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
                    var user = new User
                    {
                        Name = "Roman",
                        Surname = "Pomianovskiy",
                        UserName = "ronnieplay",
                        Email = "ronnieplayyt@gmail.com",
                        IsVerified= true
                    };
                    var result = userManager.CreateAsync(user).Result;
                    result = userManager.AddPasswordAsync(user, "romap310103").Result;
                    result = userManager.AddToRoleAsync(user, Roles.Admin).Result;
                }
            }
        }
    }
}
