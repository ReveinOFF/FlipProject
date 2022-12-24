using AutoMapper;
using Core.DTO.Account;
using Core.Entity.UserEntitys;

namespace Core.Mapper
{
    public class AppMap : Profile
    {
        public AppMap() 
        {
            //Registraation
            CreateMap<RegisterDTO, User>()
                .ForMember(x => x.UserImage, opt => opt.Ignore());
        }
    }
}
