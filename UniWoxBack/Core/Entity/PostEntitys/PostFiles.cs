using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.PostEntitys
{
    public class PostFiles : BaseFiles
    {
        [ForeignKey("Post")]
        public string PostId { get; set; }
        public Post Post { get; set; }
    }
}
