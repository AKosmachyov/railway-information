using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class Route
    {
        public int id { get; set; }
        public string name { get; set; }
        public string direction { get; set; }
        public List<Point> points { get; set; }
    }
}