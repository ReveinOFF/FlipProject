using AutoMapper;
using Core.DTO.Account;
using Core.DTO.Message;
using Core.DTO.Reels;
using Core.DTO.User;
using Core.Entity.MessageEntitys;
using Core.Entity.PostEntitys;
using Core.Entity.ReelsEntity;
using Core.Entity.UserEntitys;

namespace Core.Mapper
{
    public class AppMap : Profile
    {
        public AppMap() 
        {
            CreateMap<RegisterDTO, User>()
                .ForMember(x => x.PhoneNumber, y => y.MapFrom(z => z.Phone));
            CreateMap<User, GetUserDTO>()
                .ForMember(x => x.Followers, y => y.MapFrom(x => x.Followers.Count))
                .ForMember(x => x.Followings, y => y.MapFrom(x => x.Followings.Count))
                .ForMember(x => x.CreatedPost, y => y.MapFrom(x => x.CreatedPosts.ToList()));
            CreateMap<User, GetUsersDTO>();
            CreateMap<User, GetFollowsDTO>();

            CreateMap<Post, GetCreatedPost>()
                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                .ForMember(x => x.File, y => y.MapFrom(x => x.Files.Select(s => s.FileName)));

            CreateMap<Reels, GetReelsDTO>()
                .ForMember(x => x.CommentaryCount, y => y.MapFrom(x => x.Commentary.Count))
                .ForMember(x => x.AnswerCount, y => y.MapFrom(x => x.Commentary.Select(s => s.ReelsAnswers).Count()))
                .ForMember(x => x.ReactionCount, y => y.MapFrom(x => x.Reactions.Count))
                .ForMember(x => x.Files, y => y.MapFrom(x => x.Files.Select(y => y.FileName).ToList()));

            CreateMap<MessageBox, GetMessageBoxDTO>()
                .ForMember(x => x.LastMessage, y => y.MapFrom(x => x.Messages.LastOrDefault()))
                .ForMember(x => x.UserImage, y => y.MapFrom(x => x.Users.LastOrDefault().UserImage))
                .ForMember(x => x.Name, y => y.MapFrom(x => x.Users.LastOrDefault().Name));
        }
    }
}
