using MarvelCU.Common.Dtos.User;
using MarvelCU.Domain;

namespace MarvelCU.Dal.Interfaces;

public interface ITokenRepository : IRepository<RefreshToken>
{
    public Task<AuthResponseDto> GenerateTokens(User user);

    public Task<AuthResponseDto> RefreshToken(TokenRequestDto tokenRequestDto);
}

