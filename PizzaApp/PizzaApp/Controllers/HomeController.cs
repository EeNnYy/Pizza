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
        private readonly HttpClient _httpClient;


        public HomeController(ILogger<HomeController> logger,HttpClient httpClient)
        {
            _logger = logger;
            _httpClient = httpClient;
        }

        public async Task<IActionResult> IndexAsync()
        {
            var response = await _httpClient.GetAsync("https://localhost:7228/api/pizza");
            var pizzas = await response.Content.ReadFromJsonAsync<List<Pizza>>();

            return View(pizzas);
        }

        public async Task<IActionResult> Detail(int id)
        {
            var response = await _httpClient.GetAsync($"https://localhost:7228/api/pizza/{id}");
            var pizza = await response.Content.ReadFromJsonAsync<Pizza>();

            return View(pizza);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
