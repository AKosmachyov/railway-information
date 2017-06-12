using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RailwayInformation.Models
{
    public static class Storage
    {            
        public static List<TripUI> getTrip(string from, string to, DateTime date)
        {
            var dateMax = date.AddDays(1);
            var rez = new List<TripUI>();

            //Остановки со станцией from
            var arrivalTimesFrom = DB._db.ArrivalTimes.Include("Point").Include("Trip").Include("Route").Where(arrival =>
                arrival.point.station.name == from && arrival.arriveTime >= date && arrival.arriveTime < dateMax);
            //Остановки со станцией to
            var arrivalTimesTo = DB._db.ArrivalTimes.Include("Point").Include("Trip").Where(arrival =>
              arrival.point.station.name == to && arrival.arriveTime >= date && arrival.arriveTime < dateMax);

            if (arrivalTimesFrom.Count() == 0 || arrivalTimesTo.Count() == 0)
            {
                return rez;
            }
            foreach (ArrivalTime itemFrom in arrivalTimesFrom)
            {
                foreach (ArrivalTime itemTo in arrivalTimesTo)
                {
                    if (itemTo.trip.id == itemFrom.trip.id && itemTo.point.tripDistance > itemFrom.point.tripDistance)
                    {
                        rez.Add(createTripUI(itemFrom, itemTo));
                    }
                }
            }      
            return rez;
        }
        public static List<CarriageUI> getCarriage(int tripId, int from, int to)
        {
            var rez = new List<CarriageUI>();
            var carriageType = DB._db.CarriageTypes.ToList();
            var trip = DB._db.Trips.Include("carriages").FirstOrDefault(x => x.id == tripId);

            if (trip == null)
                return rez;

            var fromPoint = DB._db.ArrivalTimes.Include("Point").FirstOrDefault(x => x.point.station.id == from && x.trip.id == trip.id).point;
            var toPoint = DB._db.ArrivalTimes.Include("Point").FirstOrDefault(x => x.point.station.id == to && x.trip.id == trip.id).point;

            if (fromPoint == null || toPoint == null)
                return rez;
                 
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
        private static TripUI createTripUI(ArrivalTime from, ArrivalTime to)
        {
            var point = DB._db.Points.Include("Station").FirstOrDefault(x => x.id == from.point.id);
            var start = new RoutePointUi()
            {
                tripDistance = point.tripDistance,
                stayTime = point.stayTime,
                station = point.station,
                arrive = from.arriveTime
            };

            point = DB._db.Points.Include("Station").FirstOrDefault(x => x.id == to.point.id);
            var finish = new RoutePointUi()
            {
                tripDistance = point.tripDistance,
                stayTime = point.stayTime,
                station = point.station,
                arrive = to.arriveTime
            };

            var trip = DB._db.Trips.Include("CarriageInformation").FirstOrDefault(x => x.id == from.trip.id);
            var route = DB._db.Routes.FirstOrDefault(x => x.id == from.route.id);
            var tripUi = new TripUI(route.name, route.direction, start, finish, trip.id);

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
            return tripUi;
        }
    }
}