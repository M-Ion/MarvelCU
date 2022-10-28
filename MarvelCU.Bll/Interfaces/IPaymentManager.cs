using MarvelCU.Common.Dtos.Payment;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Interfaces;

public interface IPaymentManager
{
    public Task<bool> Pay(PaymentDto paymentDto, User user);
}

