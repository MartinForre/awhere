using System;
using System.ComponentModel.DataAnnotations.Schema;
using Awhere.Api.Entities;
using NetTopologySuite.Geometries;

namespace Awhere.Api.Models
{
    public class InfectionPing
    {
        public InfectionPing(RiskRegistration registration)
        {
            Location = new Point(registration.RiskArea.Longitude, registration.RiskArea.Latitude) { SRID = 4326 };
        }
        public int Id { get; set; }
        public string Description { get; set; }
        public Point Location { get; set; }
    }
}