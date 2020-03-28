using System;
using System.Collections.Generic;
using Awhere.Api.Models;

namespace Awhere.Api.Services
{
    public class RandomInfectionService
    {
        static Random random = new Random();

        public IEnumerable<InfectionPing> CreateInfectionAroundPoint(double latitude, double longitude)
        {
            var pings = new List<InfectionPing>();
            const int amount = 50;

            for(var i = 0; i < amount; i++)
            {
                var ping = new InfectionPing
                {
                    Created = DateTime.UtcNow,
                    Id = i,
                    Location = new NetTopologySuite.Geometries.Point(longitude + GetRandomDistance(), latitude + GetRandomDistance()),
                    Severity = Convert.ToInt32(Math.Floor(random.NextDouble() * 3))
                };
                pings.Add(ping);
            }

            return pings;
        }

        static double GetRandomDistance()
        {
            var amount = random.NextDouble() * 0.1;
            var distance = random.NextDouble();
            return distance > 0.5 ? distance * (amount * -1) : distance * amount;
        }
    }
}