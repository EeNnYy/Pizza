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
        private readonly ILogger _logger;

        public PizzaController(IPizzaServices repositoryServices, ILogger<PizzaController> logger)
        {
            _repositoryServices = repositoryServices;
            _logger = logger;
        }
        
        [HttpGet]
        public ActionResult GetAllPizzas()
        {
            try
            {
                var pizzas = _repositoryServices.GetAllPizzas();
                throw new Exception("Моя тестовая ошибка");
                return Ok(pizzas);
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex, "Ошибка при получении пицц");
                return BadRequest("Пиццы не найдены");
            }

        }

        [HttpGet("{id}")]
        public ActionResult PizzaById(int id)
        {
            try
            {
                var pizzaById = _repositoryServices.GetPizzaById(id);
                return Ok(pizzaById);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении пиццы по id");
                return BadRequest("Пицца не была найдена");
            }

        }

        [HttpPut]
        public ActionResult CreatePizza(Pizza pizza)
        {
            try
            {
                _repositoryServices.AddPizza(pizza);

                return Ok("Пицца успешно добавлена");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при добавлении пиццы");
                return BadRequest("Пицца не была добавлена ");

            }
           
        }

        [HttpPost]
        public ActionResult UpdatePizza(Pizza pizza)
        {
            try
            {
                _repositoryServices.UpdatePizza(pizza);

                return Ok("Пицца обновлена");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при обновлении пиццы");
                return BadRequest("Пицца не была обновлена");
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeletePizza(int id)
        {
            try
            {
                _repositoryServices.RemovePizza(id);

                return Ok("Пицца удалена!");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при удалении пиццы");
                return BadRequest("Пицца не была удалена");
            }
        }

    }
}
