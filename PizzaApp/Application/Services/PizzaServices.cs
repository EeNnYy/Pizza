using Domain.Interfaces;
using Domain.Models;
using System.Reflection.Metadata.Ecma335;

namespace Application.Services
{
    public class PizzaServices : IPizzaServices
    {
        private readonly IRepository _repository;   

        public PizzaServices(IRepository repository)
        {
            _repository = repository;
        }

        public bool AddPizza(Pizza pizza)
        {
            try
            {
                _repository.CreatePizza(pizza);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
           
        }

        public List<Pizza> GetAllPizzas()
        {
            try
            {
                return _repository.GetPizzaModels();
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public Pizza GetPizzaById(int id)
        {
            try
            {
                return _repository.FindById(id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool RemovePizza(int id)
        {
            try
            {
                _repository.DeletePizza(id);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UpdatePizza(Pizza pizza)
        {
            try
            {
                _repository.UpdatePizza(pizza);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
