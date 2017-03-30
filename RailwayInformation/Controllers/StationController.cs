using RailwayInformation.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace RailwayInformation.Controllers
{
    public class StationController : ApiController
    {    
        // GET: api/Station
        public List<TripTest> Get()
        {
            return Storage.getTrip();
        }

        // GET: api/Station/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Station
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Station/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Station/5
        public void Delete(int id)
        {
        }
    }
}
