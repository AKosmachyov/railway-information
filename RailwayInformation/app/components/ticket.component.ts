import { Component, Input, OnInit } from '@angular/core';

import { Ticket } from '../models/ticket';

@Component({
    selector: '.ticket',
    template: `
            <td>
                <a target="_blank" [href]="href">{{ticket.id}}</a>
            </td>
            <td>
                <span>{{trainNumber}}</span>
                <span>{{fromDirection}}</span>
                &#8212;
                <span>{{toDirection}}</span>
            </td>
            <td>
                <ul class="list-unstyled">
                    <li>{{ticket.fromDepart| date:"HH:mm dd.MM.yy"}}</li>
                    <li>{{ticket.fromStation.name}}</li>
                </ul>                        
            </td>
            <td>
                <ul class="list-unstyled">
                    <li>{{ticket.toArrive | date:"HH:mm dd.MM.yy"}}</li>
                    <li>{{ticket.toStation.name}}</li>
                </ul>                        
            </td>
            <td>{{ticket.carriage}} {{ticket.carriageType}}</td>
        `,
    styles: [`
        ul {
            padding-left: 10px;
        }
        td {
            text-align: center;
        }
    `]
})
export class TicketComponent implements OnInit {
    @Input() ticket: Ticket;
    trainNumber: string;
    toDirection: string;
    fromDirection: string;
    href: string;
    ngOnInit() {
        let arr = this.ticket.tripDirection.split(',');
        this.trainNumber = arr[0];
        this.toDirection = arr[1];
        this.fromDirection = arr[2];
        this.href = "api/ticket/" + this.ticket.uiId;
    }
}