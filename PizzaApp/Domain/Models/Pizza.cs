using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Pizza
    {
        public Pizza(int id, string title, string source, string description, int price)
        {
            Id = id;
            Title = title;
            Source = string.IsNullOrEmpty(source) ? null : source;
            Description = description;
            Price = price;
        }
        public int Id { get; }

        public string Title { get; } = null!;

        public string? Source { get; }

        public string Description { get; } = null!;

        public int Price { get; }
    }
}
