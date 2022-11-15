namespace MarvelCU.Common.Dtos.Actor;

public class GetActorDto
{
    public string Id { get; set;}

    public string FirstName { get; set; }

    public string MiddleName { get; set; }

    public string LastName { get; set; }

    public string Name 
    {
        get 
        {
            return FirstName 
                + (MiddleName != null ? $" {MiddleName}" : "") 
                + (LastName != null ? $" {LastName}" : "");
        }
    }

    public string Blob { get; set; }
}

