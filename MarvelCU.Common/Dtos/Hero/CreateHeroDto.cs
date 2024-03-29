﻿using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos.Hero;

public class CreateHeroDto
{
    [Required]
    public string Name { get; set; }

    public string Description { get; set; }

    public string BlobFilePath { get; set; }

    public IList<int> MoviesIds { get; set; }
}

