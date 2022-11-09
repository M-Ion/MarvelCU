using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarvelCU.Common.Dtos.Hero
{
    public class UpdateHeroDto
    {
        [MaxLength(150)]
        public string Name { get; set; }

        [MaxLength(600)]
        public string Description { get; set; }
    }
}
