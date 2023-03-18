using AutoMapper;
using Core.DTO.Account;
using Core.DTO.History;
using Core.DTO.Message;
using Core.DTO.Post;
using Core.DTO.Reels;
using Core.DTO.User;
using Core.Entity.History;
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
                .ForMember(x => x.File, y => y.MapFrom(x => x.Files.Select(s => s.FileName)));
            CreateMap<Post, GetPostDTO>()
                .ForMember(x => x.CommentaryCount, y => y.MapFrom(x => x.Commentary.Count))
                .ForMember(x => x.AnswerCount, y => y.MapFrom(x => x.Commentary.Select(s => s.PostAnswers).Count()))
                .ForMember(x => x.ReactionCount, y => y.MapFrom(x => x.Reactions.Count))
                .ForMember(x => x.File, y => y.MapFrom(x => x.Files.Select(s => s.FileName)))
                .ForMember(x => x.Answer, y => y.MapFrom(x => x.Commentary.SelectMany(s => s.PostAnswers)));
            CreateMap<PostDTO, Post>()
                .ForMember(x => x.Files, y => y.Ignore());
            CreateMap<PostCommentaryDTO, PostCommentary>();
            CreateMap<PostCommentary, PostGetCommentaryDTO>()
                .ForMember(x => x.Name, y => y.MapFrom(x => x.User.Name))
                .ForMember(x => x.Image, y => y.MapFrom(x => x.User.UserImage));
            CreateMap<PostAnswerDTO, PostAnswer>();
            CreateMap<PostAnswer, PostGetAnswerDTO>()
                .ForMember(x => x.Name, y => y.MapFrom(x => x.User.Name))
                .ForMember(x => x.Image, y => y.MapFrom(x => x.User.UserImage));

            CreateMap<Reels, GetReelsDTO>()
                .ForMember(x => x.CommentaryCount, y => y.MapFrom(x => x.Commentary.Count))
                .ForMember(x => x.AnswerCount, y => y.MapFrom(x => x.Commentary.Select(s => s.ReelsAnswers).Count()))
                .ForMember(x => x.ReactionCount, y => y.MapFrom(x => x.Reactions.Count))
                .ForMember(x => x.File, y => y.MapFrom(x => x.File.FileName))
                .ForMember(x => x.Answer, y => y.MapFrom(x => x.Commentary.SelectMany(s => s.ReelsAnswers)));
            CreateMap<ReelsDTO, Reels>()
                .ForMember(x => x.File, y => y.Ignore());
            CreateMap<ReelsCommentaryDTO, ReelsCommentary>();
            CreateMap<ReelsCommentary, ReelsGetCommentaryDTO>()
                .ForMember(x => x.Name, y => y.MapFrom(x => x.User.Name))
                .ForMember(x => x.Image, y => y.MapFrom(x => x.User.UserImage));
            CreateMap<ReelsAnswerDTO, ReelsAnswer>();
            CreateMap<ReelsAnswer, ReelsGetAnswerDTO>()
                .ForMember(x => x.Name, y => y.MapFrom(x => x.User.Name))
                .ForMember(x => x.Image, y => y.MapFrom(x => x.User.UserImage));

            CreateMap<MessageBox, GetMessageBoxDTO>()
                .ForMember(x => x.LastMessage, y => y.MapFrom(x => x.Messages.LastOrDefault()))
                .ForMember(x => x.UserImage, y => y.MapFrom(x => x.Users.LastOrDefault().UserImage))
                .ForMember(x => x.Name, y => y.MapFrom(x => x.Users.LastOrDefault().Name));
            CreateMap<Message, GetMessageDTO>()
                .ForMember(x => x.Files, y => y.MapFrom(x => x.Files.Select(s => s.FileName).ToList()));

            CreateMap<History, GetHistoryDTO>()
                .ForMember(x => x.Files, y => y.MapFrom(x => x.FileName))
                .ForMember(x => x.UserImage, y => y.MapFrom(x => x.User.UserImage))
                .ForMember(x => x.NameUser, y => y.MapFrom(x => x.User.Name));
        }
    }
}
