using Humanizer;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using System.Security.Cryptography.Xml;

namespace backend.Models
{
    public class ProjectMember
    {
        public int Id { get; set; }

        public int Project { get; set; }

        public string UserName { get; set; }

        public string Team { get; set; }

        public string Role { get; set; }

    }
}
