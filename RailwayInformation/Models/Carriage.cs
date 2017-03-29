using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class Carriage
    {
        [Key]
        public int Id { get; set; }
        public string name { get; set; }
        public ICollection<string> seats { get; set; }
        public Int32 emptySeat { get; set; }
        public string type { get; set; }
        public double priceFactor { get; set; }
        public Carriage(string name, Int32 emptySeat, string type, double priceFactor)
        {
            this.name = name;
            this.emptySeat = emptySeat;
            this.type = type;
            this.priceFactor = priceFactor;
            this.seats = new List<String>();
        }
    }
}