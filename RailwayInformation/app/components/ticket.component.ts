import { Component, Input, OnInit } from '@angular/core';

import { Ticket } from '../models/ticket';

@Component({
    selector: '.ticket',
    template: `
            <td>
                {{ticket.id}}
            </td>
            <td>
                <span>{{trainNumber}}</span>
                <span>{{fromDirection}}</span>
                &#8212;
                <span>{{toDirection}}</span>
            </td>
            <td>
                <ul>
                    <li>{{ticket.fromDepart| date:"HH:mm dd/MM/yy"}}</li>
                    <li>{{ticket.fromStation.name}}</li>
                </ul>                        
            </td>
            <td>
                <ul>
                    <li>{{ticket.toArrive | date:"HH:mm dd/MM/yy"}}</li>
                    <li>{{ticket.toStation.name}}</li>
                </ul>                        
            </td>
            <td>{{ticket.carriage}} {{ticket.carriageType}}</td>`
})
export class TicketComponent implements OnInit {
    @Input() ticket: Ticket;
    trainNumber: string;
    toDirection: string;
    fromDirection: string;

    ngOnInit() {
        let arr = this.ticket.tripDirection.split(',');
        this.trainNumber = arr[0];
        this.toDirection = arr[1];
        this.fromDirection = arr[2];
    }
}