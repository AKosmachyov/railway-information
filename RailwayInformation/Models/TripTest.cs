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
        public TripTest(string trainNumber, string fromDir, string toDir, RoutePoint from, RoutePoint to)
        {
            this.trainNumber = trainNumber;
            this.direction = fromDir + ',' + toDir;
            this.from = from;
            this.to = to;
        }
    }
}