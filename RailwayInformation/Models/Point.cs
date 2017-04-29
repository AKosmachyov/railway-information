using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class Point
    {
        public int id { get; set; }
        public Station station { get; set; }
        public int stayTime { get; set; }
        public double tripDistance { get; set; }
    }
}