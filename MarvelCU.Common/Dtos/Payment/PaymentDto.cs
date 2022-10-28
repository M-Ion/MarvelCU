using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos.Payment;

public class PaymentDto : IValidatableObject
{
    [Required]
    public string CardNumber { get; set; }

    [Required]
    public Months ExpMonth { get; set; }

    [Required]
    public int ExpYear { get; set; }

    [Required]
    public int Cvc { get; set; }

    [Required]
    public int Amount { get; set; }

    public bool Save { get; set; } = false;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        int currentYear = DateTime.Now.Year;
        int currentMonth = DateTime.Now.Month;

        if (currentYear > 2000 + ExpYear)
        {
            yield return new ValidationResult("Expiration year can not be less than current year");
        }
        else if (currentYear == 2000 + ExpYear && (int)ExpMonth <= currentMonth)
        {
            yield return new ValidationResult("Card is already expired");
        }
    }
}

