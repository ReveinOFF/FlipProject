using AutoMapper;
using Core.DTO.Account;
using Core.Entity.UserEntitys;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
