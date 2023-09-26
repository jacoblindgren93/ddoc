namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }

        public string UserName { get; set; } = String.Empty;

        public string Email { get; set; } = String.Empty;

        public bool IsVerified { get; set; } = false;

    }
}
