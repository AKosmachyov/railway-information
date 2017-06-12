using RailwayInformation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RailwayInformation.Controllers
{
    public class TripController : ApiController
    {
        public IHttpActionResult Get(string from, string to, string time)
        {
            DateTime timeDeparture;
            if (from == null || to == null || from.Length == 0 || to.Length == 0 || !DateTime.TryParse(time, out timeDeparture))
                return BadRequest();

            var trips = Storage.getTrip(from, to, timeDeparture);
            
            if (trips.Capacity == 0)            
                return NotFound();
            return Ok(trips);            
        }

        // POST: api/Trip
        public Info Post([FromBody]dynamic data)
        {
            string trainNumber = data.trainNumber.Value;
            int from = Convert.ToInt16(data.from.Value);
            int to = Convert.ToInt16(data.to.Value);
            string carriageName = data.carriageName.Value;
            return Storage.getInfo(trainNumber, from, to, carriageName);
        }
    }
}
