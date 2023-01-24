using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.ReelsEntity
{
    public class ReelsFiles : BaseFiles
    {
        [ForeignKey("Reels")]
        public string ReelsId { get; set; }
        public Reels Reels { get; set; }
    }
}
