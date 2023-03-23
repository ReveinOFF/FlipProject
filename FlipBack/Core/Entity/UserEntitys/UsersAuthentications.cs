using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.UserEntitys
{
    public class UsersAuthentications : BaseEntity
    {
        public string IpAddress { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string Device { get; set; }
        public string Browser { get; set; }
        public string Location { get; set; }
        public DateTime LastOnline { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }
    }
}
