using System.Linq;
using Awhere.Api.Entities;
using Awhere.Api.Models;
using Awhere.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Awhere.Api.Controllers
{
    [ApiController()]
    [Route("api/{controller}")]
    public class RiskController : ControllerBase
    {
        private readonly DataService _dataService;

        public RiskController(DataService dataService)
        {
            _dataService = dataService;
        }

        [HttpPost]
        public IActionResult RegisterAsync([FromBody] RiskRegistration registration)
        {
            var ping = new InfectionPing(registration);
            _dataService.Pings.AddAsync(ping);
            return Created("/", registration);
        }

        [HttpGet("GetNearbyRiskAreas")]
        public IActionResult GetNearbyRiskAreasAsync(double latitude, double longitude, double distanceMeters = 100)
        {
            var pingsNearby = _dataService.GetPingsWithinDistance(latitude, longitude, distanceMeters).Select(p => new RiskRegistration(p));
            return Ok(pingsNearby);
        }
    }
}