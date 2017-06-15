using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RailwayInformation.Controllers
{
    public class TicketController : ApiController
    {
        // GET: api/Ticket/5
        public string Get(int id)
        {
            return "value";
        }
    }
}
