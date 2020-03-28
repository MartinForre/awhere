using Microsoft.EntityFrameworkCore;
using Awhere.Api.Models;
using System.Linq;
using System.Collections.Generic;
using System;
using NetTopologySuite.Geometries;
using NetTopologySuite;

namespace Awhere.Api.Services
{
    public class DataService : DbContext
    {
        public DbSet<InfectionPing> Pings { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlServer(
    @"Server=tcp:localhost,1433\\Catalog=Pings;Database=Awhere;User ID=SA;Password=yourAwesome#Password;", x => x.UseNetTopologySuite());

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<InfectionPing>().HasData(
                new InfectionPing
                {
                    Id = 1,
                    Location = new Point(5.751524, 58.853965) { SRID = 4326 },
                    Severity = 2
                },
                new InfectionPing
                {
                    Id = 2,
                    Location = new Point(5.749822, 58.854876) { SRID = 4326 },
                    Severity = 1
                },
                new InfectionPing
                {
                    Id = 3,
                    Location = new Point(16.3738, 48.2082) { SRID = 4326 },
                    Severity = 0
                }
            );
        }

        public IEnumerable<InfectionPing> GetPingsWithinDistance(double latitude, double longitude, double distance)
        {
            var location = new Point(longitude, latitude) { SRID = 4326 };
            return GetPingsWithinDistance(location, distance);
        }
        public IEnumerable<InfectionPing> GetPingsWithinDistance(Point currentLocation, double distance)
        {
            var near = Pings.Where(p => p.Location.Distance(currentLocation) <= distance);
            return near;
        }

        public void RegisterPing(double latitude, double longitude, int severity)
        {

            Pings.Add(new InfectionPing
            {
                Location = new Point(longitude, latitude) { SRID = 4326 },
                Severity = severity
            });
            SaveChanges();
        }
    }
}