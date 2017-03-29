using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using RailwayInformation;
using RailwayInformation.Models;

namespace RailwayInformation.Controllers
{
    public class CarriagesController : ApiController
    {
        private DBContext db = new DBContext();

        // GET: api/Carriages
        public IQueryable<Carriage> GetCarriages()
        {
            return db.Carriages;
        }

        // GET: api/Carriages/5
        [ResponseType(typeof(Carriage))]
        public IHttpActionResult GetCarriage(int id)
        {
            Carriage carriage = db.Carriages.Find(id);
            if (carriage == null)
            {
                return NotFound();
            }

            return Ok(carriage);
        }

        // PUT: api/Carriages/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCarriage(int id, Carriage carriage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != carriage.Id)
            {
                return BadRequest();
            }

            db.Entry(carriage).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarriageExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Carriages
        [ResponseType(typeof(Carriage))]
        public IHttpActionResult PostCarriage(Carriage carriage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Carriages.Add(carriage);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = carriage.Id }, carriage);
        }

        // DELETE: api/Carriages/5
        [ResponseType(typeof(Carriage))]
        public IHttpActionResult DeleteCarriage(int id)
        {
            Carriage carriage = db.Carriages.Find(id);
            if (carriage == null)
            {
                return NotFound();
            }

            db.Carriages.Remove(carriage);
            db.SaveChanges();

            return Ok(carriage);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CarriageExists(int id)
        {
            return db.Carriages.Count(e => e.Id == id) > 0;
        }
    }
}