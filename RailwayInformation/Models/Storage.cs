using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public static class Storage
    {
        public static List<Station> stations = new List<Station> { new Station("1"), new Station("2") };
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
                    new RoutePoint("Москва", new DateTime(2017,5,1,12,05,0), 5, 0),
                    new RoutePoint("Орша", new DateTime(2017,5,1,16,20,0), 5, 800),
                    new RoutePoint("Минск", new DateTime(2017,5,1,17,32,0), 5, 1000),
                    new RoutePoint("Брест", new DateTime(2017,5,1,23,24,0), 5, 1400),
                    new RoutePoint("Варшава", new DateTime(2017,5,2,1,54,0), 5, 1800)
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
                    new RoutePoint("Минск", new DateTime(2017,5,1,13,30,0), 5, 0),
                    new RoutePoint("Жабинка", new DateTime(2017,5,1,15,20,0), 5, 190),
                    new RoutePoint("Брест", new DateTime(2017,5,1,17,10,0), 5, 400)
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
                    new RoutePoint("Минск", new DateTime(2017,5,2,13,30,0), 5, 0),
                    new RoutePoint("Жабинка", new DateTime(2017,5,2,15,20,0), 5, 190),
                    new RoutePoint("Брест", new DateTime(2017,5,2,18,10,0), 5, 400)
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
        public static List<TripTest> getTrip(string from, string to)
        {
            var rez = new List<TripTest>();
            var t = trips.FindAll((trip) =>
            {
                var fromIndex = trip.route.FindIndex((point) => { return point.station == from; });
                var toIndex = trip.route.FindIndex((point) => { return point.station == to; });
                return fromIndex < toIndex && fromIndex > -1;
            });
            for (var i = 0; i < t.Count; i++)
            {
                var item = new TripTest(
                    t[i].trainNumber,
                    t[i].route[0].station,
                    t[i].route[t[i].route.Count - 1].station,
                    t[i].route.Find((station) => { return station.station == from; }),
                    t[i].route.Find((station) => { return station.station == to; })
                );
                item.carriageType = t[i].carriageType;
                rez.Add(item);
            }
            return rez;
        }
        public static List<Carriage> getCarriage(string trainNumber)
        {
            var t = trips.Find((trip) => { return trip.trainNumber == trainNumber; });
            return t.carriages;
        }
    }
}