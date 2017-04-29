using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class TripUI
    {
        public string trainNumber { get; set; }
        public string direction { get; set; }
        public RoutePointUi from { get; set; }
        public RoutePointUi to { get; set; }
        public int tripId { get; set; }
        public ICollection<CarriageTypeUi> carriageType { get; set; }        
        public TripUI(string trainNumber, string direction, RoutePointUi from, RoutePointUi to, int tripId)
        {
            this.trainNumber = trainNumber;
            this.direction = direction;
            this.from = from;
            this.to = to;
            this.tripId = tripId;
        }
    }
}