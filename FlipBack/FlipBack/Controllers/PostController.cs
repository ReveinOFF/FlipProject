using AutoMapper;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FlipBack.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly DataBase _context;
        private readonly IMapper _mapper;

        public PostController(DataBase context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}
