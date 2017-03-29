using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public class Route
    {
        [Key]
        public int Id { get; set; }
        ICollection<RoutePoint> stations { get; set; }
        public Route()
        {

        }
    }
}