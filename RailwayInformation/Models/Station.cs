using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class Station
    {
        public int Id { get; set; }
        public string prefix { get; set; }
        public string name { get; set; }
        public string location { get; set; }
        public Station(string prefix, string name, string location)
        {
            this.prefix = prefix;
            this.name = name;
            this.location = location;
        }
        public Station(string name)
        {
            this.name = name;
            this.prefix = "qwe";
            this.location = "qwe";
        }
    }
}