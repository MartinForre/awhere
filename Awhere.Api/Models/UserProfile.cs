using System;

namespace Awhere.Api.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public Guid ProfileId { get; set; }
        public bool Test { get; set; }
    }
}