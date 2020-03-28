using Microsoft.EntityFrameworkCore;
using Awhere.Api.Models;
using System.Linq;
using System.Collections.Generic;
using System;
using NetTopologySuite.Geometries;
using NetTopologySuite;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using System.Configuration;

namespace Awhere.Api.Services
{
    public class DataService : DbContext
    {
        private readonly Settings _settings;

        public DbSet<InfectionPing> Pings { get; set; }

        public DataService(DbContextOptions<DataService> options, IOptions<Settings> settings) : base(options)
        {
            _settings = settings.Value;
        }
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
            var near = Pings.Where(p => p.Location.IsWithinDistance(currentLocation, distance));
            return near;
        }

        public async Task UpdateSeverityAsync()
        {
            foreach (var ping in Pings)
            {
                var timePassedSincePing = (DateTime.Now - ping.Created).Days;
                ping.Severity = (int)(ping.Severity - ping.Severity * ((double)timePassedSincePing / _settings.LifetimeOnSurfacesInDays));
            }

            await SaveChangesAsync();
        }

        public async Task CleanUpExpiredPingsAsync()
        {
            var expired = Pings.Where(p => p.Severity <= 0);
            Pings.RemoveRange(expired);
            await SaveChangesAsync();
        }
        public int RegisterPing(double latitude, double longitude, int severity, DateTime created)
        {

            var ping = new InfectionPing
            {
                Location = new Point(longitude, latitude) { SRID = 4326 },
                Severity = severity,
                Created = created
            };
            Pings.Add(ping);
            SaveChanges();
            return ping.Id;
        }
    }
}