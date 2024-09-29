// This file contains the custom validation attribute for alphabetic characters only. 
// The attribute is used in the SynonymRequest model to validate the input data for adding a synonym relationship.

using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace SynonymSearchTool.Attributes
{
    public class AlphabeticOnlyAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
        {
            var input = value as string;
              // Updated regex: Allow words with at least one letter and optionally spaces, hyphens, and apostrophes.
            if (input == null || !Regex.IsMatch(input, "^[a-zA-Z]+[a-zA-Z\\s'-]*$"))
            {
                return new ValidationResult("The word must contain at least one letter and can include spaces, hyphens, or apostrophes.");
            }

            return ValidationResult.Success!;
        }
    }
}