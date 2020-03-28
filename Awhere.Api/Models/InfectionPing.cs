using System;
using System.ComponentModel.DataAnnotations.Schema;
using NetTopologySuite.Geometries;

namespace Awhere.Api.Models
{
    public class InfectionPing
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public Point Location { get; set; }
    }
}