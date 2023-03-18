using AutoMapper;
using Core.DTO.Post;
using Core.DTO.Reels;
using Core.DTO.User;
using Core.Entity.PostEntitys;
using Core.Helpers;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlipBack.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly DataBase _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;

        public PostController(DataBase context, IMapper mapper, IWebHostEnvironment env)
        {
            _context = context;
            _mapper = mapper;
            _env = env;
        }

        [HttpGet("get-posts")]
        public async Task<IActionResult> GetPosts()
        {
            var posts = await _context.Post
                .Include(i => i.Files)

                .Include(i => i.Commentary)
                .ThenInclude(t => t.User)

                .Include(i => i.Commentary)
                .ThenInclude(t => t.PostAnswers)
                .ThenInclude(t => t.User)

                .Include(i => i.Reactions)
                .ThenInclude(t => t.User)

                .OrderByDescending(o => o.DatePosted)

                .ToListAsync();

            if (posts == null)
                return BadRequest("The post was not found!");

            var mappost = _mapper.Map<List<GetPostDTO>>(posts);

            return Ok(mappost);
        }

        [HttpGet("get-post/{id}")]
        public async Task<IActionResult> GetPostById(string id)
        {
            var post = await _context.Post
                .Where(i => i.Id == id)
                .Include(i => i.Files)

                .Include(i => i.Commentary)
                .ThenInclude(t => t.User)

                .Include(i => i.Commentary)
                .ThenInclude(t => t.PostAnswers)
                .ThenInclude(t => t.User)

                .Include(i => i.Reactions)
                .ThenInclude(t => t.User)

                .FirstOrDefaultAsync();
            if (post == null)
                return BadRequest("This post was not found!");

            var mappost = _mapper.Map<GetPostDTO>(post);

            return Ok(mappost);
        }

        [HttpPost("add-post")]
        public async Task<IActionResult> AddPost([FromForm] PostDTO postDTO)
        {
            var post = _mapper.Map<Post>(postDTO);

            string fileDestDir = Path.Combine("Resources", "PostFiles", post.Id);

            post.Files = new List<PostFiles>();

            foreach (var item in postDTO.Files)
            {
                var file = await StaticFiles.CreateFileAsync(_env, fileDestDir, item);

                post.Files.Add(new PostFiles { PathName = file.FilePath, FileName = file.FileName, PostId = post.Id });
            }

            post.DatePosted = DateTime.UtcNow;
            post.UserId = "ddceebbc-f59b-4a99-9c31-99d2e8fa3795";

            await _context.Post.AddAsync(post);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("delete-post/{id}")]
        public async Task<IActionResult> DeletePost(string id)
        {
            var post = await _context.Post.Where(x => x.Id == id).FirstOrDefaultAsync();
            var postsSave = await _context.UserPost.Where(x => x.PostId == id).ToListAsync();
            var postsReaction = await _context.PostReaction.Where(x => x.PostId == id).ToListAsync();
            var postsCommentary = await _context.PostCommentary.Include(x => x.PostAnswers).Where(x => x.PostId == id).ToListAsync();
            var postsAnswer = await _context.PostCommentary.Include(x => x.PostAnswers).Where(x => x.PostId == id).SelectMany(x => x.PostAnswers).ToListAsync();
            var postFiles = await _context.PostFiles.Where(x => x.PostId == id).ToListAsync();

            if (post == null)
                return BadRequest("This post was not found!");

            if (postFiles != null)
                postFiles.ForEach(item => StaticFiles.DeleteFileAsync(item.PathName));

            _context.Post.Remove(post);
            _context.UserPost.RemoveRange(postsSave);
            _context.PostReaction.RemoveRange(postsReaction);
            _context.PostCommentary.RemoveRange(postsCommentary);
            _context.PostAnswer.RemoveRange(postsAnswer);
            _context.PostFiles.RemoveRange(postFiles);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("change-post")]
        public async Task<IActionResult> ChangePost(PostChangeDTO changeDTO)
        {
            var post = await _context.Post.Where(x => x.Id == changeDTO.Id).FirstOrDefaultAsync();

            if (post == null)
                return BadRequest("This reels was not found!");

            post.Description = changeDTO.Description;

            _context.Post.Update(post);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("add-reaction")]
        public async Task<IActionResult> AddReaction([FromBody] PostReactionDTO reactionDTO)
        {
            var postreaction = await _context.PostReaction.Where(x => x.UserId.Equals(reactionDTO.UserId) && x.PostId.Equals(reactionDTO.PostId)).FirstOrDefaultAsync();
            if (postreaction != null)
                return BadRequest("You've already put a reaction to this post!");

            await _context.PostReaction.AddAsync(new PostReaction { PostId = reactionDTO.PostId, UserId = reactionDTO.UserId });
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("remove/{UserId}/reaction/{PostId}")]
        public async Task<IActionResult> RemoveReaction(string UserId, string PostId)
        {
            var postreaction = await _context.PostReaction.Where(x => x.UserId.Equals(UserId) && x.PostId.Equals(PostId)).FirstOrDefaultAsync();
            if (postreaction == null)
                return BadRequest("Your reaction to this post is not there!");

            _context.PostReaction.Remove(postreaction);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("get-reaction/{postid}")]
        public async Task<IActionResult> GetUserReaction(string postid)
        {
            var reactionusers = await _context.Post
                .Where(x => x.Id == postid)
                .Include(i => i.Reactions)
                .ThenInclude(t => t.User)
                .SelectMany(x => x.Reactions.Select(x => x.User)).ToListAsync();
            if (reactionusers == null)
                return BadRequest("There are no reactions in this post!");

            var users = _mapper.Map<List<GetUsersDTO>>(reactionusers);

            return Ok(users);
        }

        [HttpPost("add-commentary")]
        public async Task<IActionResult> AddCommentary(PostCommentaryDTO commentaryDTO)
        {
            var map = _mapper.Map<PostCommentary>(commentaryDTO);
            map.DateCreate = DateTime.UtcNow;

            await _context.PostCommentary.AddAsync(map);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("delete-commentary/{postid}/{commid}")]
        public async Task<IActionResult> DeleteCommentary(string postid, string commid)
        {
            var comm = await _context.PostCommentary.Where(x => x.Id == commid && x.PostId == postid).FirstOrDefaultAsync();
            if (comm == null)
                return BadRequest("This commentary was not found!");

            _context.PostCommentary.Remove(comm);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("add-answer")]
        public async Task<IActionResult> AddAnswer(PostAnswerDTO postDTO)
        {
            var map = _mapper.Map<PostAnswer>(postDTO);
            map.DateCreate = DateTime.UtcNow;

            await _context.PostAnswer.AddAsync(map);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("delete-answer/{commid}/{answerid}")]
        public async Task<IActionResult> DeleteAnswer(string commid, string answerid)
        {
            var answer = await _context.PostAnswer.Where(x => x.Id == answerid && x.CommentaryId == commid).FirstOrDefaultAsync();

            if (answer == null)
                return BadRequest("This answer was not found!");

            _context.PostAnswer.Remove(answer);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
