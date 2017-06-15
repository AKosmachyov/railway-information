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
        // book cariage
        public IHttpActionResult Post([FromBody]dynamic data)
        {
            try
            {
                int tripId = Convert.ToInt32(data.tripId.Value);
                int from = Convert.ToInt32(data.fromId.Value);
                int to = Convert.ToInt32(data.toId.Value);
                int carriageId = Convert.ToInt32(data.carriageId.Value);
                string userName = data.userName.Value;
                string docId = data.docId.Value;

                var ticket = Storage.bookCarriage(tripId, from, to, carriageId, userName, docId);
                if (ticket == null)
                    return NotFound();
                return Ok(ticket);
            }
            catch (Exception)
            {
                return BadRequest("Not all fields are filled out");
            }
        }
    }
}
