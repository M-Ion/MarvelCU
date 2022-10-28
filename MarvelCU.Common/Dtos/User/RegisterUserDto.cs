using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace MarvelCU.Common.Dtos.User;

public class RegisterUserDto : BaseUserDto/*, IValidatableObject*/
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required]
    [System.ComponentModel.DataAnnotations.Compare(nameof(Password), ErrorMessage = "Mismatch confirm password!")]
    public string ConfirmPassword { get; set; }

    //public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    //{
    //    if (!ConfirmPassword.Equals(Password))
    //        yield return new ValidationResult("Mismatch confirm password!");
    //}
}

