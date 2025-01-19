using Azure;
using Domain.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using PizzaApp.Models;
using System.Diagnostics;

namespace PizzaApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IPizzaServices _services;


        public HomeController(ILogger<HomeController> logger, IPizzaServices services)
        {
            _logger = logger;
            _services = services;   
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Detail(int id)
        { 
            var pizza= _services.GetPizzaById(id);
            return View(pizza);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
