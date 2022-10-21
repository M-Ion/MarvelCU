using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Payment;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Identity;

namespace MarvelCU.Bll.Services;

public class PaymentService : IPaymentService
{
    private readonly IPaymentManager _paymentService;
    private readonly ICurrentUser _currentUser;
    private readonly UserManager<User> _userManager;

    public PaymentService(IPaymentManager paymentManager, UserManager<User> userManager, ICurrentUser currentUser)
    {
        _paymentService = paymentManager;
        _userManager = userManager;
        _currentUser = currentUser;
    }

    public async Task<bool> ProcessPayment(PaymentDto paymentDto)
    {
        User user = await _userManager.FindByIdAsync(_currentUser.Id);

        if (user == null)
        {
            return false;
        }

        bool charged = await _paymentService.Pay(paymentDto, user);

        if (charged)
        {
            await _userManager.UpdateAsync(user);
        }

        return charged;
    }
}

