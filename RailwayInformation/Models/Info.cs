using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class Info
    {
        public string direction;
        public Point from;
        public Point to;
        public string carriageType;
        public Info() { }
        public Info(string direction, Point from, Point to, string carriageType)
        {
            this.direction = direction;
            this.from = from;
            this.to = to;
            this.carriageType = carriageType;
        }
    }
}