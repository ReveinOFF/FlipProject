using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity
{
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
