// This controller handles HTTP requests for managing synonym relationships.
// It defines endpoints for adding new synonyms and retrieving existing ones.
// The controller interacts with the SynonymService to perform the core business logic,
// and responds to the client (React frontend) with appropriate results.

using Microsoft.AspNetCore.Mvc;
using SynonymSearchTool.Services;
using SynonymSearchTool.Models;
using System.ComponentModel.DataAnnotations;

namespace SynonymSearchTool.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SynonymController : ControllerBase
    {
        private readonly SynonymService _synonymService;

        // Inject SynonymService via constructor
        public SynonymController(SynonymService synonymService)
        {
            _synonymService = synonymService;
        }

        // POST endpoint to add a synonym
        [HttpPost]
        public IActionResult AddSynonym([FromBody] SynonymRequest request)
        {
            var validationResults = new List<ValidationResult>();
            var validationContext = new ValidationContext(request);

            // Perform validation
            if (!Validator.TryValidateObject(request, validationContext, validationResults, true))
            {
                var errors = validationResults.Select(vr => vr.ErrorMessage).ToList();
                return BadRequest(new { Errors = errors });
            }

             // Convert both word and synonym to lowercase
            var wordLower = request.Word.ToLower();
            var synonymLower = request.Synonym.ToLower();

            // Call service to add synonym
            var result = _synonymService.AddSynonym(request.Word, request.Synonym);
            return Ok(new {message = result }); // Return a JSON object with the message
        }

        // GET endpoint to retrieve synonyms
        [HttpGet("{word}")]
        public IActionResult GetSynonyms(string word)
        {
             // Convert the word to lowercase for consistent querying
            var wordLower = word.ToLower();

             // Retrieve the synonyms using the lowercase word
            var synonyms = _synonymService.GetSynonyms(wordLower);
            if (synonyms.Count == 0)
            {
                return NotFound("No synonyms found, please try another word.");
            }
            return Ok(synonyms);
        }
    }
}
