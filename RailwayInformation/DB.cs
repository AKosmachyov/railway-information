using RailwayInformation.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RailwayInformation
{
    public static class DB
    {
        public static DBContext _db = new DBContext();
    }
    public class DBContext : DbContext
    {
        public DBContext() : base("RailwayContext")
        {
            Database.SetInitializer<DBContext>(new DBInitializer());
        }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<ArrivalTime> ArrivalTimes { get; set; }
        public DbSet<Carriage> Carriages { get; set; }
        public DbSet<CarriageInformation> CarriageInformations { get; set; }
        public DbSet<CarriageType> CarriageTypes { get; set; }
        public DbSet<Point> Points { get; set; }
        public DbSet<Route> Routes { get; set; }
        public DbSet<Station> Stations { get; set; }
        public DbSet<Trip> Trips { get; set; }
    }
    public class DBInitializer : CreateDatabaseIfNotExists<DBContext>
    {
        protected override void Seed(DBContext context)
        {
            var fTrip = new Trip();
            var sTrip = new Trip();

            var mosk = new Station() { name = "Москва" };
            var orh = new Station() { name = "Орша" };
            var minsk = new Station() { name = "Минск" };
            var brest = new Station() { name = "Брест" };
            var warsh = new Station() { name = "Варшава" };
            var jabinka = new Station() { name = "Жабинка" };

            var carriageTypes = new List<CarriageType>
            {
                    new CarriageType() { name = "СВ", priceFactor = 0.065},
                    new CarriageType() { name = "Плацкарт", priceFactor = 0.023 },
                    new CarriageType() { name = "Сидячие", priceFactor = 0.023}
            };
            var route1 = new Route()
            {
                name = "003",
                direction = "Москва,Варшава",
                points = new List<Point>() {
                    new Point()
                    {
                        station = mosk,
                        stayTime = 5,
                        tripDistance = 0
                    },
                    new Point()
                    {
                        station = orh,
                        stayTime = 5,
                        tripDistance = 800
                    },
                    new Point()
                    {
                        station = minsk,
                        stayTime = 5,
                        tripDistance = 1000
                    },
                    new Point()
                    {
                        station = brest,
                        stayTime = 5,
                        tripDistance = 1400
                    },
                    new Point()
                    {
                        station = warsh,
                        stayTime = 5,
                        tripDistance = 1800
                    }
                }
            };
            var route2 = new Route()
            {
                name = "009ЯЩ",
                direction = "Минск,Брест",
                points = new List<Point>() {
                    new Point()
                    {
                        station = minsk,
                        stayTime = 5,
                        tripDistance = 0
                    },
                    new Point()
                    {
                        station = jabinka,
                        stayTime = 5,
                        tripDistance = 190
                    },
                    new Point()
                    {
                        station = brest,
                        stayTime = 5,
                        tripDistance = 400
                    }
                }
            };
            fTrip.carriages = new List<Carriage>
            {
                    new Carriage()
                    {
                        carriageType = carriageTypes[0],
                        number = 1,
                        emptySeats = 5
                    },
                    new Carriage()
                    {
                        carriageType = carriageTypes[1],
                        number = 2,
                        emptySeats = 15
                    }
            };
            fTrip.carriageInformation = new List<CarriageInformation>
            {
                new CarriageInformation()
                {
                    carriageType = carriageTypes[0],
                    emptySeats = 5
                },
                new CarriageInformation()
                {
                    carriageType = carriageTypes[1],
                    emptySeats = 15
                }
            };
            fTrip.arrivalTimes = new List<ArrivalTime>
            {
                 new ArrivalTime()
                {
                    trip = fTrip,
                    route = route1,
                    point = route1.points[0],
                    arriveTime = new DateTime(2017,7,1,12,05,0)
                },
                new ArrivalTime()
                {
                    trip = fTrip,
                    route = route1,
                    point = route1.points[1],
                    arriveTime = new DateTime(2017,7,1,16,20,0)
                },
                new ArrivalTime()
                {
                    trip = fTrip,
                    route = route1,
                    point = route1.points[2],
                    arriveTime = new DateTime(2017,7,1,17,32,0)
                },
                new ArrivalTime()
                {
                    trip = fTrip,
                    route = route1,
                    point = route1.points[3],
                    arriveTime = new DateTime(2017,7,1,23,24,0)
                },
                new ArrivalTime()
                {
                    trip = fTrip,
                    route = route1,
                    point = route1.points[4],
                    arriveTime = new DateTime(2017,7,2,1,54,0)
                }

            };
            sTrip.carriages = new List<Carriage>
                {
                    new Carriage()
                    {
                        carriageType = carriageTypes[2],
                        number = 1,
                        emptySeats = 15
                    },
                    new Carriage()
                    {
                        carriageType = carriageTypes[2],
                        number = 2,
                        emptySeats = 10
                    },
            };
            sTrip.carriageInformation = new List<CarriageInformation>
            {
                new CarriageInformation()
                {
                    carriageType = carriageTypes[2],
                    emptySeats = 25
                }
            };
            sTrip.arrivalTimes = new List<ArrivalTime>
            {
                new ArrivalTime()
                {
                    trip = sTrip,
                    route = route2,
                    point = route2.points[0],
                    arriveTime = new DateTime(2017,7,1,13,30,0)
                },
                 new ArrivalTime()
                {
                    trip = sTrip,
                    route = route2,
                    point = route2.points[1],
                    arriveTime = new DateTime(2017,7,1,15,20,0)
                },
                  new ArrivalTime()
                {
                    trip = sTrip,
                    route = route2,
                    point = route2.points[2],
                    arriveTime = new DateTime(2017,7,1,17,10,0)
                }
            };

            var tTrip = new Trip()
            {
                carriages = new List<Carriage>
                {
                    new Carriage()
                    {
                        carriageType = carriageTypes[2],
                        number = 1,
                        emptySeats = 15
                    },
                    new Carriage()
                    {
                        carriageType = carriageTypes[2],
                        number = 2,
                        emptySeats = 10
                    }
                },
                carriageInformation = new List<CarriageInformation>
                {
                    new CarriageInformation()
                    {
                        carriageType = carriageTypes[2],
                        emptySeats = 25
                    }
                }               
            };
            tTrip.arrivalTimes = new List<ArrivalTime>
            {
                new ArrivalTime()
                {
                    trip = tTrip,
                    route = route2,
                    point = route2.points[0],
                    arriveTime = new DateTime(2017,7,2,13,30,0)
                },
                new ArrivalTime()
                {
                    trip = tTrip,
                    route = route2,
                    point = route2.points[1],
                    arriveTime = new DateTime(2017,5,7,15,20,0)
                },
                new ArrivalTime()
                {
                    trip = tTrip,
                    route = route2,
                    point = route2.points[2],
                    arriveTime = new DateTime(2017,7,2,17,10,0)
                }
            };
            context.Trips.Add(fTrip);
            context.Trips.Add(sTrip);
            context.Trips.Add(tTrip);

            context.Stations.Add(mosk);
            context.Stations.Add(orh);
            context.Stations.Add(minsk);
            context.Stations.Add(brest);
            context.Stations.Add(warsh);
            context.Stations.Add(jabinka);

            context.Routes.Add(route1);
            context.Routes.Add(route2);
            context.CarriageTypes.AddRange(carriageTypes);
            context.SaveChanges();
        }
    }
}