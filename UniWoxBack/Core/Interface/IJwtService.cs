using Core.Entity.UserEntitys;

namespace Core.Interface
{
    public interface IJwtService
    {
        public string CreateToken(User user);
    }
}
