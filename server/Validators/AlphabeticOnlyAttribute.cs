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
            if (input == null || !Regex.IsMatch(input, "^[a-zA-Z]+$"))
            {
                return new ValidationResult("The word must contain only alphabetic characters.");
            }

            return ValidationResult.Success!;
        }
    }
}