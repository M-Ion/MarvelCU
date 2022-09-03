﻿using MarvelCU.API.Models.Movie;

namespace MarvelCU.API.Models.Actor
{
    public class ActorDto
    {
        public int Id { get; init; }
        public string FullName { get; init; }
        public List<GetMovieDto> Movies { get; set; }
    }
}
