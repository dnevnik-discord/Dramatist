using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Dnevnik") ?? "Data Source=Dnevnik.db";

builder.Services.AddSqlite<DnevnikDb>(connectionString);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Dnevnik API",
        Description = "Аз вашата тролейска...",
        Version = "v1"
    });
});

var app = builder.Build();

if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseDefaultFiles();
app.UseStaticFiles();

// app.UseHttpsRedirection();

// app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Dnevnik API V1");
});

//app.MapGet("/", () => "Аз вашата тролейска...");

// Get all users.
app.MapGet("/user", async (DnevnikDb db) =>
    await db.Users.ToListAsync());

// Get a users by id.
app.MapGet("/user/{id}", async (DnevnikDb db, int id) =>
    await db.Users.FindAsync(id));

// Create a new user.
app.MapPost("/user", async (DnevnikDb db, User user) =>
{
    await db.Users.AddAsync(user);
    await db.SaveChangesAsync();
    return Results.Created($"/user/{user.Id}", user);
});

// Update a user. ToDo
app.MapPut("/user/{id}", async (DnevnikDb db, User updateuser, int id) =>
{
      var user = await db.Users.FindAsync(id);
      if (user is null) return Results.NotFound();
      // ToDo
      user.Id = updateuser.Id;
      user.Handle = updateuser.Handle;
      user.Name = updateuser.Name;
      user.IsDemocrat = updateuser.IsDemocrat;
      user.IsGerbage = updateuser.IsGerbage;
      user.IsPutaran = updateuser.IsPutaran;
      user.Notes = updateuser.Notes;

      await db.SaveChangesAsync();
      return Results.NoContent();
});

// Delete a user.
app.MapDelete("/user/{id}", async (DnevnikDb db, int id) =>
{
   var user = await db.Users.FindAsync(id);
   if (user is null)
   {
      return Results.NotFound();
   }
   db.Users.Remove(user);
   await db.SaveChangesAsync();
   return Results.Ok();
});

app.Run();
