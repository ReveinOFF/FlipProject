using Core.DTO.Mail;
using Core.DTO.Twilio;
using Core.Entity.UserEntitys;
using Core.Helpers;
using Core.Interface;
using Core.Mapper;
using Core.Service;
using Core.Validators.Account;
using Core.Validators.User;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Text.Json.Serialization;
using Twilio.Clients;
using UniWoxBack.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new DateOnlyConverter());
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});
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
    x.RegisterValidatorsFromAssemblyContaining<ConfirmPasswordValidator>();
    x.RegisterValidatorsFromAssemblyContaining<ConfirmEmailValidator>();

    x.RegisterValidatorsFromAssemblyContaining<ChangePasswordValidator>();
    x.RegisterValidatorsFromAssemblyContaining<ChangeUserValidator>();
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.MapType<DateOnly>(() => new OpenApiSchema
    {
        Type = "string",
        Format = "date",
        Example = new OpenApiString("2022-01-01")
    });
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("JwtOptions"));
builder.Services.Configure<MailSettingsDTO>(builder.Configuration.GetSection("MailSettings"));
builder.Services.Configure<TwilioVerifySettings>(builder.Configuration.GetSection("Twilio"));

builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddTransient<IMailService, MailService>();
builder.Services.AddTransient<ITwilioService, TwilioService>();
builder.Services.AddHttpClient<ITwilioRestClient, TwilioClient>();

builder.Services.AddCors();

var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("JwtOptions:Key").Value));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(cfg =>
{
    cfg.RequireHttpsMetadata = false;
    cfg.SaveToken = true;
    cfg.TokenValidationParameters = new TokenValidationParameters()
    {
        IssuerSigningKey = signingKey,
        ValidateAudience = false,
        ValidateIssuer = false,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true
    };
});

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

app.CreatePath();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.SeedDB();

app.Run();