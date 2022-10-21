using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos.Payment;

public class PaymentDto
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
}

