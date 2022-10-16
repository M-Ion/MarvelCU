using MarvelCU.Common.Dtos.User;
using MarvelCU.Domain;

namespace MarvelCU.Dal.Interfaces;

public interface ITokenManager
{
    Task<AuthResponseDto> GenerateTokens(User user);

    Task<AuthResponseDto> RefreshToken(TokenRequestDto tokenRequestDto);

    Task RevokeRefreshToken(RefreshToken refreshToken);

    Task<RefreshToken> GetRefreshTokenByUser(User user);

    Task<RefreshToken> GetRefreshToken(string value);
}

