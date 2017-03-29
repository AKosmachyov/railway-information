using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class Route
    {
        public int Id { get; set; }
        ICollection<RoutePoint> stations { get; set; }
        public Route()
        {

        }
    }
}