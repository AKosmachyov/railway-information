using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class CarriageInformation
    {
        public int id { get; set; }
        public CarriageType carriageType { get; set; }
        public int emptySeats { get; set; }
    }
}