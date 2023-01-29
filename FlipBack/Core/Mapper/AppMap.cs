using AutoMapper;
using Core.DTO.Account;
using Core.DTO.Post;
using Core.DTO.Reels;
using Core.DTO.User;
using Core.Entity.PostEntitys;
using Core.Entity.ReelsEntity;
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
                .ForMember(x => x.CreatedPost, y => y.MapFrom(x => x.CreatedPosts.Select(x => x.Files.Select(y => y.FileName)).ToList()));
            CreateMap<User, GetUsersDTO>();

            CreateMap<Reels, GetReelsDTO>()
                .ForMember(x => x.CommentaryCount, y => y.MapFrom(x => x.Commentary.Count))
                .ForMember(x => x.AnswerCount, y => y.MapFrom(x => x.Commentary.Select(s => s.ReelsAnswers).Count()))
                .ForMember(x => x.ReactionCount, y => y.MapFrom(x => x.Reactions.Count))
                .ForMember(x => x.Files, y => y.MapFrom(x => x.Files.Select(y => y.FileName).ToList()));
        }
    }
}
