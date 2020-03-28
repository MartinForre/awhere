using System;
using Awhere.Api.Models;

namespace Awhere.Api.Entities
{
    public class RiskRegistration
    {
        public RiskRegistration()
        {

        }
        public RiskRegistration(InfectionPing ping)
        {
            RiskArea = new Location { Latitude = ping.Location.Coordinate.Y, Longitude = ping.Location.Coordinate.X };
            Severity = ping.Severity;
            Created = ping.Created;
        }
        public Location RiskArea { get; set; }
        public int Severity { get; set; }
        public DateTime Created { get; set; }
    }

    public class Location
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}