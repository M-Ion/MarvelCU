namespace MarvelCU.Common.Exceptions;

public class InvalidJwtException : Exception
{
    public InvalidJwtException(string message) : base(message)
    {
    }
}

