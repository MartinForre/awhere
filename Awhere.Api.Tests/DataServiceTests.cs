using System;
using Xunit;
using Awhere.Api.Services;
using FluentAssertions;
using System.Linq;
using System.Collections.Generic;
using Awhere.Api.Models;
using Xunit.Abstractions;

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
        public void It_Can_Retrieve_Pings_Within_10m()
        {
            var currentLocation = new Location(58.855320, 5.749310);
            using (var db = new DataService())
            {
                db.RegisterPing(5.751524, 58.853965); //lucky bowl
                db.RegisterPing(5.749822, 58.854876); //roundabout
                db.RegisterPing(5.749867, 58.854427);
                db.SaveChanges();
                var near = db.GetPingsWithinDistance(currentLocation, 200);
                foreach (var place in db.Pings)
                {
                    _output.WriteLine($"Distance to current location: {place.Location.Distance(currentLocation)}");
                }
                near.Should().HaveCount(2);
            }
        }
    }
}
