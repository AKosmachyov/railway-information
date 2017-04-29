using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class CarriageUI
    {
        public int number { get; set; }
        public string carriageType { get; set; }
        public int emptySeats { get; set; }
        public double price { get; set; }
    }
}