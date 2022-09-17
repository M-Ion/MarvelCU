﻿using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Common.Dtos.Hero;
using MarvelCU.Common.Dtos.Movie;
using MarvelCU.Domain;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MarvelCU.API.Models.Movie
{
    public class CreateMovieDto : BaseMovieDto
    {
        [Required]
        public string Descritpion { get; set; }

        [Required]
        public sbyte McuPhase { get; set; }

        [Required]
        public Sagas McuSaga { get; set; }
    }
}
