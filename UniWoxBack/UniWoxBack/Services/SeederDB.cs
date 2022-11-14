using Core.Entity.UserEntitys;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using UniWoxBack.Constans;

namespace UniWoxBack.Services
{
    public static class SeederDB
    {
        public static void SeedDB(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = scope.ServiceProvider
                    .GetRequiredService<DataBase>();

                //context.Database.Migrate();

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
            }
        }
    }
}
