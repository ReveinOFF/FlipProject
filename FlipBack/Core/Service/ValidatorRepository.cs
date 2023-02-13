using Core.Entity.UserEntitys;
using Core.Interface;
using Microsoft.AspNetCore.Identity;

namespace Core.Service
{
    public class ValidatorRepository : IValidatorRepository
    {
        private readonly UserManager<User> _userManager;
        public ValidatorRepository(UserManager<User> userManager) 
        {
            _userManager = userManager;
        }

        public bool UniqueEmail(string email)
        {
            var user = _userManager.Users.Where(x => x.Email == email).FirstOrDefault();

            if (user == null)
                return true;

            return false;
        }

        public bool UniquePhone(string phone)
        {
            var user = _userManager.Users.Where(x => x.PhoneNumber == phone).FirstOrDefault();

            if (user == null)
                return true;

            return false;
        }

        public bool UniqueName(string name)
        {
            var user = _userManager.Users.Where(x => x.Name == name).FirstOrDefault();

            if (user == null)
                return true;

            return false;
        }

        public bool UniqueUserName(string userName)
        {
            var user = _userManager.Users.Where(x => x.UserName == userName).FirstOrDefault();

            if (user == null)
                return true;

            return false;
        }
    }
}
