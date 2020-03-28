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
                    Description = "Lucky Bowl"
                },
                new InfectionPing
                {
                    Id = 2,
                    Location = new Point(5.749822, 58.854876) { SRID = 4326 },
                    Description = "Hana Roundabout"
                },
                new InfectionPing
                {
                    Id = 3,
                    Location = new Point(16.3738, 48.2082) { SRID = 4326 },
                    Description = "Vienna"
                }
            );
        }

        public IEnumerable<InfectionPing> GetPingsWithinDistance(Point currentLocation, double distance)
        {
            var near = Pings.Where(p => p.Location.Distance(currentLocation) <= distance);
            return near;
        }

        public void RegisterPing(double latitude, double longitude, string description)
        {

            Pings.Add(new InfectionPing
            {
                Description = description,
                Location = new Point(longitude, latitude) { SRID = 4326 }
            });
            SaveChanges();
        }
    }
}