using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IRepository
    {
        public List<Pizza> GetPizzaModels();

        public Pizza FindById(int id);

        public bool CreatePizza(Pizza pizza);

        public bool UpdatePizza(Pizza pizza);

        public bool DeletePizza(int id);
    }
}
