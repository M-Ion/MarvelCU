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
    private readonly IAuthManager _authManager;

    public PaymentsController(IPaymentService paymentService, IAuthManager authManager)
    {
        _paymentService = paymentService;
        _authManager = authManager;
    }

    [HttpPost("Pay")]
    [Authorize]
    public async Task<ActionResult> Pay([FromBody] PaymentDto paymentDto)
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        var email = identity.Claims.FirstOrDefault(c => c.Type == ClaimValueTypes.Email).Value;

        var user = await _authManager.GetUserByEmail(email);

        if (user is null) return Unauthorized();

        var charged = await _paymentService.ProcessPayment(paymentDto, user);

        return charged ? Ok() : BadRequest();
    }
}

