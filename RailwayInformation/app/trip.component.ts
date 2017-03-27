import { Component } from '@angular/core';

@Component({
    selector: '.trip',
    template: `        
        <td>
            {{trainNumber}}
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
    route = [{
        arrive: +new Date('03 27 2017 23:00'),
        stayTime: 5,
        tripTime: 0,
        station: "Москва"
    }, {
            arrive: +new Date('04 27 2017 00:01'),
            stayTime: 10,
            tripTime: 305,
            station: "Минск"
        }, {
            arrive: +new Date('03 27 2017 03:28'),
            stayTime: 10,
            station: "Брест",
            tripTime: 512
    }];
    Carriages = [{
        name: "1",
        seats: [],
        emptySeat: 15,
        type: "Купе",
        price: "4 руб"
    }, {
            name: "2",
            seats: [],
            emptySeat: 30,
            type: "Купе",
            price: "4 руб"
        }, {
            name: "3",
            seats: [],
            emptySeat: 15,
            type: "Плацкартный",
            price: "18.50 руб"
    }, {
            name: "4",
            price: "20 руб",
            seats: [],
            emptySeat: 20,
            type: "СВ"
    }];
    trainNumber = "009ЯЩ"
    tripTime = this.calculateTripTime();
    carriages = this.getSeats();
    calculateTripTime() {
        let tripTime = this.route[2].tripTime - this.route[1].tripTime;
        return `${parseInt((String)(tripTime / 60))} ч ${tripTime % 60} мин`
    }

    getSeats() {
        let res={};
        this.Carriages.forEach((item) => {
            if (res[item.type])
                res[item.type].seats += item.emptySeat;
            else {
                res[item.type] = {
                    price: item.price,
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