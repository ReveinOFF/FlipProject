using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entity
{
    [Index(nameof(Id), IsUnique = true)]
    public abstract class BaseEntity
    {
        /*Constructor*/
        public BaseEntity()
        {
            Id = Guid.NewGuid().ToString();
        }

        /* Identity */
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
    }
}
