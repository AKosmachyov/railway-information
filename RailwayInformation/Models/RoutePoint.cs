using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class RoutePoint
    {
        public Station station;
        public DateTime tripTime;
        public DateTime stayTime;
        public RoutePoint(Station station, DateTime tripTime, DateTime stayTime)
        {
            this.station = station;
            this.tripTime = tripTime;
            this.stayTime = stayTime;
        }
    }
}