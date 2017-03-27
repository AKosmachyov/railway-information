using RailwayInformation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RailwayInformation.Controllers
{
    public class StationController : ApiController
    {
        // GET: api/Station
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Station/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Station
        public Station Post([FromBody]Station value)
        {
            return value;
        }

        // PUT: api/Station/
        public void Put([FromBody]Station value)
        {
        }

        // DELETE: api/Station/5
        public void Delete(int id)
        {
        }
    }
}
