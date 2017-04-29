using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class Trip
    {
        public int id { get; set; }
        public ICollection<Carriage> carriages { get; set; }
        public ICollection<CarriageInformation> carriageInformation { get; set; }
        public ICollection<ArrivalTime> arrivalTimes { get; set; }
    }
}