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
