using backend.DataAccess;
using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProjectController : ControllerBase
    {

        private readonly DbAccess dbAccess;
        private readonly IConfiguration _config;

        public ProjectController(IConfiguration config)
        {
            _config = config;
            dbAccess= new DbAccess(config);
        }
        
        [HttpGet]
        public async Task<ProjectOverview> Get()
        {

            string sql = "SELECT * FROM ProjectMembers WHERE Username = @Username;";

            //Getting all projects:
            string usaNama = this.User.FindFirst("username")?.Value;
            IEnumerable<ProjectMember> projects = dbAccess.LoadData<ProjectMember, dynamic>(sql, new { @Username = usaNama });
            
            
            if (!projects.Any())
            {
                return new ProjectOverview();
            }

            // Get all invites..

            //Add upp all the projects..

            string projectDetailsSql = "SELECT * FROM Projects WHERE Id = @Project;";
            var projectDetailsTasks = projects.Select(async project =>
            {
                Project projectData = await dbAccess.LoadDataSingle<Project, dynamic>(projectDetailsSql, new { @Project = project.Project });
                return projectData;
            });

            // Wait for all project detail queries to complete
            Project[] projectDetails = await Task.WhenAll(projectDetailsTasks);

            ProjectOverview returnProjectOverviews = new ProjectOverview
            {
                AllProjects = projectDetails.Where(project => project != null).ToList()
            };

            return returnProjectOverviews;
        }
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] string projectName)
        {
            if (projectName is null)
            {
                return BadRequest("ProjectName is null");
            }
            string? stringId = this.User.FindFirst("userId")?.Value;
            if(stringId == null)
            {
                return BadRequest("Unknown error occured");
            }
            string userName = this.User.FindFirst("username")?.Value;

            if(userName == null)
            {
                return BadRequest();
            }

            int rows = await dbAccess.SaveData<dynamic>("CreateProject", new {@ProjectName = projectName, @CreatedBy = this.User.FindFirst("username")?.Value });

            if(rows <= 0)
            {
                return BadRequest("Seems like you already created a project like that");
            }


            return Ok("Successfully added Project");
        }

        // PUT api/<ProjectController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProjectController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

    }
}
