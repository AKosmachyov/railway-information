using Microsoft.AspNet.Identity;
using RailwayInformation.Models;
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
        [Authorize]
        public IHttpActionResult Get()
        {
            string userId = User.Identity.GetUserId();
            return Ok(Storage.getTickets(userId));
        }
        // GET: api/Ticket/5
        public string Get(int id)
        {
            return "value";
        }
    }
}
