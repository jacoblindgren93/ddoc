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


public static class ProjectEndpoints
{
	public static void MapProjectEndpoints (this IEndpointRouteBuilder routes)
    {
        routes.MapGet("/api/Project", () =>
        {
            return new [] { new Project() };
        })
        .WithName("GetAllProjects");

        routes.MapGet("/api/Project/{id}", (int id) =>
        {
            //return new Project { ID = id };
        })
        .WithName("GetProjectById");

        routes.MapPut("/api/Project/{id}", (int id, Project input) =>
        {
            return Results.NoContent();
        })
        .WithName("UpdateProject");

        routes.MapPost("/api/Project/", (Project model) =>
        {
            //return Results.Created($"//api/Projects/{model.ID}", model);
        })
        .WithName("CreateProject");

        routes.MapDelete("/api/Project/{id}", (int id) =>
        {
            //return Results.Ok(new Project { ID = id });
        })
        .WithName("DeleteProject");
    }
}}