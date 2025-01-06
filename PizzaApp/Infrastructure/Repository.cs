using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Data;
using Domain;
using Domain.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Infrastructure;
using Infrastructure.Models;
namespace Infrastructure
{
    public class Repository : IRepository
    {
        private readonly ApplicationDbContext _context;

        public Repository(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool CreatePizza(Pizza pizza)
        {
            try
            {
                var pizzaEF = new PizzaEF
                {
                    Title = pizza.Title,
                    Description = pizza.Description,
                    Price = pizza.Price,
                    Source = pizza.Source,
                };
                _context.Pizzas.Add(pizzaEF);
                _context.SaveChanges();

                return true;

            }
            catch (Exception)
            {
                return false;
            }

        }

        public bool DeletePizza(int id)
        {
            try
            {
                var pizzaEF = _context.Pizzas.Find(id);

                if (pizzaEF != null)
                {
                    _context.Pizzas.Remove(pizzaEF);
                    _context.SaveChanges();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        public Pizza FindById(int id)
        {
            var pizzaEF = _context.Pizzas.Find(id);
            var pizza = new Pizza
            {
                Title = pizzaEF.Title,
                Description = pizzaEF.Description,
                Price = pizzaEF.Price,
                Source = pizzaEF.Source,
            };

            return pizza;
        }

        public List<Pizza> GetPizzaModels()
        {
            var pizzaEntities = _context.Pizzas.ToList();


            var pizzas = pizzaEntities.Select(entity => new Pizza
            {
                Id = entity.Id,
                Title = entity.Title,
                Price = entity.Price,
                Description = entity.Description,
                Source = entity.Source,
            }).ToList();

            return pizzas;
        }

        public bool UpdatePizza(Pizza pizza)
        {
            try
            {
                var updatePizza = _context.Pizzas.Find(pizza.Id);
                if (updatePizza != null)
                {
                    updatePizza.Title = pizza.Title;
                    updatePizza.Price = pizza.Price;
                    updatePizza.Source = pizza.Source;
                    updatePizza.Description = pizza.Description;
                    _context.SaveChanges();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
