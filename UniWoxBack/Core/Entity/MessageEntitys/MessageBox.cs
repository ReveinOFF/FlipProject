﻿using Core.Entity.UserEntitys;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.MessageEntitys
{
    [Index(nameof(Image), IsUnique = true)]
    public class MessageBox : BaseEntity
    {
        /* Information */
        public string Name { get; set; }
        public string Image { get; set; }

        /* Users who are in Chat */
        public ICollection<User> Users { get; set; }

        /* Messages who are in Chat */
        public ICollection<Message> Messages { get; set; }
    }
}
