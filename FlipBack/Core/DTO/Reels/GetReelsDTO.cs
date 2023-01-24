using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTO.Reels
{
    public class GetReelsDTO
    {
        public string Id { get; set; }
        public string Description { get; set; }
        public DateTime DatePosted { get; set; }
        public int Views { get; set; }
        public int CommentaryCount { get; set; }
        public int AnswerCount { get; set; }
        public int ReactionCount { get; set; }
        public IEnumerable<string> Files { get; set; }
    }
}
