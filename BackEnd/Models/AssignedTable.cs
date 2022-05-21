using System.ComponentModel.DataAnnotations;

namespace miniproject.Models
{
    public class AssignedTable
    {

        [Key]
        public int Id { get; set; }
        


        public string? TrainerName { get; set; }
      
        public string? temail { get; set; }
       
        public DateTime startDate { get; set; }
      
        public string? semail { get; set; }
       
        public string? status { get; set; }
      
        public int trainerRating  { get; set; } 
        public int traineeRating { get; set; }
 
        public string? messsage { get; set; }

        public string? time { get; set; }

        public string? venue { get; set; }

        public string? traineeName { get; set; }

        public string? skill { get; set; }
       


    }
}
