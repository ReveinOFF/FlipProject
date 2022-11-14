using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entity.UserEntitys
{
    public class Follow
    {
        public string FollowerUserId { get; set; }
        public virtual User FollowerUser { get; set; }

        public string FollowingUserId { get; set; }
        public virtual User FollowingUser { get; set; }
    }
}
