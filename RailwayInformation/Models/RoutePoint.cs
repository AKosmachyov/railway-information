using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class RoutePoint
    {
        public int Id { get; set; }
        public string station { get; set; }
        public DateTime arrive { get; set; }
        public Int32 stayTime { get; set; }
        public Double tripDistance { get; set; }
        public RoutePoint(string station, DateTime arrive, Int32 stayTime, Double tripDistance)
        {
            this.station = station;
            this.arrive = arrive;
            this.stayTime = stayTime;
            this.tripDistance = tripDistance;
        }
    }
}