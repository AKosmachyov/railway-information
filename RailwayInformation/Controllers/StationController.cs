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
        public IHttpActionResult Get(string query)
        {
            if (query != null && query.Length == 0)
                return BadRequest();
            return Ok(Storage.getStation(query));
        }
    }
}
