using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTO.Account
{
    public class ChangeEmailDTO
    {
        public string NewEmail { get; set; }
        public string OldEmail { get; set; }
    }
}
