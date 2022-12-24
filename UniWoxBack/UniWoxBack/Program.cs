using Core.DTO.Mail;
using Core.DTO.Twilio;
using Core.Entity.UserEntitys;
using Core.Helpers;
using Core.Interface;
using Core.Mapper;
using Core.Service;
using Core.Validators;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Twilio.Clients;
using UniWoxBack.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddDbContext<Infrastructure.Data.DataBase>(optionsAction => optionsAction.UseNpgsql(builder.Configuration.GetConnectionString("sqlDb")));
//builder.Services.AddDbContext<Infrastructure.Data.DataBase>(optionsAction => optionsAction.UseNpgsql(builder.Configuration.GetConnectionString("localDb")));
builder.Services.AddIdentity<User, Role>(options =>
{
    // Password settings.
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 8;

    // User settings.
    options.User.AllowedUserNameCharacters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._!";
    options.User.RequireUniqueEmail = true;
}).AddEntityFrameworkStores<Infrastructure.Data.DataBase>().AddDefaultTokenProviders();

builder.Services.AddAutoMapper(typeof(AppMap));

builder.Services.AddFluentValidation(x => {
    x.RegisterValidatorsFromAssemblyContaining<RegisterValidator>();
    x.RegisterValidatorsFromAssemblyContaining<LoginValidator>();
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("JwtOptions"));
builder.Services.Configure<MailSettingsDTO>(builder.Configuration.GetSection("MailSettings"));
builder.Services.Configure<TwilioVerifySettings>(builder.Configuration.GetSection("Twilio"));
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddTransient<IMailService, MailService>();
builder.Services.AddTransient<ITwilioService, TwilioService>();
builder.Services.AddHttpClient<ITwilioRestClient, TwilioClient>();
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var dir = Path.Combine(Directory.GetCurrentDirectory(), "Resources");
if (!Directory.Exists(dir))
{
    Directory.CreateDirectory(dir);
    Directory.CreateDirectory(Path.Combine(dir, "UserImage"));
}
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(dir),
    RequestPath = "/resources"
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.SeedDB();

app.Run();
