using Microsoft.EntityFrameworkCore;
using Awhere.Api.Models;
using System.Linq;
using System.Collections.Generic;
using System;

namespace Awhere.Api.Services
{
    public class DataService : DbContext
    {
        public DbSet<InfectionPing> Pings { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseInMemoryDatabase("Awhere");

        public DataService()
        {
            Database.EnsureCreated();
        }

        public IEnumerable<InfectionPing> GetPingsWithinDistance(Location currentLocation, double distance)
        {
            var near = Pings.Where(p => GetDistanceBetweenPoints(p.Location, currentLocation) <= distance);
            return near;
        }

        public void RegisterPing(double longitude, double latitude)
        {
            Pings.Add(new InfectionPing
            {
                Location = new Location(latitude, longitude)
            });
            SaveChanges();
        }

        private double GetDistanceBetweenPoints(Location start, Location finish)
        {
            double distance = 0;

            double dLat = (finish.Latitude - start.Latitude) / 180 * Math.PI;
            double dLong = (finish.Longitude - start.Longitude) / 180 * Math.PI;

            double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2)
                        + Math.Cos(finish.Latitude) * Math.Sin(dLong / 2) * Math.Sin(dLong / 2);
            double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

            //Calculate radius of earth
            // For this you can assume any of the two points.
            double radiusE = 6378135; // Equatorial radius, in metres
            double radiusP = 6356750; // Polar Radius

            //Numerator part of function
            double nr = Math.Pow(radiusE * radiusP * Math.Cos(start.Latitude / 180 * Math.PI), 2);
            //Denominator part of the function
            double dr = Math.Pow(radiusE * Math.Cos(start.Latitude / 180 * Math.PI), 2)
                            + Math.Pow(radiusP * Math.Sin(start.Latitude / 180 * Math.PI), 2);
            double radius = Math.Sqrt(nr / dr);

            //Calaculate distance in metres.
            distance = radius * c;
            return distance;
        }
    }
}