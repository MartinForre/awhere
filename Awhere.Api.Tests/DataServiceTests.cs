using System;
using Xunit;
using Awhere.Api.Services;
using FluentAssertions;
using System.Linq;
using System.Collections.Generic;
using Awhere.Api.Models;
using Xunit.Abstractions;
using NetTopologySuite.Geometries;
using NSubstitute;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace Awhere.Api.Tests
{
    public class DataServiceTests
    {
        private readonly ITestOutputHelper _output;

        public DataServiceTests(ITestOutputHelper output)
        {
            _output = output;
        }
        [Fact]
        public void It_Can_Retrieve_Pings_Within_100m()
        {
            var currentLocation = new Point(5.749310, 58.855320) { SRID = 4326 };
            var settings = Options.Create(new Settings { LifetimeOnSurfacesInDays = 3 });
            // var currentLocation = new Point(13.4050, 52.5200) { SRID = 4326 };
            using (var db = new DataService(settings))
            {
                var near = db.GetPingsWithinDistance(currentLocation, 100);
                near.Should().HaveCount(1);
            }
        }

        [Fact]
        public async Task It_Decreases_Severity_Based_On_Time()
        {
            var settings = Options.Create(new Settings { LifetimeOnSurfacesInDays = 3 });
            using (var db = new DataService(settings))
            {
                var id = db.RegisterPing(1, 1, 3, DateTime.Now.AddDays(-1));
                db.SaveChanges();
                await db.UpdateSeverityAsync();

                var updated = db.Pings.Where(p => p.Id == id).First();
                db.Pings.Remove(updated);
                db.SaveChanges();
                updated.Severity.Should().Be(2);
            }
        }

        [Fact]
        public async Task It_Cleans_Up_Expired_Pings()
        {
            var settings = Options.Create(new Settings { LifetimeOnSurfacesInDays = 3 });
            using (var db = new DataService(settings))
            {
                var id = db.RegisterPing(1, 1, 3, DateTime.Now.AddDays(-4));
                db.SaveChanges();
                await db.UpdateSeverityAsync();
                await db.CleanUpExpiredPingsAsync();
                var updated = db.Pings.Where(p => p.Id == id).FirstOrDefault();
                updated.Should().BeNull();
            }
        }
    }
}
