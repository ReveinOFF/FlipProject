using Core.Entity.PostEntitys;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entity.UserEntitys
{
    public class ImageReaction
    {
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        [ForeignKey("UserImages")]
        public string ImageId { get; set; }
        public virtual UserImages Image { get; set; }

        public bool IsLike { get; set; }
    }
}
