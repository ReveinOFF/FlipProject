using Microsoft.Extensions.FileProviders;

namespace UniWoxBack.Services
{
    public static class CreateDirectory
    {
        public static void CreatePath(this IApplicationBuilder app)
        {
            var dir = Path.Combine(Directory.GetCurrentDirectory(), "Resources");
            if (!Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
                Directory.CreateDirectory(Path.Combine(dir, "UserFiles"));
                Directory.CreateDirectory(Path.Combine(dir, "PostFiles"));
                Directory.CreateDirectory(Path.Combine(dir, "MessageFiles"));
            }
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(dir),
                RequestPath = "/resources"
            });
        }
    }
}
