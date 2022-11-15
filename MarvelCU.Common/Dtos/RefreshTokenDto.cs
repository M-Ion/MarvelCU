using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarvelCU.Common.Dtos
{
    public class RefreshTokenDto
    {
        public string Token { get; set; }

        public DateTime Expired { get; set; }
    }
}
