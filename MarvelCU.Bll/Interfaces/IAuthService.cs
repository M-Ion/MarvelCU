using MarvelCU.Common.Dtos.User;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace MarvelCU.Bll.Interfaces;

public interface IAuthService
{
    Task<IEnumerable<IdentityError>> Register(RegisterUserDto registerUserDto);

    Task<AuthResponseDto> Login(LoginUserDto loginUserDto);

    Task<AuthResponseDto> RefreshToken(TokenRequestDto tokenRequestDto);

    Task<User> GetUserByEmail(string email);

    Task<User> GetUserFromContext(HttpContext context);
}

