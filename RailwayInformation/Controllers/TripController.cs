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
        public List<TripUI> Get(string from, string to, string time)
        {
            return Storage.getTrip(from, to, time);
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
