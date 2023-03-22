using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.UserEntitys
{
    public class UsersAuthentications : BaseEntity
    {
        public string IpAddress { get; set; }
        public string CountryName { get; set; }
        public string CountryCode { get; set; }
        public string City { get; set; }
        public string UserAgent { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }
    }
}
