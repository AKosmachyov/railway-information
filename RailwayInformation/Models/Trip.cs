using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class Trip
    {
        public List<RoutePoint> route;
        public string trainNumber;
        public List<Carriage> carriages;
        public List<CarriageType> carriageType;
    }
}