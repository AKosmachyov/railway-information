using RailwayInformation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RailwayInformation.Controllers
{
    public class CarriageController : ApiController
    {
        public IHttpActionResult Get(int tripId, int from, int to)
        { 
            var carriages = Storage.getCarriage(tripId, from, to);

            if (carriages.Capacity == 0)
                return BadRequest();
            return Ok(carriages);
        }
    }
}
