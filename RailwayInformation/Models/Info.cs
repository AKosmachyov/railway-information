using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class Info
    {
        public string direction;
        public RoutePoint from;
        public RoutePoint to;
        public string carriageType;

        public Info(string direction, RoutePoint from, RoutePoint to, string carriageType)
        {
            this.direction = direction;
            this.from = from;
            this.to = to;
            this.carriageType = carriageType;
        }
    }
}