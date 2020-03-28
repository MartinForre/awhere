using Awhere.Api.Models;
using Awhere.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Awhere.Api.Controllers
{
    [ApiController()]
    [Route("api/{controller}")]
    public class PingController : ControllerBase
    {
        private readonly DataService _dataService;

        public PingController(DataService dataService)
        {
            _dataService = dataService;
        }

        [HttpPost]
        public IActionResult RegisterPingAsync([FromBody] InfectionPing ping)
        {
            _dataService.Pings.AddAsync(ping);
            return Ok();
        }

        [HttpGet]
        public IActionResult GetNearbyRiskAreasAsync(double latitude, double longitude, double distanceMeters = 100)
        {
            var pingsNearby = _dataService.GetPingsWithinDistance(latitude, longitude, distanceMeters);
            return Ok(pingsNearby);
        }
    }
}