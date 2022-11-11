using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarvelCU.Common.Dtos.Movie
{
    public class UpdateMovieDto
    {
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(600)]
        public string Description { get; set; }

        [MaxLength(150)]
        public string YouTubeTrailerId { get; set; }

        public DateTime? Premiere { get; set; }

        public uint? Price { get; set; }

        public sbyte? McuPhase { get; set; }

        public sbyte? McuSaga { get; set; }

        public IList<int> ActorsIds { get; set; }

        public IList<int> HeroesIds { get; set; }
    }
}
