using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Payment;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MarvelCU.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _paymentService;

    public PaymentsController(IPaymentService paymentService)
    {
        _paymentService = paymentService;
    }

    [HttpPost("Pay")]
    [Authorize]
    public async Task<ActionResult> Pay([FromBody] PaymentDto paymentDto)
    {
        var charged = await _paymentService.ProcessPayment(paymentDto);

        return charged ? Ok() : BadRequest();
    }
}

