using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Assignment.Models;
using Newtonsoft.Json.Linq;

namespace Assignment.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    private readonly string openCageKey = "8f339a6f0fc0403faaf67b0ab4e7f4a8";
    private readonly string openMeteoUrl = "https://api.open-meteo.com/v1/forecast";


    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

  

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> GetWeather(string city)
    {
        if (string.IsNullOrEmpty(city))
        {
            ViewBag.Error = "City is required.";
            return View("Index");
        }

        var geoApiUrl = $"https://api.opencagedata.com/geocode/v1/json?q={System.Web.HttpUtility.UrlEncode(city)}&key={openCageKey}";

        using (var client = new HttpClient())
        {
            var geoResponse = await client.GetStringAsync(geoApiUrl);
            var geoData = JObject.Parse(geoResponse);

            if (geoData["results"]?.Count() == 0)
            {
                ViewBag.Error = "City not found.";
                return View("Index");
            }

            var lat = geoData["results"][0]["geometry"]["lat"];
            var lng = geoData["results"][0]["geometry"]["lng"];
            var weatherApiUrl = $"{openMeteoUrl}?latitude={lat}&longitude={lng}&current_weather=true";

            var weatherResponse = await client.GetStringAsync(weatherApiUrl);
            var weatherData = JObject.Parse(weatherResponse);

            ViewBag.Weather = weatherData["current_weather"];
            ViewBag.City = city;
        }

        return View("Index");
    }





    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

