using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class Trip
    {
        public Route route;
        public string trainNumber;
        public ICollection<Carriage> carriages;
    }
}