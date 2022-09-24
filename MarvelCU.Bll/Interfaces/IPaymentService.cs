using MarvelCU.Common.Dtos;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Interfaces;

public interface IPaymentService
{
    Task<bool> ProcessPayment(PaymentDto paymentDto, User user);
}

