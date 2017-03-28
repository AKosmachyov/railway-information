import { RoutePoint } from '../models/routepoint';
import { Carriage } from '../models/carriage';
import { Trip } from '../models/trip';

export class TripService {

    route: [RoutePoint] = [
        new RoutePoint(0, 5, "Москва", new Date('03 27 2017 23:00')),
        new RoutePoint(1000, 10, "Минск", new Date('04 27 2017 00:01')),
        new RoutePoint(1300, 10, "Брест", new Date('04 27 2017 03:28')),
    ];
    carriages: [Carriage] = [
        new Carriage("1", <[String]>[], 15, 'Купе', 19),
        new Carriage("2", <[String]>[], 30, 'Купе', 19),
        new Carriage("3", <[String]>[], 15, 'Плацкартный', 18.50),
        new Carriage("4", <[String]>[], 20, 'СВ', 21),
    ];
    route1: [RoutePoint] = [
        new RoutePoint(0, 5, "Витебс", new Date('03 27 2017 22:00')),
        new RoutePoint(305, 10, "Минск", new Date('04 27 2017 01:01')),
        new RoutePoint(610, 10, "Брест", new Date('04 27 2017 03:28'))        
    ];
    private data: [Trip] = [
        new Trip(this.route, "009ЯЩ", this.carriages),
        new Trip(this.route1, "019Я", this.carriages)
    ];    
    getData(): [Trip] {
        return this.data;
    }
}