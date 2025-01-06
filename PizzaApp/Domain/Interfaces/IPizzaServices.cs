using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IPizzaServices
    {
        List<Pizza> GetAllPizzas();
        Pizza GetPizzaById(int id);
        bool AddPizza(Pizza pizza);
        bool UpdatePizza(Pizza pizza);
        bool RemovePizza(int id);
    }
}
