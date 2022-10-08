namespace MarvelCU.Bll.Interfaces;

public interface ICurrentCookies
{
    public string Jwt { get; }

    public string RefreshToken { get; }
}

