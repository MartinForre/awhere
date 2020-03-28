using System;
using Xunit;
using Awhere.Api.Services;
using FluentAssertions;
using System.Linq;
using System.Collections.Generic;
using Awhere.Api.Models;

namespace Awhere.Api.Tests
{
    public class DataServiceTests
    {
        [Fact]
        public void It_Can_Retrieve_Pings_Within_10m()
        {
            var currentLocation = new NetTopologySuite.Geometries.Point(58.855726, 5.749581, 0) { SRID = 4326 };

            using (var db = new DataService())
            {
                db.RegisterPing(58.855720, 5.749577);
                db.RegisterPing(58.855542, 5.749395);
                db.RegisterPing(58.854427, 5.749867);
                db.SaveChanges();
                var near = db.GetPingsWithinDistance(currentLocation, 20);
                near.Should().HaveCount(1);
            }
        }
    }
}
