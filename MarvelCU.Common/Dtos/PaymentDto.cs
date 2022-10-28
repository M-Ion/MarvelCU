using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos;

public class PaymentDto
{
    [Required]
    [CreditCard]
    public string CardNumber { get; set; }

    [Required]
    public int ExpMonth { get; set; }

    [Required]
    public int ExpYear { get; set; }

    [Required]
    public string Cvc { get; set; }

    [Required]
    public int Amount { get; set; }

    public bool Save { get; set; } = false;
}

