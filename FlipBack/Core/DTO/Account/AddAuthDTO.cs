using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTO.Account
{
    public class AddAuthDTO
    {
        public string UserId { get; set; }
        public string Browser { get; set; }
        public string Device { get; set; }
        public string Region { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Location { get; set; }
    }
}
