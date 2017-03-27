using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class Station
    {
        public string prefix;
        public string name;
        public string location;
        public Station(string prefix, string name, string location)
        {
            this.prefix = prefix;
            this.name = name;
            this.location = location;
        }
    }
}