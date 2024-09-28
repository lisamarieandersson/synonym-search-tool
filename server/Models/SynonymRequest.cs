// This model represents the input data structure for adding a synonym relationship.
// It also handles validation for the input fields (word and synonym) using data annotations.

using System.ComponentModel.DataAnnotations;
using SynonymSearchTool.Attributes; // Custom validation attribute for alphabetic characters only

namespace SynonymSearchTool.Models
{
    public class SynonymRequest
    {
        [Required(ErrorMessage = "Word is required")]
        [MinLength(1, ErrorMessage = "Word must be at least 1 character")]
        [AlphabeticOnly] // Custom validation attribute for alphabetic characters only
        public required string Word { get; set; }

        [Required(ErrorMessage = "Synonym is required")]
        [MinLength(1, ErrorMessage = "Synonym must be at least 1 character")]
        [AlphabeticOnly] // Custom validation attribute for alphabetic characters only
        public required string Synonym { get; set; }
    }
}
