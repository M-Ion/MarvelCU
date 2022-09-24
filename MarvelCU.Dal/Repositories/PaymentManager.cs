using MarvelCU.Common.Dtos;
using MarvelCU.Dal.Extensions;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Stripe;

namespace MarvelCU.Dal.Repositories;

public class PaymentManager : IPaymentManager
{
    public async Task<bool> Pay(PaymentDto paymentDto, User user)
    {
        var options = await CreateChargeOptions(paymentDto, user);
        Charge charge = await new ChargeService().CreateAsync(options);

        if (charge.Paid && (user.CustomerId is null) && paymentDto.Save)
            user.CustomerId = options.Customer;

        return charge.Paid;
    }


    private async Task<ChargeCreateOptions> CreateChargeOptions(PaymentDto paymentDto, User user)
    {
        var options = new ChargeCreateOptions() { Amount = paymentDto.Amount, Currency = "usd" };

        if (user.CustomerId is not null)
        {
            options.Customer = user.CustomerId;
            return options;
        }

        var stripeToken = await paymentDto.GenerateStripeToken();

        if (paymentDto.Save)
        {
            Customer customer = await CreateStripeCustomer(user.Email, stripeToken);
            options.Customer = customer.Id;

            return options;
        }

        options.Source = stripeToken.Id;

        return options;
    }

    private async Task<Customer> CreateStripeCustomer(string email, Token stripeToken)
    {
        var options = new CustomerCreateOptions() { Source = stripeToken.Id, Email = email };

        Customer customer = await new CustomerService().CreateAsync(options);

        return customer;
    }
}

