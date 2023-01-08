using System.ComponentModel.DataAnnotations;

namespace Core.Entity
{
    public class BaseFiles : BaseEntity
    {
        [Required]
        public string PathName { get; set; }
        [Required]
        public string FileName { get; set; }
    }
}
