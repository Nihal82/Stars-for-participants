using System.ComponentModel.DataAnnotations;

namespace miniproject.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? firstName { get; set; }
        [Required]

        public string? lastName { get; set; }
        [Required]
        public string? gender { get; set; }
        [Required]
        public DateTime dob { get; set; }
        [Required]
        public string? email { get; set; }
        [Required]
        public string contact { get; set; }
        [Required]
        public string? usertype { get; set; }
        [Required]
        public string? pass { get; set; }

        public string? skills { get; set; } 
   
       


    }
}
