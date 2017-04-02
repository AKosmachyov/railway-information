using RailwayInformation.Models;
using System.Collections.Generic;
using System.Web;
using System.Web.Http;

namespace RailwayInformation.Controllers
{
    public class StationController : ApiController
    {    
        // GET: api/Station
        public List<TripTest> Get(string from, string to)
        {
            return Storage.getTrip(from, to);
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
