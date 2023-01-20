using AutoMapper;
using Core.DTO.Account;
using Core.DTO.User;
using Core.Entity.UserEntitys;

namespace Core.Mapper
{
    public class AppMap : Profile
    {
        public AppMap() 
        {
            CreateMap<RegisterDTO, User>();

            CreateMap<User, GetUserDTO>()
                .ForMember(x => x.Followers, y => y.MapFrom(x => x.Followers.Count))
                .ForMember(x => x.Followings, y => y.MapFrom(x => x.Followings.Count))
                .ForMember(x => x.CreatedPostCount, y => y.MapFrom(x => x.CreatedPosts.Count))
                .ForMember(x => x.CreatedPost, y => y.MapFrom(x => x.CreatedPosts.Select(x => x.Files.Select(y => y.PathName)).ToList()));

            CreateMap<User, GetUsersDTO>();
        }
    }
}
