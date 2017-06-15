using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class Ticket
    {
        [Key]
        public int id { get; set; }
        public string userName { get; set; }
        public string tripDirection { get; set; }
        public int carriage { get; set; }
        public RoutePointUi from { get; set; }
        public RoutePointUi to { get; set; }
        public int userOwner { get; set; }
    }
}