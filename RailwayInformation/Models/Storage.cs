using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Hosting;
using TheArtOfDev.HtmlRenderer.PdfSharp;

namespace RailwayInformation.Models
{
    public static class Storage
    {            
        public static List<TripUI> getTrip(string from, string to, DateTime date)
        {
            var dateMax = date.AddDays(1);
            var rez = new List<TripUI>();

            //Остановки со станцией from
            var arrivalTimesFrom = DB._db.ArrivalTimes.Include("Point").Include("Trip").Include("Route")
                .Where(arrival => arrival.point.station.name == from &&
                       arrival.arriveTime >= date && arrival.arriveTime < dateMax);
            //Остановки со станцией to
            var arrivalTimesTo = DB._db.ArrivalTimes.Include("Point").Include("Trip").Where(arrival =>
              arrival.point.station.name == to && arrival.arriveTime >= date);

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

            var fromPoint = DB._db.ArrivalTimes.Include("Point")
                .FirstOrDefault(x => x.point.station.id == from && x.trip.id == trip.id).point;
            var toPoint = DB._db.ArrivalTimes.Include("Point")
                .FirstOrDefault(x => x.point.station.id == to && x.trip.id == trip.id).point;

            if (fromPoint == null || toPoint == null)
                return rez;
                 
            double tripDistance = toPoint.tripDistance - fromPoint.tripDistance;
            foreach (var item in trip.carriages)
            {
                rez.Add(new CarriageUI()
                { 
                    id = item.id,
                    number = item.number,
                    carriageType = item.carriageType.name,
                    emptySeats = item.emptySeats,
                    price = Math.Round(item.carriageType.priceFactor * tripDistance, 2)
                });
            }
            return rez;
        }
        public static Ticket bookCarriage(int tripId, int fromId, int toId, int carriageId, string userName, string docId, string userId)
        {
            if (userName.Length < 1 || docId.Length < 1)
                return null;
            var trip = DB._db.Trips.Include("Carriages").Include("CarriageInformation").FirstOrDefault(x => x.id == tripId);
            if (trip == null)
                return null;
            var arrivalTimeFrom = DB._db.ArrivalTimes.Include("Point").Include("Route")
                .FirstOrDefault(x => x.point.station.id == fromId && x.trip.id == tripId);
            var arrivalTimeTo = DB._db.ArrivalTimes.Include("Point")
                .FirstOrDefault(x => x.point.station.id == toId && x.trip.id == trip.id);

            var from = arrivalTimeFrom.point;
            var to = arrivalTimeTo.point;

            Carriage carriage = trip.carriages.FirstOrDefault(x => x.id == carriageId);

            if (to == null || from == null || from.tripDistance > to.tripDistance || carriage == null || carriage.emptySeats == 0)
                return null;

            carriage = DB._db.Carriages.Include("CarriageType").FirstOrDefault(x => x.id == carriageId);
            carriage.emptySeats--;
            CarriageInformation carrInfo = trip.carriageInformation.FirstOrDefault(x => x.carriageType != null && x.carriageType.id == carriage.carriageType.id);
            carrInfo.emptySeats--;
            DB._db.SaveChanges();            
            
            var stationFrom = DB._db.Points.Include("station").FirstOrDefault(x => x.id == from.id).station;
            var stationTo = DB._db.Points.Include("station").FirstOrDefault(x => x.id == to.id).station;

            var price = Math.Round((to.tripDistance - from.tripDistance) * carriage.carriageType.priceFactor, 2);

            using (MD5 md5Hash = MD5.Create())
            {
                //TODO check is it unique id
                var uiId = Guid.NewGuid().ToString("N");

                var ticket = new Ticket()
                {
                    userName = userName,
                    docId = docId,
                    price = price,
                    tripDirection = String.Format("{0},{1}", arrivalTimeFrom.route.name, arrivalTimeFrom.route.direction),
                    carriage = carriage.number,
                    carriageType = carriage.carriageType.name,
                    fromStation = from.station,
                    fromDepart = arrivalTimeFrom.arriveTime.AddMinutes(from.stayTime),
                    toStation = to.station,
                    toArrive = arrivalTimeTo.arriveTime,
                    userOwner = userId,
                    uiId = uiId
                };

                DB._db.Tickets.Add(ticket);
                DB._db.SaveChanges();
                return ticket;
            }
        }
        public static IQueryable<Ticket> getTickets(string userId)
        {   
            return DB._db.Tickets.Include("toStation").Include("fromStation").Where(x => x.userOwner == userId);
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
        public static Byte[] getPdf (string id)
        {
            var ticket = DB._db.Tickets.Include("toStation").Include("fromStation").FirstOrDefault(x => x.uiId == id);
            if (ticket == null)
                return null;
            var str = HostingEnvironment.MapPath(@"~/App_Data/ticket.html");

            StringBuilder sb = new StringBuilder();
            sb.Append(File.ReadAllText(str));
            sb.Replace("{orderNumber}", ticket.id.ToString());
            var arr = ticket.tripDirection.Split(',');
            var tempStr = String.Format("{0} {1}—{2}", arr[0], arr[1], arr[2]);
            sb.Replace("{direction}", tempStr);

            sb.Replace("{fio}", ticket.userName);
            sb.Replace("{doc}", ticket.docId);

            tempStr = String.Format("{0} {1}", ticket.fromStation.name, ticket.fromDepart.ToString("g"));
            sb.Replace("{from}", tempStr);
            tempStr = String.Format("{0} {1}", ticket.toStation.name, ticket.toArrive.ToString("g"));
            sb.Replace("{to}", tempStr);

            tempStr = String.Format("{0} {1}", ticket.carriage, ticket.carriageType);
            sb.Replace("{carriage}", tempStr);

            Byte[] res = null;
            using (MemoryStream ms = new MemoryStream())
            {
                var pdf = PdfGenerator.GeneratePdf(sb.ToString(), PdfSharp.PageSize.Letter);
                pdf.Save(ms);
                res = ms.ToArray();
            }
            return res;
        }
        public static IQueryable<Station> getStation (string id)
        {
            return DB._db.Stations.Where(x => x.name.Contains(id));
        }
    }
}