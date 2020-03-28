using System;
using Xunit;
using Awhere.Api.Services;
using FluentAssertions;
using System.Linq;
using System.Collections.Generic;
using Awhere.Api.Models;
using Xunit.Abstractions;
using NetTopologySuite.Geometries;

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
            var currentLocation = new Point(5.749310, 58.855320) { SRID = 4326 };
            // var currentLocation = new Point(13.4050, 52.5200) { SRID = 4326 };
            using (var db = new DataService())
            {
                var near = db.GetPingsWithinDistance(currentLocation, 200);
                near.Should().HaveCount(2);
            }
        }
    }
}
