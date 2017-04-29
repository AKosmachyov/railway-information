using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class RoutePointUi
    {
        public double tripDistance { get; set; }
        public int stayTime { get; set; }
        public Station  station { get; set; }
        public DateTime arrive { get; set; }
    }
}