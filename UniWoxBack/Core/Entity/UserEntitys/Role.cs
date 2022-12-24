using Microsoft.AspNetCore.Identity;

namespace Core.Entity.UserEntitys
{
    public class Role : IdentityRole
    {
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
