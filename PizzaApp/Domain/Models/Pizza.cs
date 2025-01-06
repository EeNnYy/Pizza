using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Pizza
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string? Source { get; set; }

        public string Description { get; set; } = null!;

        public int Price { get; set; }
    }
}
