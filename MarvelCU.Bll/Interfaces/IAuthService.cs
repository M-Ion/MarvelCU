using MarvelCU.Common.Dtos.User;
using Microsoft.AspNetCore.Identity;

namespace MarvelCU.Bll.Interfaces;

public interface IAuthService
{
    Task<IEnumerable<IdentityError>> Register(RegisterUserDto registerUserDto);

    Task<AuthResponseDto> Login(LoginUserDto loginUserDto);

    Task<AuthResponseDto> RefreshToken(TokenRequestDto tokenRequestDto);

}

