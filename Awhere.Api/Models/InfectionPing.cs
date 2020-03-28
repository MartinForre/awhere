using System;
using System.ComponentModel.DataAnnotations.Schema;
using Awhere.Api.Entities;
using NetTopologySuite.Geometries;

namespace Awhere.Api.Models
{
    public class InfectionPing
    {
        public InfectionPing()
        {

        }
        public InfectionPing(RiskRegistration registration)
        {
            Location = new Point(registration.RiskArea.Longitude, registration.RiskArea.Latitude) { SRID = 4326 };
            Severity = registration.Severity;
        }
        public int Id { get; set; }
        public Point Location { get; set; }
        public int Severity { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
    }
}