using System.ComponentModel.DataAnnotations;

namespace miniproject.Models
{
    public class TrainingRequest
    {

        [Key]
        public int Id { get; set; }

       

        public string? semail { get; set; }

        public string? skill { get; set; } 

        public DateTime startdate { get; set; }
        public DateTime enddate { get; set; }
        public string time { get; set; }
        public string trainer { get; set; }
        public string temail { get; set; }
        public string venue { get; set; }

        public int rating { get; set; }

        public string assigned  { get; set; }



    }
}
