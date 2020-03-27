using System;
using Xunit;
using Awhere.Api.Services;
using FluentAssertions;
using System.Linq;

namespace Awhere.Api.Tests
{
    public class DataServiceTests
    {
        [Fact]
        public void It_Keeps_Data_Between_Sessions()
        {
            var db = new Microsoft.EntityFrameworkCore.Storage.InMemoryDatabaseRoot();
            using (var context = new DataService())
            {
                context.Profiles.Add(new Models.UserProfile { ProfileId = Guid.NewGuid() });
                context.SaveChanges();
                context.Profiles.Should().HaveCount(1);
            }

            using (var context = new DataService())
            {
                context.Profiles.Add(new Models.UserProfile { ProfileId = Guid.NewGuid() });
                context.SaveChanges();
                context.Profiles.Should().HaveCount(2);
            }
        }
    }
}
