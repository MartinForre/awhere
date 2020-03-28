namespace Awhere.Api.Entities
{
    public class RiskRegistration
    {
        public Location RiskArea { get; set; }
        public int Severity { get; set; }
    }

    public class Location
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}