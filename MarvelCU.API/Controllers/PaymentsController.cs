using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
    //[Authorize]
    //[ServiceFilter(typeof(CurrentUserValidationFilter))]
    public async Task<ActionResult> Pay([FromBody] PaymentDto paymentDto)
    {
        var user = HttpContext.Items["CurrentUser"] as User;

        var charged = await _paymentService.ProcessPayment(paymentDto, user);

        return charged ? Ok() : BadRequest();
    }
}

