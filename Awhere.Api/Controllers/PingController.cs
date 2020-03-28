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

        public IActionResult RegisterPingAsync([FromBody] InfectionPing ping)
        {
            _dataService.Pings.AddAsync(ping);
            return Ok();
        }
    }
}