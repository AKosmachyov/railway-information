using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class Station
    {
        public int Id { get; set; }
        public string name { get; set; }
        public Station(string name)
        {
            this.name = name;           
        }
    }
}