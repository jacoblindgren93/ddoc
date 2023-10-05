namespace backend.Models
{
    public class Ticket
    {

        public int Id { get; set; }

        public int ProjectId { get; set; }

        public string Title { get; set; } = string.Empty;

        public TicketState STATE { get; set; }

        public string Description { get; set; } = string.Empty;

        public string Author { get; set; } = string.Empty;

        public DateTime Created { get; set; }

        public DateTime TimeInState { get; set; }
    }

    public enum TicketState
    {
        Open,
        InProgress,
        Done
    }
}
