namespace backend.Models
{
    public class Project
    {
        public int Id { get; set; }

        public string CreatedBy { get; set; }

        public string ProjectName { get; set; } = "";


        public DateTime? Created { get; set; }

        public int OpenTickets { get; set; }

    }


}