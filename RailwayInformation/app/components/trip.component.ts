import { Component, Input, OnInit} from '@angular/core';

import { Trip } from '../models/trip';
import { RoutePoint } from "../models/routepoint";
import { CarriageType } from "../models/CarriageType";

@Component({
    selector: '.trip-component',
    template: `        
        <td>
            {{trainNumber}}
            {{direction[0]}} &#8212; {{direction[1]}}
        </td>
        <td>
            {{fromDate + from.stayTime*60000 | date:"HH:mm dd.MM.yy"}}
            <p></p>
            {{from.station.name}}
        </td>
        <td>
            {{toDate | date:"HH:mm dd.MM.yy"}}
            <p></p>
            {{to.station.name}}              
        </td>
        <td>{{tripTime}}</td>        
        <td>
            <ul>
                <li *ngFor="let item of carriageType">{{item.name}}</li>
            </ul>
        </td>
        <td>
            <ul>
                <li *ngFor="let item of carriageType">{{item.priceFactor}} руб</li>
            </ul>
        </td>
        <td>
            <ul>
                <li *ngFor="let item of carriageType">{{item.emptySeat}}</li>
            </ul>
        </td>`,
    styles: [`
         ul {
                list-style-type: none;
                padding-left: 0; 
            }
        td {
            text-align: center;
        }
    `]
})
export class TripComponent implements OnInit {
    @Input() trip: Trip;

    direction: String[];
    from: RoutePoint;
    fromDate: Date;
    toDate: Date;
    to: RoutePoint;
    trainNumber: String;
    carriageType: CarriageType[];
    tripTime: string;
    ngOnInit() {
        if (this.trip) {
            this.direction = this.trip.direction.split(',');
            this.from = this.trip.from;
            this.fromDate = new Date(+new Date(this.trip.from.arrive) + this.trip.to.stayTime * 60000);
            this.toDate = new Date(this.trip.to.arrive);
            this.to = this.trip.to;
            this.trainNumber = this.trip.trainNumber;
            this.carriageType = this.calculatePrice(this.trip.carriageType);
            this.tripTime = this.calculateTripTime();
        }    
    }
    calculatePrice(arr: CarriageType[]): CarriageType[] {
        let val = this.to.tripDistance - this.from.tripDistance;
        for (let i = 0; i < arr.length; i++) {
            arr[i].priceFactor = Math.round(arr[i].priceFactor * val * 100) / 100;
        }
        return arr;
    }
    calculateTripTime(): string {
        let time = new Date(+this.toDate - +this.fromDate);
        return `${time.getUTCHours()} ч ${time.getUTCMinutes()} мин`;
    }
}