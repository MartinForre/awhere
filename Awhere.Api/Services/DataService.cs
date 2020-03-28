using NetTopologySuite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Awhere.Api.Models;
using NetTopologySuite.Geometries;
using System.Linq;
using System.Collections.Generic;
using ProjNet.IO.CoordinateSystems;
using ProjNet.CoordinateSystems;

namespace Awhere.Api.Services
{
    public class DataService : DbContext
    {
        public DbSet<InfectionPing> Pings { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase("Awhere");
        }

        public IEnumerable<InfectionPing> GetPingsWithinDistance(Point currentLocation, double distance)
        {
            var near = Pings.Where(p => p.Location.IsWithinDistance(currentLocation, distance));
            return near;
        }

        public void RegisterPing(double x, double y)
        {
            Pings.Add(new InfectionPing
            {
                Location = new Point(x, y) { SRID = 4326 }
            });
            SaveChanges();
        }
    }
}