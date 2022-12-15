using AutoMapper;
using Core.DTO.Account;
using Core.Entity.UserEntitys;
using Core.Helpers;
using Core.Interface;
using Core.Service;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.Win32;
using System.Text;

namespace UniWoxBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJwtService _jwtService;
        private readonly IMapper _mapper;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IJwtService jwtService, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
            _mapper = mapper;
        }

        [HttpPost("registration")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO register)
        {
            var user = _mapper.Map<User>(register);
            try
            {
                if (register.UserImage != null)
                {
                    string randomFilename = Path.GetRandomFileName() +
                        ".jpeg";
                    //string pathSaveImages = InitStaticFiles
                    //    .CreateImageByFileName(_env, _configuration,
                    //        new string[] { "Folder" },
                    //        randomFilename, register.UserImage, false, false);
                }
                else
                {
                    register.UserImage = "default.jpg";
                }

                var findEmail = await _userManager.FindByEmailAsync(register.Email);
                if (findEmail != null)
                {
                    return BadRequest(new { error = "Email already exists." });
                }

                var findLogin = await _userManager.FindByNameAsync(register.UserName);
                if (findLogin != null)
                {
                    return BadRequest(new { error = "Login already exists." });
                }

                if (register.Password != register.ConfirmPassword)
                {
                    return BadRequest(new { error = "Password does not match the confirm password." });
                }

                //var user = new User()
                //{
                //    UserName = register.UserName,
                //    Email = register.Email,
                //    Name = register.Name,
                //    Surname = register.Surname,
                //    UserImage = register.UserImage,
                //    PhoneNumber = register.Phone
                //};

                user.DateCreate = DateOnly.FromDateTime(DateTime.Now.Date);
                user.IsVerified = false;
                user.IsPrivateUser = false;

                var result = await _userManager.CreateAsync(user, register.Password);
                if (!result.Succeeded)
                {
                    return BadRequest(new { error = BuilderException(result) });
                }

                //var findUser = await _userManager.FindByNameAsync(register.UserName);
                //if (findUser == null) 
                //{
                //    //exeption
                //}
                var role = await _userManager.AddToRoleAsync(user, "User");
                if (!role.Succeeded)
                {
                    return BadRequest(new { error = BuilderException(result) });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> LogIn([FromBody] LoginDTO login)
        {
            string token = string.Empty;
            try
            {
                var user = await _userManager.FindByNameAsync(login.UserName);
                if (user == null)
                {
                    return BadRequest(new { error = "Error when searching for an account." });
                }
                if (!await _userManager.CheckPasswordAsync(user, login.Password))
                {
                    return BadRequest(new { error = "Error in password verification." });
                }

                token = _jwtService.CreateToken(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
            return Ok(new TokenDTO { Token = token});
        }

        [HttpPost("logout")]
        public async Task<IActionResult> LogOut()
        {
            try
            {
                await _signInManager.SignOutAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [NonAction]
        public string BuilderException(IdentityResult result)
        {
            StringBuilder stringBuilder = new StringBuilder();
            foreach (var error in result.Errors)
            {
                stringBuilder.AppendLine(error.Description);
            }

            return stringBuilder.ToString();
        }
    }
}
