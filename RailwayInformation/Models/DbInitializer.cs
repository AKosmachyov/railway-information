using RailwayInformation.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RailwayInformation
{
    public static class RailwayInformationDB
    {
        public static DBContext _db = new DBContext();
    }
    public class DBContext : DbContext
    {
        public DBContext() : base("RailwayInformationContext")
        {
            Database.SetInitializer<DBContext>(new DBInitializer());
        }
        public DbSet<Carriage> Carriages { get; set; }
        public DbSet<Route> Routes { get; set; }
        public DbSet<RoutePoint> RoutePoints { get; set; }
        public DbSet<Station> Stations { get; set; }        
    }
    public class DBInitializer : DropCreateDatabaseAlways<DBContext>
    {
        protected override void Seed(DBContext db)
        {
            db.Stations.Add(new Station("1"));
            db.Stations.Add(new Station("2"));
            db.SaveChanges();
        }
    }
}