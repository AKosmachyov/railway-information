using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public static class Storage
    {
        public static List<Station> stations = new List<Station> { };
        public static List<TripUI> tripTests = new List<TripUI> { };
        public static List<Trip> trips = new List<Trip>
        {
            //new Trip()
            //{
            //    trainNumber = "003",
            //    route = new List<RoutePoint>
            //    {
            //        new RoutePoint(new Station(0,"Москва"), new DateTime(2017,5,1,12,05,0), 5, 0),
            //        new RoutePoint(new Station(1,"Орша"), new DateTime(2017,5,1,16,20,0), 5, 800),
            //        new RoutePoint(new Station(2,"Минск"), new DateTime(2017,5,1,17,32,0), 5, 1000),
            //        new RoutePoint(new Station(3,"Брест"), new DateTime(2017,5,1,23,24,0), 5, 1400),
            //        new RoutePoint(new Station(4,"Варшава"), new DateTime(2017,5,2,1,54,0), 5, 1800)
            //    },
            //    carriages = new List<Carriage>
            //    {
            //        new Carriage("1",15,"СВ",0.065),
            //        new Carriage("2",20,"СВ",0.065),
            //        new Carriage("3",40,"Плацкарт",0.023),
            //        new Carriage("4",30,"Плацкарт",0.023),
            //    },
            //    carriageType = new List<CarriageType>
            //    {
            //        new CarriageType() { name = "СВ", emptySeat = 35, priceFactor = 0.065},
            //        new CarriageType() { name = "Плацкарт", emptySeat = 70, priceFactor = 0.023 }
            //    }
            //},
            //new Trip()
            //{
            //    trainNumber = "009ЯЩ",
            //    route = new List<RoutePoint>
            //    {
            //        new RoutePoint(new Station(5,"Минск"), new DateTime(2017,5,1,13,30,0), 5, 0),
            //        new RoutePoint(new Station(6,"Жабинка"), new DateTime(2017,5,1,15,20,0), 5, 190),
            //        new RoutePoint(new Station(7,"Брест"), new DateTime(2017,5,1,17,10,0), 5, 400)
            //    },
            //    carriages = new List<Carriage>
            //    {
            //        new Carriage("1",15,"Сидячие",0.023),
            //        new Carriage("2",20,"Сидячие",0.023),
            //        new Carriage("3",40,"Сидячие",0.023),
            //        new Carriage("4",30,"Сидячие",0.023),
            //    },
            //    carriageType = new List<CarriageType>
            //    {
            //        new CarriageType() { name = "Сидячие", emptySeat = 105, priceFactor = 0.023}
            //    }
            //},
            //new Trip()
            //{
            //    trainNumber = "009ЯЩ",
            //    route = new List<RoutePoint>
            //    {
            //        new RoutePoint(new Station(8,"Минск"), new DateTime(2017,5,2,13,30,0), 5, 0),
            //        new RoutePoint(new Station(9,"Жабинка"), new DateTime(2017,5,2,15,20,0), 5, 190),
            //        new RoutePoint(new Station(10,"Брест"), new DateTime(2017,5,2,18,10,0), 5, 400)
            //    },
            //    carriages = new List<Carriage>
            //    {
            //        new Carriage("1",15,"Сидячие",0.023),
            //        new Carriage("2",20,"Сидячие",0.023),
            //        new Carriage("3",40,"Сидячие",0.023),
            //        new Carriage("4",30,"Сидячие",0.023),
            //    },
            //    carriageType = new List<CarriageType>
            //    {
            //        new CarriageType() { name = "Сидячие", emptySeat = 95, priceFactor = 0.023}
            //    }
            //}
        };

        public static List<TripUI> getTrip(string from, string to, string time)
        {
            var date = DateTime.Parse(time);
            var dateMax = date.AddDays(1);
            var rez = new List<TripUI>();

            //Остановки с станцией from
            var arrivalTimes = DB._db.ArrivalTimes.Include("Route").Include("Point").Include("Trip").Where(arrival =>
                arrival.point.station.name == from && arrival.arriveTime >= date && arrival.arriveTime < dateMax);
            //Получаем Id route 
            var arrRouteId = arrivalTimes.Select(x => x.route.id);
            var arrReadyRoute = DB._db.Routes.Where(route =>
                arrRouteId.Contains(route.id) && route.points.Any(point => point.station.name == to)).Select(x => x.id);
            arrivalTimes = arrivalTimes.Where(x => arrReadyRoute.Contains(x.route.id));
            foreach (ArrivalTime item in arrivalTimes)
            {
                var point = DB._db.Points.Include("Station").FirstOrDefault(x => x.id == item.point.id);
                var start = new RoutePointUi()
                {
                    tripDistance = point.tripDistance,
                    stayTime = point.stayTime,
                    station = point.station,
                    arrive = item.arriveTime
                };
                var itemFinish = DB._db.ArrivalTimes.Include("Point").FirstOrDefault(x =>
                   x.trip.id == item.trip.id && x.point.station.name == to);

                point = DB._db.Points.Include("Station").FirstOrDefault(x => x.id == itemFinish.point.id);
                var finish = new RoutePointUi()
                {
                    tripDistance = point.tripDistance,
                    stayTime = point.stayTime,
                    station = point.station,
                    arrive = item.arriveTime
                };
                var trip = DB._db.Trips.Include("CarriageInformation").FirstOrDefault(x => x.id == item.trip.id);
                var tripUi = new TripUI(item.route.name, item.route.direction, start, finish, trip.id);
                tripUi.carriageType = new List<CarriageTypeUi>();
                foreach (CarriageInformation carrInform in trip.carriageInformation)
                {
                    var el = DB._db.CarriageInformations.Include("CarriageType").FirstOrDefault(x => x.id == carrInform.id);
                    tripUi.carriageType.Add(
                        new CarriageTypeUi()
                        {
                            name = el.carriageType.name,
                            emptySeat = carrInform.emptySeats,
                            priceFactor = el.carriageType.priceFactor
                        }
                    );
                };
                rez.Add(tripUi);
            };          
            return rez;
        }
        public static List<CarriageUI> getCarriage(int tripId, int from, int to)
        {
            var rez = new List<CarriageUI>();
            var carriageType = DB._db.CarriageTypes.ToList();
            var trip = DB._db.Trips.Include("carriages").FirstOrDefault(x => x.id == tripId);

            var fromPoint = DB._db.ArrivalTimes.Include("Point").FirstOrDefault(x => x.point.station.id == from && x.trip.id == trip.id).point;
            var toPoint = DB._db.ArrivalTimes.Include("Point").FirstOrDefault(x => x.point.station.id == to && x.trip.id == trip.id).point;
            double tripDistance = toPoint.tripDistance - fromPoint.tripDistance;
            foreach (var item in trip.carriages)
            {
                rez.Add(new CarriageUI()
                {
                    number = item.number,
                    carriageType = item.carriageType.name,
                    emptySeats = item.emptySeats,
                    price = Math.Floor(item.carriageType.priceFactor * tripDistance * 100) / 100
                });
            }
            return rez;
        }
        public static Info getInfo(string trainNumber, int fromId, int toId, string carriageName)
        {
            //var trip = trips.Find((item) => { return item.trainNumber == trainNumber; });
            //var direction = trip.route[0].station.name + "," + trip.route[trip.route.Count-1].station.name;
            //var f = trip.route.Find((item) => { return item.station.Id == fromId; });
            //var s = trip.route.Find((item) => { return item.station.Id == toId; });
            //var carriage = trip.carriages.Find((item) => { return item.name == carriageName; });
            //var rez = new Info(direction, f, s, carriage.type);
            //return rez;
            return new Info();
        }
    }
}