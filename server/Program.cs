using SynonymSearchTool.Models; 

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Create the app
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else 
{
    app.UseHttpsRedirection(); // Only redirect to HTTPS when not in development 
}

// In-memory data structure for synonyms
var synonymService = new SynonymService();


// POST route to add a synonym
app.MapPost("/synonyms", (SynonymRequest request) =>
{
    // Store the return value of AddSynonym in the result variable
    var result = synonymService.AddSynonym(request.Word, request.Synonym);
    
    // Return the result message to the user
    return Results.Ok(result);
});



// GET route to retrieve synonyms
app.MapGet("/synonyms/{word}", (string word) =>
{
    var synonyms = synonymService.GetSynonyms(word);
    if (synonyms.Count == 0)
    {
        return Results.NotFound("No synonyms found");
    }
    return Results.Ok(synonyms);
});

app.Run();