using Microsoft.EntityFrameworkCore;

namespace miniproject.Models
{
    public class DatabaseContext : DbContext
    {

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
       public DbSet<TrainingRequest> TrainingRequests {get; set;}
        public DbSet<TrainerRaiseRequest>  TrainerRaiseRequests {get; set;}

        public DbSet<AssignedTable> assignedTable { get; set; }

    }
}
