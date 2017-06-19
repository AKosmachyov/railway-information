using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class ArrivalTime
    {
        public int id { get; set; }
        public Trip trip { get; set; }
        public Point point { get; set; }
        public DateTime arriveTime { get; set; }
        public Route route { get; set; }
    }
}