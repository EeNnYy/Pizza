using Application.Services;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using PizzaApp.Controllers;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PizzaController : ControllerBase
    {
        private readonly IPizzaServices _repositoryServices;
        public PizzaController(IPizzaServices repositoryServices, ILogger<PizzaController> logger)
        {
            _repositoryServices = repositoryServices;
        }
        [HttpGet]
        public ActionResult GetAllPizzas()
        {
            var pizzas = _repositoryServices.GetAllPizzas();
            if (pizzas == null)
            {
                return NotFound("Пиццы не найдены");
            }
            return Ok(pizzas);
        }

        [HttpGet("{id}")]
        public ActionResult PizzaById(int id)
        {
            var pizzaById = _repositoryServices.GetPizzaById(id);
            if (pizzaById == null)
            {
                return NotFound("Пиццы не найдены");
            }
            return Ok(pizzaById);
        }

        [HttpPost]
        public ActionResult CreatePizza(Pizza pizza)
        {
            _repositoryServices.AddPizza(pizza);
            return Ok("Пицца успешно добавлена");
        }

        [HttpPut]
        public ActionResult UpdatePizza(Pizza pizza)
        {
            _repositoryServices.UpdatePizza(pizza);

            return Ok("Пицца обновлена");
        }

        [HttpDelete("{id}")]
        public ActionResult DeletePizza(int id)
        {
            _repositoryServices.RemovePizza(id);
            return Ok("Пицца удалена!");
        }

    }
}
