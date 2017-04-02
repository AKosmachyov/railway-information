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
        // GET: api/Trip
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Trip/5
        public string Get(string val)
        {         
            return "value";
        }

        // POST: api/Trip
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Trip/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Trip/5
        public void Delete(int id)
        {
        }
    }
}
