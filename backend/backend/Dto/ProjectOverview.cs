using backend.Models;

namespace backend.Dto
{
    public class ProjectOverview
    {

        public List<Project> AllProjects { get; set; } = new List<Project>();
        public List<Invite> Invites { get; set; } = new List<Invite>();
    }
}
