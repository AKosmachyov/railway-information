using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public static class Storage
    {
        public static List<Station> stations = new List<Station> { };
        public static List<TripTest> tripTests = new List<TripTest>
        {            
        };
        public static List<Trip> trips = new List<Trip>
        {
            new Trip()
            {
                trainNumber = "003",
                route = new List<RoutePoint>
                {
                    new RoutePoint(new Station(0,"Москва"), new DateTime(2017,5,1,12,05,0), 5, 0),
                    new RoutePoint(new Station(1,"Орша"), new DateTime(2017,5,1,16,20,0), 5, 800),
                    new RoutePoint(new Station(2,"Минск"), new DateTime(2017,5,1,17,32,0), 5, 1000),
                    new RoutePoint(new Station(3,"Брест"), new DateTime(2017,5,1,23,24,0), 5, 1400),
                    new RoutePoint(new Station(4,"Варшава"), new DateTime(2017,5,2,1,54,0), 5, 1800)
                },
                carriages = new List<Carriage>
                {
                    new Carriage("1",15,"СВ",0.065),
                    new Carriage("2",20,"СВ",0.065),
                    new Carriage("3",40,"Плацкарт",0.023),
                    new Carriage("4",30,"Плацкарт",0.023),
                },
                carriageType = new List<CarriageType>
                {
                    new CarriageType() { name = "СВ", emptySeat = 35, priceFactor = 0.065},
                    new CarriageType() { name = "Плацкарт", emptySeat = 70, priceFactor = 0.023 }
                }
            },
            new Trip()
            {
                trainNumber = "009ЯЩ",
                route = new List<RoutePoint>
                {
                    new RoutePoint(new Station(5,"Минск"), new DateTime(2017,5,1,13,30,0), 5, 0),
                    new RoutePoint(new Station(6,"Жабинка"), new DateTime(2017,5,1,15,20,0), 5, 190),
                    new RoutePoint(new Station(7,"Брест"), new DateTime(2017,5,1,17,10,0), 5, 400)
                },
                carriages = new List<Carriage>
                {
                    new Carriage("1",15,"Сидячие",0.023),
                    new Carriage("2",20,"Сидячие",0.023),
                    new Carriage("3",40,"Сидячие",0.023),
                    new Carriage("4",30,"Сидячие",0.023),
                },
                carriageType = new List<CarriageType>
                {
                    new CarriageType() { name = "Сидячие", emptySeat = 105, priceFactor = 0.023}
                }
            },
            new Trip()
            {
                trainNumber = "009ЯЩ",
                route = new List<RoutePoint>
                {
                    new RoutePoint(new Station(8,"Минск"), new DateTime(2017,5,2,13,30,0), 5, 0),
                    new RoutePoint(new Station(9,"Жабинка"), new DateTime(2017,5,2,15,20,0), 5, 190),
                    new RoutePoint(new Station(10,"Брест"), new DateTime(2017,5,2,18,10,0), 5, 400)
                },
                carriages = new List<Carriage>
                {
                    new Carriage("1",15,"Сидячие",0.023),
                    new Carriage("2",20,"Сидячие",0.023),
                    new Carriage("3",40,"Сидячие",0.023),
                    new Carriage("4",30,"Сидячие",0.023),
                },
                carriageType = new List<CarriageType>
                {
                    new CarriageType() { name = "Сидячие", emptySeat = 95, priceFactor = 0.023}
                }
            }
        };
        public static List<Station> getStation()
        {
            return stations;
        }
        public static List<TripTest> getTripTest()
        {
            return tripTests;
        }
        public static List<TripTest> getTrip(string from, string to, string time)
        {
            var date = DateTime.Parse(time);
            var rez = new List<TripTest>();
            var t = trips.FindAll((trip) =>
            {
                var fromIndex = trip.route.FindIndex((point) => {
                    return point.station.name == from && point.arrive.DayOfYear == date.DayOfYear;
                });
                var toIndex = trip.route.FindIndex((point) => { return point.station.name == to; });
                return fromIndex < toIndex && fromIndex > -1;
            });
            for (var i = 0; i < t.Count; i++)
            {
                var item = new TripTest(
                    t[i].trainNumber,
                    t[i].route[0].station.name,
                    t[i].route[t[i].route.Count - 1].station.name,
                    t[i].route.Find((station) => { return station.station.name == from; }),
                    t[i].route.Find((station) => { return station.station.name == to; })
                );
                item.carriageType = t[i].carriageType;
                rez.Add(item);
            }
            return rez;
        }
        public static List<Carriage> getCarriage(string trainNumber, int from, int to)
        {
            var trip = trips.Find((item) => { return item.trainNumber == trainNumber; });
            
            var f = trip.route.Find((item) => { return item.station.Id == from; });
            var s = trip.route.Find((item) => { return item.station.Id == to; });
            var distance = s.tripDistance - f.tripDistance;
            for(var i = 0; i < trip.carriages.Count; i++)
            {
                trip.carriages[i].price = trip.carriages[i].priceFactor * distance;
            }
            return trip.carriages;
        }
        public static Info getInfo(string trainNumber, int fromId, int toId, string carriageName)
        {            
            var trip = trips.Find((item) => { return item.trainNumber == trainNumber; });
            var direction = trip.route[0].station.name + "," + trip.route[trip.route.Count-1].station.name;
            var f = trip.route.Find((item) => { return item.station.Id == fromId; });
            var s = trip.route.Find((item) => { return item.station.Id == toId; });
            var carriage = trip.carriages.Find((item) => { return item.name == carriageName; });
            var rez = new Info(direction, f, s, carriage.type);
            return rez;
        }
    }
}