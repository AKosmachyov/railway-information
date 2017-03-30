using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class TripTest
    {
        public string trainNumber;
        public string direction;
        public RoutePoint from;
        public RoutePoint to;
        public ICollection<CarriageType> carriageType;
    }
}