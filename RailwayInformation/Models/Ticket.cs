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
        public string docId { get; set; }
        public string tripDirection { get; set; }
        public int carriage { get; set; }
        public string carriageType { get; set; }
        public Station fromStation { get; set; }
        public DateTime fromDepart { get; set; }
        public Station toStation { get; set; }
        public DateTime toArrive { get; set; }
        public string userOwner { get; set; }
        public double price { get; set; }
        public string uiId { get; set; }
    }
}