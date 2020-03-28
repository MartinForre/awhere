using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Awhere.Api.Models
{
    public class InfectionPing
    {
        public int Id { get; set; }
        public Location Location { get; set; }
    }

    public class Location
    {
        public Location(double latitude, double longitude)
        {
            Latitude = latitude;
            Longitude = longitude;
        }
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public double Distance(Location other)
        {
            double distance = 0;

            double dLat = (other.Latitude - this.Latitude) / 180 * Math.PI;
            double dLong = (other.Longitude - this.Longitude) / 180 * Math.PI;

            double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2)
                        + Math.Cos(other.Latitude) * Math.Sin(dLong / 2) * Math.Sin(dLong / 2);
            double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

            //Calculate radius of earth
            // For this you can assume any of the two points.
            double radiusE = 6378135; // Equatorial radius, in metres
            double radiusP = 6356750; // Polar Radius

            //Numerator part of function
            double nr = Math.Pow(radiusE * radiusP * Math.Cos(this.Latitude / 180 * Math.PI), 2);
            //Denominator part of the function
            double dr = Math.Pow(radiusE * Math.Cos(this.Latitude / 180 * Math.PI), 2)
                            + Math.Pow(radiusP * Math.Sin(this.Latitude / 180 * Math.PI), 2);
            double radius = Math.Sqrt(nr / dr);

            //Calaculate distance in metres.
            distance = radius * c;
            return distance;
        }
    }
}