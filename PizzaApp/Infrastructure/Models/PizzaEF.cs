using System;
using System.Collections.Generic;

namespace Infrastructure.Models
{
    public partial class PizzaEF
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Source { get; set; }
        public string Description { get; set; } = null!;
        public int Price { get; set; }
    }
}
