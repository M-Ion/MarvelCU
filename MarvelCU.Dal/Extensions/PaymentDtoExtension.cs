using MarvelCU.Common.Dtos.Payment;
using Stripe;

namespace MarvelCU.Dal.Extensions;

public static class PaymentDtoExtension
{
    public static async Task<Token> GenerateStripeToken(this PaymentDto paymentDto)
    {
        var options = new TokenCreateOptions()
        {
            Card = new TokenCardOptions()
            {
                Number = paymentDto.CardNumber,
                ExpMonth = ((int)paymentDto.ExpMonth).ToString(),
                ExpYear = paymentDto.ExpYear.ToString(),
                Cvc = paymentDto.Cvc.ToString(),
            }
        };

        return await new TokenService().CreateAsync(options);
    }
}

