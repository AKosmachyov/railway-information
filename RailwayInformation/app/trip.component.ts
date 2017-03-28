import { Component, Input, OnInit} from '@angular/core';
import { Trip } from './models/trip';

@Component({
    selector: '.trip-component',
    template: `        
        <td>
            {{trip.trainNumber}}
            {{route[0].station}} &#8212; {{route[route.length-1].station}}
        </td>
        <td>
            {{route[1].arrive + route[1].stayTime | date:"HH:mm"}}
            <p></p>
            {{route[1].station}}
        </td>
        <td>
            {{route[2].arrive | date:"HH:mm"}}
            <p></p>
            {{route[2].station}}              
        </td>
        <td>{{tripTime}}</td>        
        <td>
            <ul>
                <li *ngFor="let item of carriages">{{item.type}}</li>
            </ul>
        </td>
        <td>
            <ul>
                <li *ngFor="let item of carriages">{{item.price}}</li>
            </ul>
        </td>
        <td>
            <ul>
                <li *ngFor="let item of carriages">{{item.seats}}</li>
            </ul>
        </td>`,
    styles: [`
         ul {
                list-style-type: none;
                padding-left: 0; 
            }
    `]
})
export class TripComponent {
    @Input() trip: any;

    route: any;
    Carriages: any;
    trainNumber: any;
    tripTime: any;
    carriages: any;

    ngOnInit() {
        if (this.trip) {
            this.route = this.trip.route;
            this.Carriages = this.trip.carriages;
            this.trainNumber = this.trip.trainNumber;
            this.tripTime = this.calculateTripTime();
            this.carriages = this.getSeats();
        }
    
    }

    
    calculateTripTime() {
        let tripTime: Date = new Date(+this.route[2].arrive - +this.route[1].arrive + this.route[1].stayTime * 60000);
        return `${tripTime.getHours()} ч ${tripTime.getMinutes()} мин`
    }
    getSeats() {
        let res = {};
        this.Carriages.forEach((item) => {
            if (res[<string>item.type])
                res[<string>item.type].seats += item.emptySeat;
            else {
                res[<string>item.type] = {
                    price: item.priceFactor + ' руб',
                    seats: item.emptySeat
                }
            }
        });
        let arr = [];
        for (let key in res) {
            arr.push(Object.assign(res[key], {type: key}));
        }
        return arr;
    }
}