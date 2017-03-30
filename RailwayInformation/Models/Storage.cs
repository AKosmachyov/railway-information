using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public static class Storage
    {
        public static List<Station> stations = new List<Station> { new Station("1"), new Station("2") };
        public static List<TripTest> tripTests = new List<TripTest> {
            new TripTest() { trainNumber = "009ЯЩ", direction= "Витебск, Брест", from = new RoutePoint("Минск",new DateTime(2017,4,27,1,1,0), 5, 305), to = new RoutePoint("Брест",new DateTime(2017,4,27,3,28,0), 5, 610), carriageType = new List<CarriageType> { new CarriageType() { name = "СВ", emptySeat = 10, priceFactor = 0.065}, new CarriageType() { name = "Плацкарт", emptySeat = 15, priceFactor = 0.023 } } },
            new TripTest() { trainNumber = "003", direction= "Москва, Варшава", from = new RoutePoint("Минск",new DateTime(2017,4,27,15,40,0), 5, 1000), to = new RoutePoint("Брест",new DateTime(2017,4,27,17,50,0), 5, 1310), carriageType = new List<CarriageType> { new CarriageType() { name = "СВ", emptySeat = 100, priceFactor = 0.065}, new CarriageType() { name = "Плацкарт", emptySeat = 45, priceFactor = 0.023 } } },
        };
        public static List<Station> getStation()
        {
            return stations;
        }
        public static List<TripTest> getTrip()
        {
            return tripTests;
        }
        
    }
}