using MarvelCU.Common.Dtos.User;
using MarvelCU.Domain;

namespace MarvelCU.Dal.Interfaces;

public interface ITokenManager
{
    public Task<AuthResponseDto> GenerateTokens(User user);

    public Task<AuthResponseDto> RefreshToken(TokenRequestDto tokenRequestDto);
}

