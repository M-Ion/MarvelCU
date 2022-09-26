using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos;
using MarvelCU.Dal.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MarvelCU.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _paymentService;
    private readonly IAuthService _authService;

    public PaymentsController(IPaymentService paymentService, IAuthService authService)
    {
        _paymentService = paymentService;
        _authService = authService;
    }

    [HttpPost("Pay")]
    [Authorize]
    public async Task<ActionResult> Pay([FromBody] PaymentDto paymentDto)
    {
        var user = await _authService.GetUserFromContext(HttpContext);

        if (user is null) return Unauthorized();

        var charged = await _paymentService.ProcessPayment(paymentDto, user);

        return charged ? Ok() : BadRequest();
    }
}

