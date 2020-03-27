using Awhere.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace Awhere.Api.Services
{
    public class DataService : DbContext
    {

        public DbSet<UserProfile> Profiles { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseInMemoryDatabase("Awhere");
    }
}