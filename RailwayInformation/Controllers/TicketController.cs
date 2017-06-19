using Microsoft.AspNet.Identity;
using PdfSharp.Pdf;
using RailwayInformation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
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
        public HttpResponseMessage Get(string id)
        {
            var arr = Storage.getPdf(id);
            if (arr == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(arr)
            };
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = "ticket.pdf"
            };
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            return result;
        }
    }
}
