using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos.User;

public class RegisterUserDto : BaseUserDto/*, IValidatableObject*/
{
    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required]
    [Compare(nameof(Password), ErrorMessage = "Mismatch confirm password!")]
    public string ConfirmPassword { get; set; }

    //public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    //{
    //    if (!ConfirmPassword.Equals(Password))
    //        yield return new ValidationResult("Mismatch confirm password!");
    //}
}

