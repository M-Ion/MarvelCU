﻿using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Constants;
using MarvelCU.Common.Dtos.Payment;
using MarvelCU.Dal.Extensions;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Stripe;

namespace MarvelCU.Bll.Services;

public class PaymentManager : IPaymentManager
{
    private readonly ChargeService _chargeService;

    public PaymentManager(ChargeService chargeService)
    {
        _chargeService = chargeService;
    }

    public async Task<bool> Pay(PaymentDto paymentDto, User user)
    {
        var options = await CreateChargeOptions(paymentDto, user);
        Charge charge = await _chargeService.CreateAsync(options);

        // If charge was successful
        if (charge.Paid)
        {
            //bool saveCredentials = user.CustomerId is null && paymentDto.Save;

            //if (saveCredentials)
            //{
            //    user.CustomerId = options.Customer;
            //}
        }

        return charge.Paid;
    }


    private async Task<ChargeCreateOptions> CreateChargeOptions(PaymentDto paymentDto, User user)
    {
        var options = new ChargeCreateOptions() { Amount = paymentDto.Amount, Currency = Currencies.Usd };

        if (user.CustomerId is not null)
        {
            options.Customer = user.CustomerId;
            return options;
        }

        var stripeToken = await paymentDto.GenerateStripeToken();

        //if (paymentDto.Save)
        //{
        //    Customer customer = await CreateStripeCustomer(user.Email, stripeToken);
        //    options.Customer = customer.Id;

        //    return options;
        //}

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

