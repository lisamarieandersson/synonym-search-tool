// This file configures and starts the ASP.NET Core application.
// It sets up the web server, registers services (such as SynonymService),
// and configures the middleware pipeline for handling HTTP requests.
// The Program.cs file also defines routing, enabling the application
// to respond to specific endpoints and routes defined in the controllers.
// This file ensures the application runs correctly and provides entry points for incoming requests.

using SynonymSearchTool.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")  // Frontend origin
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Register the controllers 
builder.Services.AddControllers();

// Register the SynonymService (for dependency injection)
builder.Services.AddSingleton<SynonymService>(); // If the service is stateless or for memory use

// Create the app
var app = builder.Build();

// Use CORS
app.UseCors("AllowFrontendApp");

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

// Enable routing to controllers 
app.MapControllers(); 

app.Run();
