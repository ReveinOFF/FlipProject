using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interface
{
    public interface IValidatorRepository
    {
        public bool UniqueEmail(string email);
        public bool UniquePhone(string phone);
        public bool UniqueName(string name);
        public bool UniqueUserName(string userName);
    }
}
