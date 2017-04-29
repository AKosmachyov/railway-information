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
        public List<CarriageUI> Get(int tripId, int from, int to)
        {
            return Storage.getCarriage(tripId, from, to);
        }

        // POST: api/Carriage
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Carriage/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Carriage/5
        public void Delete(int id)
        {
        }
    }
}
